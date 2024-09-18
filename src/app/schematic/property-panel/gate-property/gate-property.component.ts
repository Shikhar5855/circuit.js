import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetail } from '../../Utils/OnCanvasMouseRelease';
import { UndoRedo } from '../../Utils/UndoRedoOpreation';
declare var CircuitJS1: any;
declare var onCanvasMouseRelease:any
@Component({
  selector: 'app-gate-property',
  templateUrl: './gate-property.component.html',
  styleUrls: ['./gate-property.component.scss'],
})
export class GatePropertyComponent {
  @Input() data: any;
  @Input() type: any;
  @Input() did: any;
  @Input() cloneElm: any;

  private window: any = window;
  inpuObj:any = {
    device_name: '',
    no_of_input: '',
    high_logic_voltage: '',
    transistor_width_n: '',
    transistor_width_p: '',
    transistor_length: '',
    transistor_multiplier: '',
  };
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    if (this.cloneElm) {
      this.cloneElm['call'] = (id: any) => {
        this.cloneElmCreate(id);
      };
    }
  }
  updateData(){
    this.data=this.data.map((d:any)=>{
       if(this.inpuObj[d.key]){
            d.value=this.inpuObj[d.key];
       }
       return d;
    })
  }
  ngOnChanges(props: any) {
    if (props.data) {
      this.inpuObj = props.data.currentValue.reduce((acc: any, d: any) => {
        acc[d.key] = d.value;
        return acc;
      }, {});
      console.log(this.inpuObj);
    }
  }
  changeNoOfInput(key: string, e: any) {
    this.inpuObj.no_of_input = e.target.value;
    this.updateDeviceName(key, this.inpuObj.no_of_input);
    UndoRedo.addHistry(this.did)

    // this.inpuObj={...this.inpuObj}
    //DeviceDetail.callDeviceChanges();
    this.changeDetectorRef.detectChanges();
    this.updateData();
     onCanvasMouseRelease()
     this.window.ongwtEvent(this.did,JSON.stringify(this.data));

  }
  updateDeviceName(key: string, value: any) {
    if (key != 'device_name' && key != 'no_of_input') {
      value = parseFloat(value);
    }
    this.window.deviceInfo.setEditDeviceValue(key, value);
  }

  updateDeviceById(id: any, key: string, value: any) {
    if (key != 'device_name' && key != 'no_of_input') {
      value = parseFloat(value);
    }
    this.window.deviceInfo.setEditDeviceValueById(id, key, value, 1, -1);
  }

  cloneElmCreate = (id: any) => {
    const devDetails = DeviceDetail.findDeviceById(id);
    console.log('clone elm==>', this.inpuObj);
    const isNotGaye = this.type == 'N' ? true : false;
    let did = CircuitJS1.createNewCircuit(isNotGaye ? 'N' : devDetails.subType, 10, 50, 150, 50);
    if (!isNotGaye) this.updateDeviceById(did, 'no_of_input', this.inpuObj.no_of_input);

    this.updateDeviceById(did, 'high_logic_voltage', this.inpuObj.high_logic_voltage);
    this.updateDeviceById(did, 'transistor_width_n', this.inpuObj.transistor_width_n);
    this.updateDeviceById(did, 'transistor_width_p', this.inpuObj.transistor_width_p);
    this.updateDeviceById(did, 'transistor_length', this.inpuObj.transistor_length);
    this.updateDeviceById(did, 'transistor_multiplier', this.inpuObj.transistor_multiplier);
    // this.inpuObj.forEach((d:any)=>{
    //   // console.log(d);
    //        this.window.deviceInfo.setEditDeviceValueById(id,d.key, parseFloat(d.value),1,-1)
    //  })
  };
}

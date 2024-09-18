import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GWT_PORT_TYPE } from '../../Utils/Command';
import { UndoRedo } from '../../Utils/UndoRedoOpreation';

@Component({
  selector: 'app-wire-property',
  templateUrl: './wire-property.component.html',
  styleUrls: ['./wire-property.component.scss'],
})
export class WirePropertyComponent {
  @Input() data: any;
  @Input() cloneElm: any;

  private window: any = window;
  port_type = GWT_PORT_TYPE;

  inpuObj = {
    device_type:'',
    label_name: ''
  };
constructor(private changeDetectorRef: ChangeDetectorRef){
  
}
  ngOnChanges(props: any) {
    if (props.data) {
      this.inpuObj = props.data.currentValue.reduce((acc: any, d: any) => {
        acc[d.key] = d.value;
        return acc;
      }, {});
      console.log("onChange is calling")
      this.inpuObj={...this.inpuObj}
      this.changeDetectorRef.detectChanges();
    }
  }
  updatePortType(e: any) {
    this.inpuObj.device_type = e.target.value;
    this.window.deviceInfo.setEditDeviceValue('device_type', this.inpuObj.device_type);
    UndoRedo.addHistry(null);
  }

  updateDeviceName() {
    //this.inpuObj.device_name = e.target.value;
    this.window.deviceInfo.setEditDeviceValue('label_name', this.inpuObj.label_name);
  }
  selectElick(){
    console.log("selectElick")
  }
}

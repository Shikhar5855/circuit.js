import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UndoRedo } from '../../Utils/UndoRedoOpreation';
declare var CircuitJS1: any;

@Component({
  selector: 'app-voltage-property',
  templateUrl: './voltage-property.component.html',
  styleUrls: ['./voltage-property.component.scss'],
})
export class VoltagePropertyComponent {
  @Input() data: any;
  @Input() cloneElm: any;

  private window: any = window;
  inpuObj = {
    device_name: '',
    voltage_max: '',
    voltage_offset: '',
    voltage_frequency: '',
    voltage_phase_offset: '',
    voltage_duty_cycle: '',
    voltage_wave_type: '0',
  };
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnChanges(props: any) {
    if (props.data) {
      this.inpuObj = props.data.currentValue.reduce((acc: any, d: any) => {
        acc[d.key] = d.value;
        return acc;
      }, {});
      console.log(this.inpuObj);
    }
  }
  changeVoltageType(key: string, e: any) {
    this.inpuObj.voltage_wave_type = e.target.value;
    this.updateDeviceName(key, this.inpuObj.voltage_wave_type);
    // this.inpuObj={...this.inpuObj}
    this.changeDetectorRef.detectChanges();
    UndoRedo.addHistry(null)
  }
  updateDeviceName(key: string, value: any) {
    if (key != 'device_name') {
      value = parseFloat(value);
    }
    this.window.deviceInfo.setEditDeviceValue(key, value);
  }
}

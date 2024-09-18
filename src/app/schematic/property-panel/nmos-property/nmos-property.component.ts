import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var CircuitJS1: any;

@Component({
  selector: 'app-nmos-property',
  templateUrl: './nmos-property.component.html',
  styleUrls: ['./nmos-property.component.scss'],
})
export class NmosPropertyComponent {
  @Input() data: any;
  @Input() cloneElm: any;

  private window: any = window;
  inpuObj = {
    device_name: '',
    mosfet_threshold_voltage: '',
    mosfet_beta: '',
    transistor_width: '',
    transistor_length: '',
    transistor_multiplier: '',
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
  updateDeviceName(key: string, value: any) {
    if (key != 'device_name') {
      value = parseFloat(value);
    }
    this.window.deviceInfo.setEditDeviceValue(key, value);
  }
}

import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var CircuitJS1: any;

@Component({
  selector: 'app-npn-property',
  templateUrl: './npn-property.component.html',
  styleUrls: ['./npn-property.component.scss'],
})
export class NpnPropertyComponent {
  @Input() data: any;
  @Input() cloneElm: any;

  private window: any = window;

  inpuObj = {
    device_name: '',
    transistor_beta: '',
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

import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var CircuitJS1: any;

@Component({
  selector: 'app-inductor-property',
  templateUrl: './inductor-property.component.html',
  styleUrls: ['./inductor-property.component.scss'],
})
export class InductorPropertyComponent {
  @Input() data: any;
  @Input() cloneElm: any;

  private window: any = window;
  inpuObj = {
    device_name: '',
    inductor_value: '',
    inductor_init_voltage: '',
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

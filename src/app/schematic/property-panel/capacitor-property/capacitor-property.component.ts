import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var CircuitJS1: any;

@Component({
  selector: 'app-capacitor-property',
  templateUrl: './capacitor-property.component.html',
  styleUrls: ['./capacitor-property.component.scss'],
})
export class CapacitorPropertyComponent {
  @Input() data: any;
  @Input() cloneElm: any;

  private window: any = window;
  inpuObj:any = {
    capacitor_value: null,
    capacitor_init_voltage:'',
    device_name: '',
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnChanges(props: any) {
    if (props.data) {
      this.inpuObj = props.data.currentValue.reduce((acc: any, d: any) => {
        acc[d.key] = d.value;
        return acc;
      }, {});
      this.inpuObj.capacitor_value=parseFloat(this.inpuObj.capacitor_value+"")*1000000
      console.log(this.inpuObj);
    }
  }
  updateDeviceName(key: string, value: any) {
    if (key != 'device_name' ) {
      value = parseFloat(value);
      if(key=="capacitor_value"){
        value = value/1000000;
      }
    }
    this.window.deviceInfo.setEditDeviceValue(key, value);
  }
}

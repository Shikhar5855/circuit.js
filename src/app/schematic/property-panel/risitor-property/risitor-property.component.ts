import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, Output, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toBoolean } from '../../Utils/Parser';
declare var CircuitJS1: any;

@Component({
  selector: 'app-risitor-property',
  templateUrl: './risitor-property.component.html',
  styleUrls: ['./risitor-property.component.scss'],
})
export class RisitorPropertyComponent implements OnChanges, OnInit {
  @Input() data: any;
  @Input() cloneElm: any;
  private window: any = window;
  formData: any = [];
  commanProperty: any = { device_name: '', is_device_active: false };
  COMMAN_PROPERTY_NAME: any = ['device_name', 'is_device_active'];
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // this.window=this.document.defaultView;
  }
  ngOnInit(): void {
    if (this.cloneElm) {
      this.cloneElm['call'] = () => {
        this.cloneElmCreate();
      };
    }
  }
  ngOnChanges(props: any) {
    console.log('props1==>', props);
    if (props.data) {
      props.data.currentValue.filter(this.checkCommanProperty).forEach((d: any) => {
        if (d.key == 'device_name') {
          this.commanProperty.device_name = d.value;
        } else if (d.key == 'is_device_active') {
          this.commanProperty.is_device_active = toBoolean(d.value);
        }
      });
      this.commanProperty = { ...this.commanProperty };
      this.formData = props.data.currentValue.filter(this.checkProperty).map((d: any) => {
        d.value = parseFloat(d.value);
        return d;
      });

      console.log('props==>', this.formData);
    }
  }

  checkCommanProperty = (d: any) => {
    return this.COMMAN_PROPERTY_NAME.find((c: string) => d.key == c);
  };

  checkProperty = (d: any) => {
    return !this.COMMAN_PROPERTY_NAME.find((c: string) => d.key == c);
  };

  saveData() {
    //console.log("formdata==>", this.formData)
    this.formData.forEach((d: any) => {
      // console.log(d);
      this.window.deviceInfo.setEditDeviceValue(d.key, parseFloat(d.value));
    });

    //  this.formData=[];
  }
  changeValue(e: any) {
    console.log(e);
    // p.value=e.target.value;
  }

  changeProperty(key: string, value: string) {
    //console.log(key,value)
    this.window.deviceInfo.setEditDeviceValue(key, parseFloat(value));
  }

  updateDeviceName() {
    this.window.deviceInfo.setEditDeviceValue('device_name', this.commanProperty.device_name);
  }

  updateDeviceNameVisible() {
    this.window.deviceInfo.setEditDeviceValue('is_device_active', this.commanProperty.is_device_active);
  }

  cloneElmCreate = () => {
    //console.log("clone elm==>",this.formData);
    let id = CircuitJS1.createNewCircuit('R', 10, 50, 150, 50);
    this.formData.forEach((d: any) => {
      // console.log(d);
      this.window.deviceInfo.setEditDeviceValueById(id, d.key, parseFloat(d.value), 1, -1);
    });
  };
}

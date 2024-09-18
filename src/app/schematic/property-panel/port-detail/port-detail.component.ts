import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DeviceDetail, PointDetails } from '../../Utils/OnCanvasMouseRelease';
import { toBoolean } from '../../Utils/Parser';
import { GWT_PORT_TYPE } from '../../Utils/Command';
declare var onCanvasMouseRelease:any;
@Component({
  selector: 'app-port-detail',
  templateUrl: './port-detail.component.html',
  styleUrls: ['./port-detail.component.scss'],
})
export class PortDetailComponent implements OnInit, OnChanges {
  @Input() data?: any;
  @Input() external?: any;

  port_type = GWT_PORT_TYPE;
  private window: any = window;
  formData: any = [];
  externalData: any = [];
  constructor() {}
  ngOnChanges(changes: any): void {
    this.externalData = [];
    this.formData = [];
    if (changes.data.currentValue) {
      this.formData = changes.data.currentValue.map((d: any) => {
        d["name"]=DeviceDetail.portObj[d.x+"_"+d.y].name;
        return d;
      });
      this.formData = JSON.parse(JSON.stringify(this.formData));
    }
     console.log("Port obj==>",DeviceDetail.portObj);
     console.log("Port Data==>",this.formData);
    if (changes.external.currentValue) {
      this.externalData = changes.external.currentValue.map((d: any) => d);
      this.externalData = JSON.parse(JSON.stringify(this.externalData));
    }
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  updatePortName(p: PointDetails) {
    
    if(!p.isConnected){
    const activeId=DeviceDetail.portObj[p.x+"_"+p.y].active;
    if(activeId){
      this.window.deviceInfo.updateConnectedPoint(parseInt(activeId+""),p.name)
      //this.window.deviceInfo.updateConnectDevice(parseInt(activeId + ''), p.name);
     // DeviceDetail.updateLatestPoint();
      onCanvasMouseRelease()
    }
    }
    else{
      DeviceDetail.updateLatestPoint();
      let name = p.pname;
      if (p.isConnected) {
        name = p.tname;
      }

      DeviceDetail.pointList.forEach((d: PointDetails) => {
          if(name==d.name){
          if (!d.isConnected) {
            this.window.deviceInfo.updateConnectedPoint(parseInt(d.id + ''), p.name);
          } else {
            this.window.deviceInfo.updateConnectDevice(parseInt(d.id + ''), p.name);
          }
        }
      });
    }
    // if(p.isConnected){

    // }
    //this.window.deviceInfo.setDevicePropertyValue(parseInt(id+""),"portName",value)
  }
  enableDisablePort(id: string, value: string) {
    this.window.deviceInfo.setDevicePropertyValue(parseInt(id + ''), 'isActive', toBoolean(value));
  }
  updateOffsetX(id: string, value: string) {
    this.window.deviceInfo.setDevicePropertyValue(parseInt(id + ''), 'offsetX', value + '');
  }
  updateOffsetY(id: string, value: string) {
    this.window.deviceInfo.setDevicePropertyValue(parseInt(id + ''), 'offsetY', value + '');
  }
  updatePortType(p: any, e: any) {
    const commanPoint = DeviceDetail.pointList.filter((d: any) => d.x == p.x && d.y == p.y);
    console.log('commanPoint==>', commanPoint);
    commanPoint.forEach((d) => {
      this.window.deviceInfo.updateConnectedPointType(parseInt(d.id + ''), e.target.value);
    });
  }
  updatePower(p: any, e: any) {
    if (p.key == 'vdd') {
      if (e.target.value == 'vdd') {
        this.window.deviceInfo.updateExternalPower(parseInt(p.id), 1, 1);
      } else if (e.target.value == 'vddi') {
        this.window.deviceInfo.updateExternalPower(parseInt(p.id), 1, 0);
      }
    } else {
      if (e.target.value == 'vss') {
        this.window.deviceInfo.updateExternalPower(parseInt(p.id), 0, 1);
      } else if (e.target.value == 'vssi') {
        this.window.deviceInfo.updateExternalPower(parseInt(p.id), 0, 0);
      }
    }
  }
}

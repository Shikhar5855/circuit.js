import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DeviceDetail } from '../Utils/OnCanvasMouseRelease';
import { EventListner, EVENT_NAME } from '../Utils/EventListner';
import { UndoRedo } from '../Utils/UndoRedoOpreation';
declare var gwtEvent: any;
declare var CircuitJS1: any;
declare var onCanvasMouseRelease:any;
@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.scss'],
})
export class PropertyPanelComponent {
  device_id: number = -1;
  device_type = '';
  window?: any = window;
  count = 0;
  input: any = [];
  ports: any = [];
  externalPower: any = [];
  isPortActive = -1;
  isDeviceSeleted = false;
  cloneElm: any = {};
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.window['ongwtEvent'] = (id: string, obj: any) => {
      if(this.isPortActive==-1){
        this.isPortActive = 0;
      }
      //this.isPortActive = 0;
      DeviceDetail.updateLatestPoint();
      onCanvasMouseRelease(null);
      this.isDeviceSeleted = false;
      this.device_id = parseInt(id + '');
      this.device_type = DeviceDetail.deviceTypeObj[id];
      console.log('logs==>', this.device_type, obj);
      setTimeout(()=>{
        this.isDeviceSeleted=true;
        this.devicePropertyCallBack(id, JSON.parse(obj) || []);
        EventListner.emit(EVENT_NAME.DEVICE_SELECTED, {
        device_type:this.device_type,
        data:JSON.parse(obj)
        });
      },100)
      this.changeDetectorRef.detectChanges();
    };
    DeviceDetail.addDeviceChange(() => {
      this.isDeviceSeleted = false;
      //EventListner.emit(EVENT_NAME.DEVICE_DESELECTED, {});
      this.isPortActive = -1;
      this.changeDetectorRef.detectChanges();
    });

    EventListner.addEvent(EVENT_NAME.DEVICE_DELETEED, () => {
      this.isDeviceSeleted = false;
      this.deloeteEle();
      // this.isPortActive=-1;
      EventListner.emit(EVENT_NAME.DEVICE_DESELECTED, {});
      //this.changeDetectorRef.detectChanges();
    });
    EventListner.addEvent(EVENT_NAME.DEVICE_LEFT_ROTATE, () => {
       CircuitJS1.rotateEle(1);
    });

    EventListner.addEvent(EVENT_NAME.DEVICE_RIGHT_ROTATE, () => {
      CircuitJS1.rotateEle(0);
    });

    EventListner.addEvent(EVENT_NAME.DEVICE_CLONE, () => {
      if (this.cloneElm.call) {
        this.cloneElm.call(this.device_id);
      }
    });
    // console.log(this.window)
  }
  devicePropertyCallBack(id: string, obj: any) {
    this.externalPower = [];
    this.ports = this.device_id > 0 ? DeviceDetail.filterPointById(id) : [];
    const deviceDetail = DeviceDetail.findDeviceById(id);
    if (deviceDetail.type == 'G' || deviceDetail.type == 'N') {
      this.externalPower.push({ id: deviceDetail.did, key: 'vdd', name: 'Power', value: deviceDetail.power });
      this.externalPower.push({ id: deviceDetail.did, key: 'vss', name: 'Ground', value: deviceDetail.ground });
    }
    // console.log("Device detail==>",deviceDetail);
    // console.log("ports==>",this.ports)
    this.input = [...(obj || [])];
    this.count++;
    this.changeDetectorRef.detectChanges();
  }

  deloeteEle() {
   // this.window?.addHistryEvent("delete",this.device_id)
    UndoRedo.deleteOpreation(this.device_id);
   // CircuitJS1.deleteEle(this.device_id);
    this.ports = [];
    this.input = [];
    this.device_id = -1;
    this.isPortActive = -1;
    this.changeDetectorRef.detectChanges();
  }
}

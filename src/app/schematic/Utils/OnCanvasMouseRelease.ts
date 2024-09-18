import { EVENT_NAME, EventListner } from './EventListner';
import { toBoolean } from './Parser';
import { UndoRedo } from './UndoRedoOpreation';
import { DeviceComponent } from './device';
import { cloneDevice, getDeviceToCircuitObj } from './device/util';

declare var addDeviceChange: any;
declare var CircuitJS1: any;
declare var addHistryEventCB:any;
export type PointDetails = {
  pname: string;
  x: string;
  y: string;
  dname: string;
  did: string;
  status: boolean;
  id: string;
  tname: string;
  isConnected: boolean;
  name: string;
};
export class DeviceDetail {
  public static pointList: Array<PointDetails>;
  public static portObj: any;
  public static wireObj: any;
  public static wirePortObj: any;
  public static deviceList: any;
  public static deviceTypeObj: any;
  private static callBackList: any = [];
  static undoItemList:any=[];
  static redoItemList:any=[];
  public static init() {
    addDeviceChange(({ portObj, wireObj, wirePort, deviceTypeObj, deviceJson, pointObj, pointJson }: any) => {
      console.log('result==>', deviceJson);
      this.portObj = portObj;
      this.deviceTypeObj = deviceTypeObj;
      this.deviceList = deviceJson;
      this.updateLatestPoint();
      //this.updatePoint(pointJson)
      //this.updatePortType();
      // this.callBackList.forEach((cb: any) => {
      //   if (cb) {
      //     cb({ status: true, msg: 'deviceDetail updated!' });
      //   }
      // });
    });
    addHistryEventCB((name:string,id:number)=>{
      setTimeout(()=>{
        if(name=="new")
          UndoRedo.addHistry(id);
        else{
          UndoRedo.addHistry(null);
        }
      // if(name=="new" || name=="delete"){
      //     const deviceCir:DeviceComponent= getDeviceToCircuitObj()
      //     const cirList:any=deviceCir.device.filter((d)=>d.is_selected);
      //     this.undoItemList.push({op:name,device:cirList,id});
      // }
      // else if(name=="update"){
      //   for(let i=this.undoItemList.length-1;i>=0;i--){
      //     if(this.undoItemList[i].is_selected==id){
      //       const newDiv=cloneDevice(this.undoItemList[i]);
      //       this.undoItemList.push({op:name,device:newDiv,id});
      //     }
      //   }
      // }
      // this.redoItemList=[];
      // console.log(this.undoItemList);
      // EventListner.emit(EVENT_NAME.UNDO_REDO_EVENT,{name,id})
    },500)
      
    })
  }

  static callDeviceChanges(){
    this.callBackList.forEach((cb: any) => {
      if (cb) {
        cb({ status: true, msg: 'deviceDetail updated!' });
      }
    });
  }

  public static updatePoint(pointJson: any) {
    this.pointList = pointJson.map((d: any) => {
      d.isConnected = toBoolean(d.isConnected);
      d.status = toBoolean(d.status);
      d.is_wire_fixed = toBoolean(d.is_wire_fixed);
      if (d.isConnected) {
        d['name'] = d.tname;
      } else if (!d.status) {
        d['name'] = d.pname;
      } else {
        d['name'] = '';
      }
      return d;
    });
  }

  public static addDeviceChange(cb: any) {
    this.callBackList.push(cb);
  }

  public static filterPointById(id: string) {
    if (this.pointList && this.pointList.length > 0) {
      return this.pointList.filter((d: any) => d.did == id);
    }
    return [];
  }

  public static findDeviceById(id: string) {
    if (this.deviceList && this.deviceList.length > 0) {
      return this.deviceList.find((d: any) => {
        return d.did == id;
      });
    }
    return null;
  }

  public static getDeviceDetails() {
    this.updateLatestPoint();
    const deviceDetails = this.deviceList.reduce((acc: any, d: any) => {
      if (!acc[d.name]) {
        acc[d.name] = {
          ...d,
          points: [],
        };
      }
      return acc;
    }, {});

    const ioList: any = [];
    const pointDetails = this.pointList.reduce((acc: any, d: any) => {
      if (deviceDetails[d.dname].type != 'P') {
        if (deviceDetails[d.dname]) {
          deviceDetails[d.dname].points.push(d);
        }
        if (!acc[d.x + '_' + d.y]) {
          acc[d.x + '_' + d.y] = [];
        }
        acc[d.x + '_' + d.y].push({ ...d, d_type: d.type });
      } else {
        ioList.push({ key: this.getPortKey(d), type: d.wire_type });
      }

      return acc;
    }, {});
    const equalPoints = this.getConnectedWireList(deviceDetails);
    const pointNetName: any = {};
    const remainingPoint = [];
    for (const i in pointDetails) {
      const validPoints = pointDetails[i].find((p: any) => {
        return deviceDetails[p.dname].type != 'W' && p.name;
      });
      if (validPoints) {
        pointNetName[i] = validPoints.name;
      } else {
        remainingPoint.push(i);
      }
    }
    remainingPoint.forEach((k) => {
      if (equalPoints[k]) {
        const rkey = equalPoints[k].find((k1: any) => {
          return pointNetName[k1];
        });
        if (rkey) {
          pointNetName[k] = pointNetName[rkey];
        }
      }
    });

    const ioObj: any = {};
    ioList.forEach((d: any) => {
      ioObj[pointNetName[d.key]] = d.type;
    });
    return { deviceDetails, pointDetails, equalPoints, pointNetName, ioObj };
    //  console.log("point & wiredata data==>",wireDevice,pointData);
    //const portData=this.pointList.
  }

  public static getPortKey(point: any) {
    return point.x + '_' + point.y;
  }
  public static getConnectedWireList(deviceDetails: any) {
    const pointObj: any = {};
    const visitPoint: any = {};
    for (const i in deviceDetails) {
      if (deviceDetails[i].type == 'W') {
        deviceDetails[i].points.forEach((p: any) => {
          const key = this.getPortKey(p);
          visitPoint[key] = false;
          if (!pointObj[key]) {
            pointObj[key] = [];
          }
          pointObj[key].push(deviceDetails[i].name);
        });
      }
    }

    const equalPointList: any = {};
    for (const i in visitPoint) {
      if (!visitPoint[i]) {
        const stack = [i];
        const equalPoints: any = [];
        while (stack.length > 0) {
          const p_key: any = stack.pop();
          equalPoints.push(p_key);
          visitPoint[p_key] = true;
          pointObj[p_key].forEach((d_name: string) => {
            const [p1, p2]: any = deviceDetails[d_name].points;
            const p1_key = this.getPortKey(p1);
            const p2_key = this.getPortKey(p2);
            if (p1_key == p_key && !visitPoint[p2_key]) {
              stack.push(p2_key);
            } else if (p2_key == p_key && !visitPoint[p1_key]) {
              stack.push(p1_key);
            }
          });
        }
        equalPoints.forEach((key_p: any) => {
          equalPointList[key_p] = equalPoints;
        });
        //equalPointList.push(equalPoints);
      }
    }
    return equalPointList;
    //  console.log(pointObj,visitPoint)
  }

  public static updateLatestPoint() {
    let updatePointList = JSON.parse(CircuitJS1.exportPointCircuit());
    this.updatePoint(updatePointList);
  }
}

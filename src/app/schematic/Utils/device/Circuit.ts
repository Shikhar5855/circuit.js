import { DEVICE_TYPE } from "./DeviceConst";
import { PORT_DETAIL, PORT_NAME } from "./DeviceType";
declare var CircuitJS1: any;

export class CircuitConst{
  static is_copy_ele=false;
  static last_mouse_down_event:any=null;
  static last_mouse_down_pos:any=null;
  static canvas:any=null;
}
export class Circuit{
    id:any;
    x:number=0;
    y:number=0
    x1:number=0;
    y1:number=0;
    type?:DEVICE_TYPE;
    name?:string=""
    port_list:Array<PORT_DETAIL>=[]
    is_selected:boolean=false;
    window:any=window;
    constructor(id:any,x:number,y:number,x1:number,y1:number,type:DEVICE_TYPE){
       this.id=id;
       this.x=x;
       this.y=y;
       this.x1=x1;
       this.y1=y1;
       this.type=type;
    }

    setPortList(port_list:Array<PORT_DETAIL>){
      this.port_list=port_list;
    }
    setName(name:string){
        this.name=name;
    }
    checkCommanValidation(){
      if(!this.name){
        return "Device name empty"
      }
      else if(this.port_list.filter((d)=>!d.portName).length>0){
        return "port name is empty"
      }
      return null;
    }
    updateComman(id:any){
      this.setDeviceProperty(id,"device_name",this.name);
      if(!CircuitConst.is_copy_ele){
          this.port_list.forEach((d:PORT_DETAIL)=>{
            this.setPortProperty(d.netType,d.portName);
          })
      }
    }
    setDeviceProperty(id:number,key:string,value:any){
        this.window.deviceInfo.setEditDeviceValueById(id,key,value,1,-1);
    }
    setPortProperty(netType:string,netName:string){
        this.window.deviceInfo.updatePortByNetName(this.id,netType,netName);
    }
    setPostion(){
        CircuitJS1.setPostion(this.id,parseInt(this.x+""),parseInt(this.y+""),parseInt(this.x1+""),parseInt(this.y1+""));
    }
    setSelected(val:string){
      if(val=="false"){
        this.is_selected=false;
      }
      else{
        this.is_selected=true;
      }
    }
}


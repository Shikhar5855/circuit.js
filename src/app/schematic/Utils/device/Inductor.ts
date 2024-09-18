import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";

export class Inductor  extends Circuit implements CircuitInterface {
  value:number=0;
  init_current:number=0;
  constructor(id:number,x:number,y:number,x1:number,y1:number,val:number,init_current:number) {
    super(id,x,y,x1,y1,DEVICE_TYPE.INDUCTOR)
    this.value=val;
    this.init_current=init_current;
  }
  toCircuitString(){
    return `l ${this.x} ${this.y} ${this.x1} ${this.y1} ${0} ${this.value} 0 ${this.init_current} ${this.id}`
  }
  update(id:number){
    this.updateComman(id);
    this.setDeviceProperty(id,"inductor_value",parseInt(this.value+""));
    this.setDeviceProperty(id,"inductor_init_voltage",parseInt(this.init_current+""));
    //this.updateCommanNetProperty();
  }
  getNetlistValue(pointObj:any) {
    const [p1,p2] = this.port_list;
    const p1_net=pointObj[p1.x+"_"+p1.y];
    const p2_net=pointObj[p2.x+"_"+p2.y];
    return `${this.name} ${p1_net} ${p2_net} ${this.value}`;
  }
  setNameById(id:number){
    this.name="I"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    else if(!this.value){
      return "Inductor value is empty"
    }
    else if(!this.init_current){
      return "Inductor init Current value is empty"
    }
    return null
  }
}

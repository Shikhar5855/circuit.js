import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
export class Risitor extends Circuit implements CircuitInterface {
  value:number=0;
  constructor(id:number,x:number,y:number,x1:number,y1:number,val:number) {
       super(id,x,y,x1,y1,DEVICE_TYPE.RESITOR)
       this.value=val;
  }
  toCircuitString(){
    return `r ${this.x} ${this.y} ${this.x1} ${this.y1} ${0} ${this.value} ${this.id}`
  }
  update(id:number){
    this.updateComman(id);
    this.setDeviceProperty(id,"resistor_value",parseInt(this.value+""));
    //this.updateCommanNetProperty();
  }
  getNetlistValue(pointObj:any) {
    const [p1,p2] = this.port_list;
    const p1_net=pointObj[p1.x+"_"+p1.y];
    const p2_net=pointObj[p2.x+"_"+p2.y];
    return `${this.name} ${p1_net} ${p2_net} ${this.value}`;
  }
  setNameById(id:number){
    this.name="R"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    else if(!this.value){
      return "Resistor value is empty"
    }
    return null
  }

}

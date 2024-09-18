import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
export class Wire extends Circuit implements CircuitInterface {
  constructor(id:number,x:number,y:number,x1:number,y1:number) {
       super(id,x,y,x1,y1,DEVICE_TYPE.WIRE)
  }
  toCircuitString(){
    return `w ${this.x} ${this.y} ${this.x1} ${this.y1} ${0} ${this.id}`
  }
  update(id:number){
    this.updateComman(id);
    //this.updateCommanNetProperty();
  }
  getNetlistValue([p1, p2]: any, name: any) {
    return ``;
  }
  setNameById(id:number){
    this.name="W"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    return null
  }
}
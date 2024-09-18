import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
import { PORT_NAME } from "./DeviceType";
export class IO extends Circuit implements CircuitInterface {
  ioType:string="";
  label_name:string=""
  constructor(id:number,x:number,y:number,x1:number,y1:number,ioType:string,label_name:string) {
       super(id,x,y,x1,y1,DEVICE_TYPE.INPUT_OUTPUT)
       this.ioType=ioType;
       this.label_name=label_name;
  }
  toCircuitString(){
    return `207 ${this.x} ${this.y} ${this.x1} ${this.y1} ${4} ${this.ioType} ${this.id}`
  }
  update(id:number){
    console.log("Start updating device property")
    this.updateComman(id);
    this.setDeviceProperty(id,"device_type",this.ioType);
    this.setDeviceProperty(id,"label_name",this.label_name);
    console.log("end updating device property")

   // this.setPortProperty(PORT_NAME.net1,this.net1_name);
  }
  setNameById(id:number){
    this.name="P"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    return null
  }
}

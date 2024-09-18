import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
import { GWT_PORT_TYPE } from "../Command";

export class SubCir extends Circuit implements CircuitInterface {
  cell_name:string=""
  constructor(id:number,x:number,y:number,x1:number,y1:number,cell_name:string) {
       super(id,x,y,x1,y1,DEVICE_TYPE.SUB_CIRCUIT)
       this.cell_name=cell_name;
  }
  toCircuitString(){
    return `410 ${this.x} ${this.y} ${this.x1} ${this.y1} ${1} ${this.cell_name} 0\\s1000 ${this.id}`
  }

  
  update(id:number){
    this.updateComman(id);
    //this.setDeviceProperty(id,"resistor_value",this.value);
  }
  getNetlistValue(pointObj:any) {
    const inpL=this.port_list.map((p)=>pointObj[p.x+"_"+p.y]);
    const pinList=[...inpL].filter((d)=>d).join(" ");
    return `${this.name} ${pinList} ${this.cell_name}`;
  }
  setNameById(id:number){
    this.name="X"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    return null
  }

}

import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
import { CircuitDepency} from "../SubCirDependancy/Dependancy";
import { ModelDependancy } from "../SubCirDependancy/Dependancy";

export class Daiod  extends Circuit implements CircuitInterface{
  constructor(id:number,x:number,y:number,x1:number,y1:number) {
       super(id,x,y,x1,y1,DEVICE_TYPE.DAIOD)
  }
  toCircuitString(){
    return `d ${this.x} ${this.y} ${this.x1} ${this.y1} ${2} default ${this.id}`
  }
  update(id:number){
    this.updateComman(id);
    //this.updateCommanNetProperty()
  }

  getNetlistValue(pointObj:any,cirDep:CircuitDepency) {
    const [p1,p2] = this.port_list;
    const p1_net=pointObj[p1.x+"_"+p1.y];
    const p2_net=pointObj[p2.x+"_"+p2.y];
    cirDep.model.Daiod = true;
    return `${this.name} ${p1_net} ${p2_net} ${ModelDependancy.DAIOD_MODEL_NAME}`;
  }
  setNameById(id:number){
    this.name="D"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    return null
  }
}

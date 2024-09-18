import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
import { PORT_NAME } from "./DeviceType";
import { CircuitDepency, ModelDependancy } from "../SubCirDependancy/Dependancy";


export class Transistor extends Circuit implements CircuitInterface {
  constructor(id:number,x:number,y:number,x1:number,y1:number,isNPN:boolean) {
    super(id,x,y,x1,y1,isNPN?DEVICE_TYPE.NPN:DEVICE_TYPE.PNP)
  }


  toCircuitString(){
    return `t ${this.x} ${this.y} ${this.x1} ${this.y1} 0 ${DEVICE_TYPE.NPN?1:-1} 0 0 100 defaultn ${this.id}`
  }
  update(id:number){
    this.updateComman(id);
    // this.setPortProperty(PORT_NAME.netB,this.netB_name);
    // this.setPortProperty(PORT_NAME.netC,this.netC_name);
    // this.setPortProperty(PORT_NAME.netE,this.netE_name)
   // this.setDeviceProperty(id,"resistor_value",this.value);
  }
  getNetlistValue(pointObj:any,cirDep:CircuitDepency) {
    const portObj=this.port_list.reduce((acc:any,d)=>{
         acc[d.netType]=pointObj[d.x+"_"+d.y];
         return acc;
    },{})
    const {netB,netC,netE} = portObj;

    // cirDep.VDD=true;
    // cirDep.VSS=true;
    let modelName=""
    if(this.type==DEVICE_TYPE.NPN){
      cirDep.model.NMOS=true;
      modelName=ModelDependancy.NPN_MODEL_NAME;
    }
    else if(this.type==DEVICE_TYPE.PNP){
      cirDep.model.PMOS=true;
      modelName=ModelDependancy.PNP_MODEL_NAME;
    }

    return `${this.name} ${netC} ${netB} ${netE} ${modelName}`
    // if (points.length == 4) {
    //   return `m${name} ${D} ${G} ${S} ${S}  ${this.getGateDetail()} ${modelProperty.join(' ')}`;
    // } else return `m${name} ${D} ${G} ${S} ${S} ${this.getGateDetail()} ${modelProperty.join(' ')}`;
  }
  setNameById(id:number){
    this.name="M"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    return null
  }

}

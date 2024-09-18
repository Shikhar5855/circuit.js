import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
import { PORT_NAME } from "./DeviceType";
import { CircuitDepency, ModelDependancy } from "../SubCirDependancy/Dependancy";
export class Mosfet extends Circuit implements CircuitInterface {
  threshold_voltage: number;
  width: number=0;
  length: number=0;
  multiplier: number=0;
  is_body_active:boolean=false;
  constructor(id:number,x:number,y:number,x1:number,y1:number,threshold_voltage:number,isNmos:boolean) {
    super(id,x,y,x1,y1,isNmos?DEVICE_TYPE.NMOS:DEVICE_TYPE.PMOS)
    this.threshold_voltage=threshold_voltage;
  }

  setProperty(width:number,length:number,multiplier:number){
    this.width=width;
    this.length=length;
    this.multiplier=multiplier;
  }
  
  setBodystatus(status:boolean){
    this.is_body_active=status;
  }
  toCircuitString(){
    return `f ${this.x} ${this.y} ${this.x1} ${this.y1} ${DEVICE_TYPE.NMOS?32:33} ${this.threshold_voltage} 0.02 ${this.id}`
  }

  update(id:number){
    this.updateComman(id);
    this.setDeviceProperty(id,"mosfet_threshold_voltage",parseInt(this.threshold_voltage+""));
    //this.setDeviceProperty(id,"mosfet_beta",this);
    this.setDeviceProperty(id,"transistor_width", parseInt(this.width+""));
    this.setDeviceProperty(id,"transistor_length",parseInt(this.length+""));
    this.setDeviceProperty(id,"transistor_multiplier",parseInt(this.multiplier+""));
  }
  getNetlistValue(pointObj:any,cirDep:CircuitDepency) {
    const portObj=this.port_list.reduce((acc:any,d)=>{
         acc[d.netType]=pointObj[d.x+"_"+d.y];
         return acc;
    },{})
    const {netB,netG,netD,netS} = portObj
    // cirDep.VDD=true;
    // cirDep.VSS=true;
    let modelName=""
    if(this.type==DEVICE_TYPE.NMOS){
      cirDep.model.NMOS=true;
      modelName=ModelDependancy.NMOS_MODEL_NAME;
    }
    else if(this.type==DEVICE_TYPE.PMOS){
      cirDep.model.PMOS=true;
      modelName=ModelDependancy.PMOS_MODEL_NAME;
    }

    const modelProperty = [];
    if (this.width) {
      modelProperty.push('w=' + this.width);
    }
    if (this.length) {
      modelProperty.push('l=' + this.length);
    }
    if (this.multiplier) {
      modelProperty.push('m=' + this.multiplier);
    }
    //return `${this.name} ${netS} ${netG} ${netD} ${netB} ${modelName} ${modelProperty.join(' ')}`
    return `${this.name} ${netD} ${netG} ${netS} ${netS} ${modelName} ${modelProperty.join(' ')}`
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

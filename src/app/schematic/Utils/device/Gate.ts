import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";
import { PORT_NAME } from "./DeviceType";
import { ModelDependancy, CircuitDepency } from "../SubCirDependancy/Dependancy";
import { GATE_SUB_CIR_NAME } from "../SubCirDependancy/gates";
import { GWT_PORT_TYPE } from "../Command";

export class Gate extends Circuit implements CircuitInterface{
  no_of_input:number=2;
  threshold_voltage:number=0;
  width_n:number=0;
  width_p:number=0;
  length:number=0;
  multiplier:number=0;
  power="";
  ground="";
  constructor(id:number,x:number,y:number,x1:number,y1:number,no_of_input:number,threshold_voltage:number,
    deviceType:DEVICE_TYPE=DEVICE_TYPE.ANDGATE 
      || DEVICE_TYPE.ORGATE 
      || DEVICE_TYPE.NORGATE 
      || DEVICE_TYPE.XORGATE
      || DEVICE_TYPE.NANDGATE
      || DEVICE_TYPE.NOTGATE 
      ) {
    super(id,x,y,x1,y1,deviceType)
    this.no_of_input=no_of_input;
    this.threshold_voltage=threshold_voltage;
  }
  setProperty(width_n:number,width_p:number,length:number,multiplier:number){
    this.width_n=width_n;
    this.width_p=width_p;
    this.length=length;
    this.multiplier=multiplier;
  }
  setPower(power:string,ground:string){
   this.power=power;
   this.ground=ground;
  }
  toCircuitString(){
    let gateNo="";
    if(this.type==DEVICE_TYPE.ANDGATE){
      gateNo="150";
    }
    else if(this.type==DEVICE_TYPE.ORGATE){
      gateNo="152";
    }
    else if(this.type==DEVICE_TYPE.NANDGATE){
      gateNo="151";
    }
    else if(this.type==DEVICE_TYPE.NORGATE){
      gateNo="153"
    }
    else if(this.type==DEVICE_TYPE.XORGATE){
      gateNo="154"
    }
    else if(this.type==DEVICE_TYPE.NOTGATE){
     gateNo="I"
    }
    
    if(gateNo=="I"){
      return `I ${this.x} ${this.y} ${this.x1} ${this.y1} ${0} 0.5 5 ${this.name}`
    }
    else{
      return `${gateNo} ${this.x} ${this.y} ${this.x1} ${this.y1} ${0} ${this.no_of_input} 0 5 ${this.id}`
    }
  }

  update(id:number){
    this.setDeviceProperty(id,"no_of_input",this.no_of_input);
    this.updateComman(id);
 //   this.setDeviceProperty(id,"high_logic_voltage",this.init_voltage);
    this.setDeviceProperty(id,"transistor_width_n",parseInt(this.width_n+""));
    this.setDeviceProperty(id,"transistor_width_p",parseInt(this.width_p+""));
    this.setDeviceProperty(id,"transistor_length",parseInt(this.length+""));
    this.setDeviceProperty(id,"transistor_multiplier",parseInt(this.multiplier+""));
  
      if (this.power == 'vdd') {
        this.window.deviceInfo.updateExternalPower(parseInt(this.id), 1, 1);
      } else if (this.power == 'vddi') {
        this.window.deviceInfo.updateExternalPower(parseInt(this.id), 1, 0);
      }
      if (this.ground == 'vss') {
        this.window.deviceInfo.updateExternalPower(parseInt(this.id), 0, 1);
      } else if (this.ground == 'vssi') {
        this.window.deviceInfo.updateExternalPower(parseInt(this.id), 0, 0);
      }
    // if(this.no_of_input==3){
    //   this.setPortProperty(PORT_NAME.net3,this.net3_name);
    // }
  }
  getNetlistValue(pointObj:any,cirDep:CircuitDepency) {
    const inpL=this.port_list.filter((p)=>p.netType!="netO").map((p)=>pointObj[p.x+"_"+p.y]);
    const outL=this.port_list.filter((p)=>p.netType=="netO").map((p)=>pointObj[p.x+"_"+p.y]);
    const modelProperty = [];
    if (this.width_p) {
      modelProperty.push('wp=' + this.width_p);
    }
    if (this.width_n) {
      modelProperty.push('wn=' + this.width_n);
    }
    if (this.length) {
      modelProperty.push('l=' + this.length);
    }
    if (this.multiplier) {
      modelProperty.push('m=' + this.multiplier);
    }
    cirDep.model.PMOS = true;
    cirDep.model.NMOS = true;
    let substringName=""
    switch(this.type){
        case DEVICE_TYPE.ANDGATE:
          if(this.no_of_input==2){
             cirDep.sub_cir.and2=true;
             substringName=GATE_SUB_CIR_NAME.and2;
          }
          else if(this.no_of_input==3){
            cirDep.sub_cir.and3=true;
            substringName=GATE_SUB_CIR_NAME.and3;
          }
        break;
        case DEVICE_TYPE.ORGATE:
          if(this.no_of_input==2){
            cirDep.sub_cir.or2=true;
            substringName=GATE_SUB_CIR_NAME.or2;
         }
         else if(this.no_of_input==3){
          cirDep.sub_cir.or3=true;
          substringName=GATE_SUB_CIR_NAME.or3;
         }
        break;
        case DEVICE_TYPE.NANDGATE:
          if(this.no_of_input==2){
            cirDep.sub_cir.nand2=true;
            substringName=GATE_SUB_CIR_NAME.nand2;
         }
         else if(this.no_of_input==3){
          cirDep.sub_cir.nand3=true;
          substringName=GATE_SUB_CIR_NAME.nand3;
         }
        break;
        case DEVICE_TYPE.NORGATE:
          if(this.no_of_input==2){
            cirDep.sub_cir.nor2=true;
            substringName=GATE_SUB_CIR_NAME.nor2;
         }
         else if(this.no_of_input==3){
          cirDep.sub_cir.nor3=true;
          substringName=GATE_SUB_CIR_NAME.nor3;
         }
        break;
        case DEVICE_TYPE.XORGATE:
          if(this.no_of_input==2){
            cirDep.sub_cir.xor2=true;
            substringName=GATE_SUB_CIR_NAME.xor2;
         }
         else if(this.no_of_input==3){
          cirDep.sub_cir.xor3=true;
          substringName=GATE_SUB_CIR_NAME.xor3;
         }
        break;
        case DEVICE_TYPE.NOTGATE:
          cirDep.sub_cir.notG=true;
          substringName=GATE_SUB_CIR_NAME.not1;
        break;
    }
    // let powerS="vdd";
    // let groundS="vss";
    // if(this.power.toLowerCase()==GWT_PORT_TYPE.VDDI.toLowerCase()){
    //   powerS=GWT_PORT_TYPE.VDDI;
    // }
    // if(this.power.toLowerCase()==GWT_PORT_TYPE.VSSI.toLowerCase()){
    //   groundS=GWT_PORT_TYPE
    // }
    // cirDep.VDD=true;
    // cirDep.VSS=true;
    return `${this.name} ${outL.join(" ")} ${inpL.join(" ")} ${this.power} ${this.ground} ${substringName} ${modelProperty.join(' ')}`;

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

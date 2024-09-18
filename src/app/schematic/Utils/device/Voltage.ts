import { DEVICE_TYPE, VOLTAGE_SOURCE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { CircuitInterface } from "./CircuitInterface";

export class Voltage extends Circuit implements CircuitInterface{
  voltage_type:number=1;
  voltage_value:number=5;
  frequency;
  dc_offset;
  phase_angle;
  duty_cycle;
  td_delay = 0;
  constructor(id:number,x:number,y:number,x1:number,y1:number,voltage_type: number, frequency: number, dc_offset: number, phase_angle: number, duty_cycle: number,voltage_value:number) {
    super(id,x,y,x1,y1,DEVICE_TYPE.VOLTAGE)
    this.voltage_type = voltage_type;
    this.frequency = parseFloat(frequency+"");
    this.dc_offset = parseFloat(dc_offset+"");
    this.phase_angle =parseFloat(phase_angle+"");
    this.duty_cycle = parseFloat(duty_cycle+"");
    this.voltage_value=parseFloat(voltage_value+"")
  }
  toCircuitString(){
    return `v ${this.x} ${this.y} ${this.x1} ${this.y1} ${0} ${this.voltage_type} ${this.frequency} 5 ${this.dc_offset} ${this.phase_angle} ${this.duty_cycle}  ${this.id}`
  }
  update(id:number){
    this.updateComman(id);
    this.setDeviceProperty(id,"voltage_max",this.voltage_value);
    this.setDeviceProperty(id,"voltage_offset",this.dc_offset);
    this.setDeviceProperty(id,"voltage_frequency",this.frequency);
    this.setDeviceProperty(id,"voltage_phase_offset",this.phase_angle);
    this.setDeviceProperty(id,"voltage_duty_cycle",this.duty_cycle);
    this.setDeviceProperty(id,"voltage_wave_type",this.voltage_type);
    //this.updateCommanNetProperty();
  }
  getNetlistValue(pointObj:any) {
    const [n1,n2] = this.port_list;
    const p1=pointObj[n1.x+"_"+n1.y];
    const p2=pointObj[n2.x+"_"+n2.y];
    if (VOLTAGE_SOURCE_TYPE.DC == this.voltage_type) {
      return `${this.name} ${p1} ${p2} ${this.voltage_value + this.dc_offset}`;
    } else if (VOLTAGE_SOURCE_TYPE.AC == this.voltage_type) {
      return `${this.name} ${p1} ${p2} sin(${this.dc_offset} ${this.voltage_value} ${this.frequency} ${this.td_delay} ${this.phase_angle})`;
    } else if (VOLTAGE_SOURCE_TYPE.SQUARE == this.voltage_type) {
      const one_cycle_time = 1 / this.frequency;
      return `${this.name} ${p1} ${p2} pulse(${-this.voltage_value + this.dc_offset} ${this.voltage_value + this.dc_offset} 0 0 0 ${one_cycle_time * this.duty_cycle} ${one_cycle_time})`;
    } else if (VOLTAGE_SOURCE_TYPE.TRINGLE == this.voltage_value) {
      const one_cycle_time = 1 / this.frequency;
      return `${this.name} ${p1} ${p2} pulse(${-this.voltage_value + this.dc_offset} ${this.voltage_value + this.dc_offset} 0 ${one_cycle_time / 4} ${one_cycle_time / 4} 0 ${one_cycle_time})`;
    } else if (VOLTAGE_SOURCE_TYPE.PLUSH == this.voltage_type) {
      const one_cycle_time = 1 / this.frequency;
      return `${this.name} ${p1} ${p2} pulse(${this.dc_offset} ${this.voltage_value + this.dc_offset} 0 0 0 ${one_cycle_time * this.duty_cycle} ${one_cycle_time})`;
    }
    return null;
  }
  setNameById(id:number){
    this.name="V"+id;
  }
  isValidationError(){
    const commanValidation =this.checkCommanValidation();
    if(commanValidation){
       return commanValidation
    }
    return null
  }
}

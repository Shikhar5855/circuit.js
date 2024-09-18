//const {VOLTAGE_SOURCE_TYPE} =require("../CircuitConst")
import { VOLTAGE_SOURCE_TYPE } from '../CircuitConst';
export class Voltage {
  type;
  max_voltage;
  min_voltage: any;
  frequency;
  dc_offset;
  phase_angle;
  duty_cycle;
  name: any;
  td_delay = 0;
  constructor(type: any, max_value: any, frequency: any, dc_offset: any, phase_angle: any, duty_cycle: any) {
    this.type = parseInt(type);
    this.max_voltage = parseFloat(max_value);
    this.frequency = parseFloat(frequency);
    this.dc_offset = parseFloat(dc_offset);
    this.phase_angle = parseFloat(phase_angle);
    this.duty_cycle = parseFloat(duty_cycle);
  }

  getNetlistValue([p2, p1]: any, name: any) {
    if (VOLTAGE_SOURCE_TYPE.DC == this.type) {
      return `v${name} ${p1} ${p2} ${this.max_voltage + this.dc_offset}`;
    } else if (VOLTAGE_SOURCE_TYPE.AC == this.type) {
      return `v${name} ${p1} ${p2} sin(${this.dc_offset} ${this.max_voltage} ${this.frequency} ${this.td_delay} ${this.phase_angle})`;
    } else if (VOLTAGE_SOURCE_TYPE.SQUARE == this.type) {
      const one_cycle_time = 1 / this.frequency;
      return `v${name} ${p1} ${p2} pulse(${-this.max_voltage + this.dc_offset} ${this.max_voltage + this.dc_offset} 0 0 0 ${one_cycle_time * this.duty_cycle} ${one_cycle_time})`;
    } else if (VOLTAGE_SOURCE_TYPE.TRINGLE == this.type) {
      const one_cycle_time = 1 / this.frequency;
      return `v${name} ${p1} ${p2} pulse(${-this.max_voltage + this.dc_offset} ${this.max_voltage + this.dc_offset} 0 ${one_cycle_time / 4} ${one_cycle_time / 4} 0 ${one_cycle_time})`;
    } else if (VOLTAGE_SOURCE_TYPE.PLUSH == this.type) {
      const one_cycle_time = 1 / this.frequency;
      return `v${name} ${p1} ${p2} pulse(${this.dc_offset} ${this.max_voltage + this.dc_offset} 0 0 0 ${one_cycle_time * this.duty_cycle} ${one_cycle_time})`;
    }
    return null;
  }
}

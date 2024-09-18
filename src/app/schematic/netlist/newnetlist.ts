import { Point, Cuircuit, DeviceUtil } from './convertCuircuit';
import { circuitConnection, CircuitMapConnection, getNetlistCode, getSubCirData, getModelData } from './circuitUtil';
import {
  Voltage,
  Risitor,
  Capcitor,
  Inductor,
  Gate,
  Daiod,
  Transistor,
  Mosfet,
  ModelDependancy,
  SubCurcuitDependancy,
} from './devices';
import { DEVICE_TYPE, VOLTAGE_SOURCE_TYPE } from './CircuitConst';
import { GWT_PORT_TYPE } from '../Utils/Command';

export function getNetlistCodeData(
  circuitStr: any,
  pointNetName: any,
  deviceDetails: any,
  ioObj: any,
  cir_name: string,
) {
  const splitStr = circuitStr.split('\n');
  let arr: any = [];
  let sourceDeviceObj: any = [];
  splitStr.forEach((d: any) => {
    d = d.trim();
    if (d) {
      const circuitData = d.split(' ') || [];
      const devName = circuitData.pop();
      const devType = deviceDetails[devName]?.subType || deviceDetails[devName]?.type || null;
      switch (devType) {
        case DEVICE_TYPE.RESITOR:
          {
            const [type, x1, y1, x2, y2, , value] = circuitData;
            const p1 = new Point(x1, y1, null);
            const p2 = new Point(x2, y2, null);
            const risitor = new Risitor(value);
            const d = new Cuircuit(devName, risitor).addNode(p1).addNode(p2);
            arr.push(d);
          }
          break;
        case DEVICE_TYPE.DAIOD:
          {
            const [type, x1, y1, x2, y2, value] = circuitData;
            const p1 = new Point(x1, y1, null);
            const p2 = new Point(x2, y2, null);
            const daiod = new Daiod(value);
            const d = new Cuircuit(devName, daiod).addNode(p1).addNode(p2);
            arr.push(d);
          }
          break;
        case DEVICE_TYPE.CAPACITOR:
          {
            const [type, x1, y1, x2, y2, , value] = circuitData;
            const p1 = new Point(x1, y1, null);
            const p2 = new Point(x2, y2, null);
            const capacitor = new Capcitor(value);
            const d = new Cuircuit(devName, capacitor).addNode(p1).addNode(p2);
            arr.push(d);
          }
          break;
        case DEVICE_TYPE.INDUCTOR:
          {
            const [type, x1, y1, x2, y2, , value] = circuitData;
            const p1 = new Point(x1, y1, null);
            const p2 = new Point(x2, y2, null);
            const inductor = new Inductor(value);
            const d = new Cuircuit(devName, inductor).addNode(p1).addNode(p2);
            arr.push(d);
          }
          break;
        case DEVICE_TYPE.WIRE:
          {
            const [type, x1, y1, x2, y2] = circuitData;
            const p1 = new Point(x1, y1, null);
            const p2 = new Point(x2, y2, null);
            const d = new Cuircuit(devName, null).addNode(p1).addNode(p2);
            arr.push(d);
          }
          break;
        case DEVICE_TYPE.VOLTAGE:
          {
            const [
              type,
              x1,
              y1,
              x2,
              y2,
              ,
              voltage_source_type,
              frequancy,
              max_voltage,
              dc_offset,
              phase_angle,
              duty_cycle,
            ] = circuitData;
            const p1 = new Point(x1, y1, null);
            const p2 = new Point(x2, y2, null);
            const voltage = new Voltage(
              voltage_source_type,
              max_voltage,
              frequancy,
              dc_offset,
              phase_angle,
              duty_cycle,
            );
            const d = new Cuircuit(devName, voltage).addNode(p1).addNode(p2);
            arr.push(d);
            sourceDeviceObj.push(d);
          }
          break;
        case DEVICE_TYPE.SWITCH:
          {
            const [type, x1, y1, x2, y2] = circuitData;
            const p1 = new Point(x1, y1, 'L');
            const p2 = new Point(x2, y2, 'H');

            const d = new Cuircuit(devName, null).addNode(p1).addNode(p2);
            arr.push(d);
          }
          break;
        case DEVICE_TYPE.NOTGATE:
        case DEVICE_TYPE.ANDGATE:
        case DEVICE_TYPE.ORGATE:
        case DEVICE_TYPE.NANDGATE:
        case DEVICE_TYPE.NORGATE:
        case DEVICE_TYPE.XORGATE:
          const [type, voltage] = circuitData;
          const gate = new Gate(voltage, devName, devType);
          const d = new Cuircuit(type, gate);
          deviceDetails[devName].points.forEach((p1: any) => {
            const p = new Point(p1.x, p1.y, null);
            d.addNode(p);
          });
          arr.push(d);
          break;

        case DEVICE_TYPE.NMOS:
        case DEVICE_TYPE.PMOS:
          {
            const wp = 0,
              l = 0,
              m = 0;
            const mos = new Mosfet(null, devName, devType, wp, l, m);
            const d = new Cuircuit(devType, mos);
            deviceDetails[devName].points.forEach((p1: any) => {
              const p = new Point(p1.x, p1.y, null);
              d.addNode(p);
            });
            arr.push(d);
          }
          break;

        case DEVICE_TYPE.NPN:
        case DEVICE_TYPE.PNP:
          {
            const [type, inout, wp, l, m] = circuitData;
            const mos = new Transistor(null, devName, devType, null, null, null, null);
            const d = new Cuircuit(type, mos);
            deviceDetails[devName].points.forEach((p1: any) => {
              const p = new Point(p1.x, p1.y, null);
              d.addNode(p);
            });
            arr.push(d);
          }
          break;
      }
    }
  });

  const inputist = [];
  const outputlist = [];
  const inoutList = [];
  let isVdd = false;
  let isVss = false;
  function setPowerAndGround(netName: string, type: string) {
    for (const k in pointNetName) {
      if (pointNetName[k] == netName) {
        pointNetName[k] = type;
      }
    }
  }

  for (const key in ioObj) {
    if (GWT_PORT_TYPE.POWER == ioObj[key]) {
      setPowerAndGround(key, 'vdd');
      isVdd = true;
    } else if (GWT_PORT_TYPE.GROUND == ioObj[key]) {
      setPowerAndGround(key, 'vss');
      isVss = true;
    } else if (GWT_PORT_TYPE.IN == ioObj[key]) {
      inputist.push(key);
    } else if (GWT_PORT_TYPE.OUT == ioObj[key]) {
      outputlist.push(key);
    } else if (GWT_PORT_TYPE.IN_OUT == ioObj[key]) {
      inoutList.push(key);
    }
  }
  const commonPort = [...outputlist, ...inoutList, inputist];
  if (isVdd) {
    commonPort.push('vdd');
  }
  if (isVss) {
    commonPort.push('vss');
  }
  const pointData: any = {};
  for (const key in pointNetName) {
    pointData[key] = {
      name: pointNetName[key],
    };
  }
  const netlistCode = getNetlistCode(arr, pointData);
  const subnetlistCode = `\n.SUBCKT ${cir_name} ${commonPort.join(' ')}\n${netlistCode}\nENDS sub_cir\n`;
  const subcirStr = getSubCirData();
  const modelStr = getModelData();
  let vddStr = ``;
  let vssStr = ``;
  return `${modelStr}\n${subcirStr}\n${vddStr}\n${vssStr}\n${subnetlistCode}`;
}

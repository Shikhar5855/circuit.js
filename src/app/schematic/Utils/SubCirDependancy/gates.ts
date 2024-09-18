import { ModelDependancy } from './Dependancy';


export const GATE_SUB_CIR_NAME={
  and2:"and2",
  and3:"and3",
  or2:"or2",
  or3:"or3",
  nand2:"nand2",
  nand3:"nand3",
  nor2:"nor2",
  nor3:"nor3",
  xor2:"xor2",
  xor3:"xor3",
  not1:"not1"
}





export function nand3() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.nand3} Output Input1 Input2 Input3 Vdd Vss wp wn l m
Mp0 Output Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp1 Output Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp2 Output Input3 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mn0 Output Input1 net1 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 net1 Input2 net2 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn2 net2 Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

export function nand2() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.nand2} Output Input1 Input2 Vdd Vss wp=3u wn=3u l=3u m=1
Mp0 Output Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp1 Output Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mn0 Output Input1 net1 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 net1 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

export function and3() {
  return `
SUBCKT ${GATE_SUB_CIR_NAME.and3} Output Input1 Input2 Input3 Vdd Vss wp wn l m
Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp1 net1 Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp2 net1 Input3 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp3 Output net1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mn0 net1 Input1 net2 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 net2 Input2 net3Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn2 net3 Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn3 Output net1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

export function and2() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.and2} Output Input1 Input2 Vdd Vss wp=3u wn=3u l=3u m=1
Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp1 net1 Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp3 Output net1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mn0 net1 Input1 net2 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 net2 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn3 Output net1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

export function or2() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.or2} Output Input1 Input2 Vdd Vss wp wn l m
Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp1 net2 Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp3 Output net2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mn0 net2 Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 net2 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn3 Output net2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

export function or3() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.or3} Output Input1 Input2 Input3 Vdd Vss wp wn l m
Mp0 net1 Input1 Vdd Vdd  ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp1 net2 Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp2 net3 Input3 net2 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mp3 Output net3 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
Mn0 net3 Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 net3 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn2 net3 Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn3 Output net3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS`;
}

export function nor2() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.nor2} Output Input1 Input2 Vdd Vss wp wn l m
Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
Mp1 Output Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
Mn0 Output Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 Output Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} wn=1.24u l=0.18u m=1 
.ENDS
`;
}

export function nor3() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.nor3} Output Input1 Input2 Input3 Vdd Vss wp wn l m
Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
Mp1 net2 Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
Mp2 Output Input3 net2 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
Mn0 Output Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
Mn1 Output Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m 
Mn2 Output Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

export function xor2() {
  return ``;
}

export function xor3() {
  return ``;
}

export function not1() {
  return `
.SUBCKT ${GATE_SUB_CIR_NAME.not1} Output Input Vdd Vss wp wn l m
Mp0 Output Input Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
Mn0 Output Input Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS
`;
}

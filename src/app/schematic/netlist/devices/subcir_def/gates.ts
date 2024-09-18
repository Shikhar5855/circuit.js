import { ModelDependancy } from '../Dependancy';

export function nand3() {
  return `.SUBCKT NAND3 Output Input1 Input2 Input3 Vdd Vss wp wn l m
    Mp0 Output Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp1 Output Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp2 Output Input3 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mn0 Output Input1 net1 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 net1 Input2 net2 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn2 net2 Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS NAND2`;
}

export function nand2() {
  return `.SUBCKT NAND2 Output Input1 Input2 Vdd Vss wp=3u wn=3u l=3u m=1
    Mp0 Output Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp1 Output Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mn0 Output Input1 net1 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 net1 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS NAND2 `;
}

export function and3() {
  return `SUBCKT AND3 Output Input1 Input2 Input3 Vdd Vss wp wn l m
  Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
  Mp1 net1 Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
  Mp2 net1 Input3 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
  Mp3 Output net1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
  Mn0 net1 Input1 net2 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
  Mn1 net2 Input2 net3Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
  Mn2 net3 Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
  Mn3 Output net1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS AND3`;
}

export function and2() {
  return `.SUBCKT AND2 Output Input1 Input2 Vdd Vss wp=3u wn=3u l=3u m=1
    Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp1 net1 Input2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp3 Output net1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mn0 net1 Input1 net2 Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 net2 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn3 Output net1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS AND2`;
}

export function or2() {
  return `.SUBCKT OR2 Output Input1 Input2 Vdd Vss wp wn l m
    Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp1 net2 Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp3 Output net2 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mn0 net2 Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 net2 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn3 Output net2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS OR2`;
}

export function or3() {
  return `.SUBCKT OR3 Output Input1 Input2 Input3 Vdd Vss wp wn l m
    Mp0 net1 Input1 Vdd Vdd  ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp1 net2 Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp2 net3 Input3 net2 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mp3 Output net3 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m
    Mn0 net3 Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 net3 Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn2 net3 Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn3 Output net3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS OR3`;
}

export function nor2() {
  return `.SUBCKT NOR2 Output Input1 Input2 Vdd Vss wp wn l m
    Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
    Mp1 Output Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
    Mn0 Output Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 Output Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} wn=1.24u l=0.18u m=1 
.ENDS NOR2`;
}

export function nor3() {
  return `.SUBCKT NOR3 Output Input1 Input2 Input3 Vdd Vss wp wn l m
    Mp0 net1 Input1 Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
    Mp1 net2 Input2 net1 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
    Mp2 Output Input3 net2 Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
    Mn0 Output Input1 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    Mn1 Output Input2 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m 
    Mn2 Output Input3 Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
.ENDS NOR3`;
}

export function xor2() {
  return ``;
}

export function xor3() {
  return ``;
}

export function not1() {
  return `.SUBCKT NOT1 Output Input Vdd Vss wp wn l m
    Mp0 Output Input Vdd Vdd ${ModelDependancy.PMOS_MODEL_NAME} w=wp l=l m=m 
    Mn0 Output Input Vss Vss ${ModelDependancy.NMOS_MODEL_NAME} w=wn l=l m=m
    .ENDS NOT1`;
}

import { CircuitDepency, ModelDependancy } from "./Dependancy";
import {and2,and3,or2,or3,nor2,nor3,nand2,nand3,xor2,xor3,not1} from "./gates"
export function getSubCirData(subCurcuit:CircuitDepency) {
    let str = '';
    if (subCurcuit.sub_cir.and2) {
      str += '\n' + and2();
    }
    if (subCurcuit.sub_cir.and3) {
      str += '\n' + and3();
    }
    if (subCurcuit.sub_cir.or2) {
      str += '\n' + or2();
    }
    if (subCurcuit.sub_cir.or3) {
      str += '\n' + or3();
    }
    if (subCurcuit.sub_cir.nand2) {
      str += '\n' + nand2();
    }
    if (subCurcuit.sub_cir.nand3) {
      str += '\n' + nand3();
    }
    if (subCurcuit.sub_cir.nor2) {
      str += '\n' + nor2();
    }
    if (subCurcuit.sub_cir.nor3) {
      str += '\n' + nor3();
    }
    if (subCurcuit.sub_cir.notG) {
      str += '\n' + not1();
    }
    if (subCurcuit.sub_cir.xor2) {
      str += '\n' + xor2();
    }
    if (subCurcuit.sub_cir.xor3) {
      str += '\n' + xor3();
    }
    return str;
  }
  
  export function getModelData(subCurcuit:CircuitDepency) {
    let str = '';
    if (subCurcuit.model.NMOS) {
      str += '\n.model ' + ModelDependancy.NMOS_MODEL_NAME + ' NMOS LEVEL=6 ';
    }
    if (subCurcuit.model.PMOS) {
      str += '\n.model ' + ModelDependancy.PMOS_MODEL_NAME + ' PMOS LEVEL=6 ';
    }
    if (subCurcuit.model.NPN) {
      str += '\n.model ' + ModelDependancy.NPN_MODEL_NAME + ' NPN LEVEL=6 ';
    }
    if (subCurcuit.model.PNP) {
      str += '\n.model ' + ModelDependancy.PNP_MODEL_NAME + ' PNP LEVEL=6 ';
    }
    if (subCurcuit.model.Daiod) {
      str += '\n.model ' + ModelDependancy.DAIOD_MODEL_NAME + ' D ( bv =50 is =1 e -13 n =1.05)';
    }
  
    return str;
  }
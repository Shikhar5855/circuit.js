export class CircuitDepency{
  sub_cir={
    nand2:false,
    nand3:false,
    and2:false,
    and3:false,
    or2:false,
    or3:false,
    nor2:false,
    nor3:false,
    xor2:false,
    xor3:false,
    notG:false
  }
 model={
  NMOS:false,
  PMOS:false,
  NPN:false,
  PNP:false,
  Daiod:false
 }
 VDD=false
 VSS=false
}


// export class SubCurcuitDependancy {
   
//    NMOS = false;
//    PMOS = false;
//    NPN = false;
//    PNP = false;
//    Daiod = false;
//    VDD = false;
//    VSS = false;
// //  setGate(name: any, status: any) {
// //     let that: any = this;
// //     that[name] = status;
// //   }
// }

export class ModelDependancy {
  static NMOS_MODEL_NAME = 'nmos_globel';
  static PMOS_MODEL_NAME = 'pmos_globel';
  static NPN_MODEL_NAME = 'npn_globel';
  static PNP_MODEL_NAME = 'pnp_globel';
  static DAIOD_MODEL_NAME = 'daiod_globel';
  static VDD_NODE = 'vdd';
  static VSS_NODE = 'vss';
  static VDDI_NODE="vddi";
  static VSSI_NODE="vssi";
}

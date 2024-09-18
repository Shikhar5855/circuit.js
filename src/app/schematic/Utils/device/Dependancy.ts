export class SubCurcuitDependancy {
  static nand2 = false;
  static nand3 = false;
  static and2 = false;
  static and3 = false;
  static or2 = false;
  static or3 = false;
  static nor2 = false;
  static nor3 = false;
  static xor2 = false;
  static xor3 = false;
  static notG = false;

  static setGate(name: any, status: any) {
    let that: any = this;
    that[name] = status;
  }
}

export class ModelDependancy {
  static NMOS_MODEL_NAME = 'nmos_globel';
  static PMOS_MODEL_NAME = 'pmos_globel';
  static NPN_MODEL_NAME = 'npn_globel';
  static PNP_MODEL_NAME = 'pnp_globel';
  static DAIOD_MODEL_NAME = 'daiod_globel';
  static VDD_NODE = 'vdd';
  static VSS_NODE = 'vss';

  static NMOS = false;
  static PMOS = false;
  static NPN = false;
  static PNP = false;
  static Daiod = false;
  static VDD = false;
  static VSS = false;
}

import { EVENT_NAME, EventListner } from './EventListner';

export class Command {
  name: string;
  value: string;
  isSelected: boolean = false;
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
  select() {
    this.isSelected = true;
  }

  deSelect() {
    this.isSelected = false;
  }

  isEqual(cmd: Command) {
    return cmd.name == this.name && cmd.value == this.value;
  }
}

export const GWT_COMMAND: any = {
  RESISTOR: new Command('main', 'ResistorElm'),
  CAPACITOR: new Command('main', 'CapacitorElm'),
  INDUCTOR: new Command('main', 'InductorElm'),
  DC_VOLTAGE: new Command('main', 'DCVoltageElm'),
  AC_VOLTAGE: new Command('main', 'CustomCompositeElm:t2343'),
  GND_VOLTAGE: new Command('main', 'GroundElm'),
  WIRE: new Command('main', 'WireElm'),
  SELECT: new Command('main', 'Select'),
  NPN: new Command('main', 'NTransistorElm'),
  PNP: new Command('main', 'PTransistorElm'),
  NMOS: new Command('main', 'NMosfetElm'),
  PMOS: new Command('main', 'PMosfetElm'),
  DAIOD: new Command('main', 'DiodeElm'),
  INVERTER: new Command('main', 'InverterElm'),
  OR_GATE: new Command('main', 'OrGateElm'),
  AND_GATE: new Command('main', 'AndGateElm'),
  NOR_GATE: new Command('main', 'NorGateElm'),
  NAND_GATE: new Command('main', 'NandGateElm'),
  XOR_GATE: new Command('main', 'XorGateElm'),
  XNOR_GATE: new Command('main', ''),
  CLOCK: new Command('main', 'CustomCompositeElm:t34476'),
  ClEAR: new Command('file', 'newblankcircuit'),
  IO_PORT: new Command('main', 'LabeledNodeElm'),
};

export const GWT_PORT_TYPE = {
  IN: 'I',
  OUT: 'O',
  IN_OUT: 'IO',
  POWER: 'VDD',
  GROUND: 'VSS',
  VDDI:"VDDI",
  VSSI:"VSSI",
  NET: 'NET',
};

export function selectItem(cmd: Command) {
  for (const i in GWT_COMMAND) {
    if (GWT_COMMAND[i].isEqual(cmd)) {
      GWT_COMMAND[i].select();
    } else {
      GWT_COMMAND[i].deSelect();
    }
  }
  EventListner.emit(EVENT_NAME.SELECTION_CHANGE, {});
}

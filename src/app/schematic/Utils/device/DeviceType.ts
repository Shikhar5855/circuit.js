export type RISITOR={
    resistor_value:number 
}
export type CAPACITOR={
    capacitor_value:number,
    capacitor_init_voltage:number
}
export type INDUCTOR={
    inductor_value: number,
    inductor_init_voltage: number,
}
export type VOLTAGE={
    voltage_max: number,
    voltage_offset: number,
    voltage_frequency: number,
    voltage_phase_offset: number,
    voltage_duty_cycle: number,
    voltage_wave_type: number,
}
// WIRE:{},
// DAIODE:{},
// NOTGATE:{

// },
export type IO_PORT={
    device_type:string,
    label_name:string
}
export type SUB_CIR={
    model_name:string
}
export type GATE={
    no_of_input: number,
    high_logic_voltage: number,
    transistor_width_n: number,
    transistor_width_p: number,
    transistor_length: number,
    transistor_multiplier: number,
}
export type TRANSITOR={
    transistor_beta: number,
}
export type MOSFET={
    mosfet_threshold_voltage: number,
    mosfet_beta: number,
    transistor_width: number,
    transistor_length: number,
    transistor_multiplier: number,
}


export const PORT_NAME={
     net1:"net1",
     net2:"net2",
     net3:"net3",
     netB:"netB",
     netC:"netC",
     netD:"netD",
     netE:"netE",
     netG:"netG",
     netS:"netS"

}

export type PORT_DETAIL={ 
    portName: string, 
    x: string, 
    y: string, 
    netType:string
}
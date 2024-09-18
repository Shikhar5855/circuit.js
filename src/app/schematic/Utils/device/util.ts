import { Risitor } from "./Risitor";
import { DeviceComponent } from "./index";
import { Capcitor } from "./Capacitor";
import { Inductor } from "./Inductor";
import { Voltage } from "./Voltage";
import { Wire } from "./Wire";
import { Gate } from "./Gate";
import { Daiod } from "./Daiod";
import { IO } from "./IO";
import { SubCir } from "./SubCir";
import { Mosfet } from "./Mosfet";
import { Transistor } from "./Transistor";
import {RISITOR,CAPACITOR,INDUCTOR,IO_PORT,TRANSITOR,MOSFET,GATE,VOLTAGE,SUB_CIR, PORT_NAME} from "./DeviceType"
import { DEVICE_TYPE } from "./DeviceConst";
import { Circuit } from "./Circuit";
import { DeviceInfo } from "../DeviceDetails";
declare var CircuitJS1:any;

export function getDeviceToCircuitObj(){
    let deviceArray:any=getAllDevice();
    const cirDetail:DeviceComponent=new DeviceComponent();
    if(DeviceInfo.id){
        cirDetail.cell_name=DeviceInfo.cell_name;
        cirDetail.id=DeviceInfo.id;
    }
    deviceArray.forEach((d:any)=>{
        const obj=d.basic_info?.reduce((acc:any,b:any)=>{
                            acc[b.key]=b.value;
                            return acc;
                    },{}) || {}
        const id=parseInt(d.id+"");
        const name=d.name;
        const x=d.x,y=d.y,x2=d.x2,y2=d.y2;
        const dType=d.type.toUpperCase()

        if(dType=="R"){
         let deviceObj:RISITOR=obj;    
         const new_dev:Risitor=new Risitor(id,x,y,x2,y2,deviceObj.resistor_value)
         new_dev.setName(name);
         new_dev.setPortList(d.property_info)
         new_dev.setSelected(d.is_selected)
        // new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
         cirDetail.device.push(new_dev)
        }
        else if(dType=="C"){
            let deviceObj:CAPACITOR=obj;    
            const new_dev:Capcitor=new Capcitor(id,x,y,x2,y2,deviceObj.capacitor_value,deviceObj.capacitor_init_voltage)
            new_dev.setName(name);
            //new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            cirDetail.device.push(new_dev)
        }
        else if(dType=="I"){
            let deviceObj:INDUCTOR=obj;    
            const new_dev:Inductor=new Inductor(id,x,y,x2,y2,deviceObj.inductor_value,deviceObj.inductor_init_voltage);
            new_dev.setName(name); 
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
           // new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
            cirDetail.device.push(new_dev)
        }
        else if(dType=="V"){
            let deviceObj:VOLTAGE=obj;    
            const new_dev:Voltage=new Voltage(id,x,y,x2,y2,deviceObj.voltage_wave_type,
                deviceObj.voltage_frequency,deviceObj.voltage_offset,deviceObj.voltage_phase_offset,
                deviceObj.voltage_duty_cycle,deviceObj.voltage_max);
            new_dev.setName(name); 
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            //new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
            cirDetail.device.push(new_dev)
        }
        else if(dType=="W"){
            const new_dev:Wire=new Wire(id,x,y,x2,y2);
            new_dev.setName(name);
            new_dev.setPortList(d.property_info) 
            new_dev.setSelected(d.is_selected)
            //new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
            cirDetail.device.push(new_dev)
        }
        else if(dType=="D"){
            const new_dev:Daiod=new Daiod(id,x,y,x2,y2);
            new_dev.setName(name); 
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected) 
            //new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
            cirDetail.device.push(new_dev)  
        }
        else if(dType=="N" || dType=="G"){
            let gateTYpe:DEVICE_TYPE=DEVICE_TYPE.NONE;
            if(dType=="N"){
                gateTYpe=DEVICE_TYPE.NOTGATE;
            }
            else if(dType=="G"){
                switch(d.sub_type.toUpperCase()){
                    case DEVICE_TYPE.ANDGATE:
                        gateTYpe=DEVICE_TYPE.ANDGATE;
                    break;
                    case DEVICE_TYPE.ORGATE:
                        gateTYpe=DEVICE_TYPE.ORGATE;
                    break;
                    case DEVICE_TYPE.NANDGATE:
                        gateTYpe=DEVICE_TYPE.NANDGATE;
                    break;
                    case DEVICE_TYPE.NORGATE:
                        gateTYpe=DEVICE_TYPE.NORGATE;
                    break
                    case DEVICE_TYPE.XORGATE:
                        gateTYpe=DEVICE_TYPE.XORGATE;
                    break;
                }
            }
            let deviceObj:GATE=obj;
            const new_dev:Gate=new Gate(id,x,y,x2,y2,deviceObj.no_of_input,-1,gateTYpe);
            new_dev.setName(name);
            new_dev.setProperty(deviceObj.transistor_width_n,deviceObj.transistor_width_p,deviceObj.transistor_length,deviceObj.transistor_multiplier);
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            new_dev.setPower(d.power,d.ground);
            //new_dev.setNetName(netobj[PORT_NAME.net1],netobj[PORT_NAME.net2]);
            //new_dev.setNet3Name(netobj[PORT_NAME.net3]);    
            cirDetail.device.push(new_dev)
        }
        else if(dType=="P"){
            let deviceObj:IO_PORT=obj;
            const new_dev:IO=new IO(id,x,y,x2,y2,deviceObj.device_type,deviceObj.label_name);
            new_dev.setName(name); 
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            //new_dev.setNetName(netobj[PORT_NAME.net1],"");
            cirDetail.device.push(new_dev)
        }
        else if(dType=="S"){
            let deviceObj:SUB_CIR=obj;
            const new_dev:SubCir=new SubCir(id,x,y,x2,y2,deviceObj.model_name);
            new_dev.setName(name); 
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            //new_dev.setNetProperty(netobj);
            //new_dev.setNetNames();
            cirDetail.device.push(new_dev)
        }
        else if(dType=="XT"){
            let deviceObj:TRANSITOR=obj;
            let isNpn:boolean=false;
            if(d.sub_type.toUpperCase()=="NPN"){
                isNpn=true;
            }
            const new_dev:Transistor=new Transistor(id,x,y,x2,y2,isNpn);
            new_dev.setName(name);     
            //new_dev.setNetProperty(netobj[PORT_NAME.netB],netobj[PORT_NAME.netC],netobj[PORT_NAME.netE])
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            cirDetail.device.push(new_dev)
        }
        else if(dType=="XM"){
            let deviceObj:MOSFET=obj;
            let isNmos:boolean=false;
            if(d.sub_type.toUpperCase()=="NMOS"){
                isNmos=true;
            }
            const new_dev:Mosfet=new Mosfet(id,x,y,x2,y2,deviceObj.mosfet_threshold_voltage,isNmos);
            new_dev.setName(name);  
            new_dev.setProperty(deviceObj.transistor_width,deviceObj.transistor_length,deviceObj.transistor_multiplier);
            new_dev.setPortList(d.property_info)
            new_dev.setSelected(d.is_selected)
            //new_dev.setNetProperty(netobj[PORT_NAME.netS],netobj[PORT_NAME.netD],netobj[PORT_NAME.netG],netobj[PORT_NAME.netB]);
            cirDetail.device.push(new_dev)
        }
    })
    return cirDetail;   
}


export function getAllDevice(){
   return JSON.parse(CircuitJS1.getAllDevice());
}

export function cloneDevice(device:any){
    const dc=new DeviceComponent();
    dc.device.push(device);
    const [cdc]:DeviceComponent[]=convertIntoClone([dc]);
    const [newDiv]=cdc.device;
    return newDiv;
}

export function convertIntoClone(items:Array<DeviceComponent>){
     const newItem:Array<DeviceComponent>=items.map((item:DeviceComponent)=>{
        const dc=new DeviceComponent();
        dc.cell_name=item.cell_name;
        dc.id=item.id;
        dc.device=item.device.map((device:any)=>{
            //let cir:Circuit
            const s:Circuit=device;
            switch(s.type){
                case DEVICE_TYPE.ANDGATE:
                case DEVICE_TYPE.ORGATE:
                case DEVICE_TYPE.NANDGATE:
                case DEVICE_TYPE.NORGATE:
                case DEVICE_TYPE.XORGATE:
                case DEVICE_TYPE.NOTGATE:{
                    let s1:Gate=device;
                    const cir=new Gate(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.no_of_input,-1,s.type)
                    cir.setName(s.name || "")
                    cir.setProperty(s1.width_n,s1.width_p,s1.length,s1.multiplier);
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    cir.setPower(s1.power,s1.ground);
                    // cir.setNetName(device.net1_name,device.net2_name);
                    // cir.setNet3Name(device.net3_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.NMOS:
                case DEVICE_TYPE.PMOS:{
                    let s1:Mosfet=device;
                    const cir=new Mosfet(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.threshold_voltage,s1.type===DEVICE_TYPE.NMOS)
                    cir.setName(s.name || "")
                    cir.setProperty(s1.width,s1.length,s1.multiplier);
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetProperty(s1.netS_name,s1.netD_name,s1.netG_name,s1.netB_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.NPN:
                case DEVICE_TYPE.PNP:{
                    let s1:Transistor=device;
                    const cir=new Transistor(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.type===DEVICE_TYPE.NPN)
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                   // cir.setNetProperty(s1.netB_name,s1.netC_name,s1.netE_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.RESITOR:{
                    let s1:Risitor=device;
                    const cir=new Risitor(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.value);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.CAPACITOR:{
                    let s1:Capcitor=device;
                    const cir=new Capcitor(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.value,s1.init_voltage);
                    cir.setName(s.name || "")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    return cir;
                }
                break;
                case DEVICE_TYPE.INDUCTOR:{
                    let s1:Inductor=device;
                    const cir=new Inductor(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.value,s1.init_current);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    return cir;
                }
                break;

                case DEVICE_TYPE.WIRE:{
                    let s1:Wire=device;
                    const cir=new Wire(s1.id,s1.x,s1.y,s1.x1,s1.y1);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.INPUT_OUTPUT:{
                    let s1:IO=device;
                    const cir=new IO(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.ioType,s1.label_name);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.VOLTAGE:{
                    let s1:Voltage=device;
                    const cir=new Voltage(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.voltage_type,s1.frequency,s1.dc_offset,s1.phase_angle,s1.duty_cycle,s1.voltage_value);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.DAIOD:{
                    let s1:Daiod=device;
                    const cir=new Daiod(s1.id,s1.x,s1.y,s1.x1,s1.y1);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.setNetName(device.net1_name,device.net2_name);
                    return cir;
                }
                break;
                case DEVICE_TYPE.SUB_CIRCUIT:{
                    let s1:SubCir=device;
                    const cir=new SubCir(s1.id,s1.x,s1.y,s1.x1,s1.y1,s1.cell_name);
                    cir.setName(s.name || "")
                    cir.setPortList(s1.port_list)
                    cir.setSelected(s1.is_selected+"")
                    //cir.net_list=s1.net_list;
                    return cir;
                }
                break;
            }
            return device;
        })
        return dc
     });
     return newItem;
}
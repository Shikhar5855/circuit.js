import { Circuit } from './Circuit';
import { DEVICE_TYPE } from './DeviceConst';
import { IO } from './IO';
import { getAllDevice } from './util';
declare var CircuitJS1:any;
export class DeviceComponent{
    id:string="";
    cell_name:string="";
    device:Array<Circuit | any>=[];
    // is_instance:boolean=false;
    // model_name:string="";
    getDeviceIdByName(){
        const deviceDetails= getAllDevice();
        if(deviceDetails.length>0){
            return deviceDetails.reduce((acc:any,d:any)=>{
                acc[d.name]= parseInt(d.id+"");
            },{})
        }
        return null;
    }
    getCircuitString(){
        const cir_str_list=this.device.map((d:any)=>d.toCircuitString());
        const strCir=cir_str_list.join("\n");
        return strCir;
    }
    getSubCircuitString():string{
             const ioDevices:any=this.device.filter((d:Circuit)=>d.type==DEVICE_TYPE.INPUT_OUTPUT)
             const out_device=ioDevices.filter((d:IO)=>d.ioType==="O");
             const inp_device=ioDevices.filter((d:IO)=>d.ioType!=="O");
             const maximum_height=Math.max(inp_device.length,out_device.length);
             let count=1;
             const inp_ports=inp_device.map((d:IO,i:number)=>{
                                return `${d.label_name} ${count++} ${i} 2`
                            })
             const out_ports=out_device.map((d:IO,i:number)=>{
                                return `${d.label_name} ${count++} ${i} 3`
                            })
             const totalCount=ioDevices.length;
             const reg_con=[];
             const reg_val=[];
             for(let i=1;i<totalCount;i++){
                reg_con.push(`ResistorElm\\s${i}\\s${i+1}`)
                reg_val.push(`0\\\\s1000`)
             }
             return `. ${this.cell_name} 0 3 ${maximum_height} ${totalCount} ${inp_ports.join(" ")} ${out_ports.join(" ")} ${reg_con.join("\\r")} ${reg_val.join("\\s")}`
    }
    render(){
        const cir_str_list=this.device.map((d:any)=>d.toCircuitString());
        const strCir=cir_str_list.join("\n");
        const devicebyName=this.getDeviceIdByName();
        if(devicebyName){
             this.device.forEach((d:any)=>{
                d.update(devicebyName[d.name])
             })
        }
        else{
            alert("Somthing got error!")
        }
    }
    isValidationError(){
        let status=false;
        for(let i=0;i<this.device.length;i++){
           if(this.device[i].isValidationError()){
            status=true;
           }  
        }
        return status;
    }
}

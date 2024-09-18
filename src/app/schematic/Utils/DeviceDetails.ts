import { DeviceComponent } from "./device"
import { Circuit } from "./device/Circuit"

export class DeviceInfo{
    static id:string=""
    static cell_name:string=""
    static devices:Array<Circuit>=[];
}

export const DEVICE_CURD_OPREATION={
   circuit_data:"circuit_data",
   sub_circuit_prefix:"subcircuit:"
}

const replacerFunc =  (key:string, value:any) => {
      if (key=="window") {
        console.log("Window in json")
       return null;
      }
      return value;
    };

export class DeviceCurd{
    static addItem(item:DeviceComponent){
      const items_str:any=localStorage.getItem(DEVICE_CURD_OPREATION.circuit_data) || '[]';
      const items:Array<DeviceComponent>=JSON.parse(items_str);
      items.push(item);
      const rev_item_str:any=JSON.stringify(items,replacerFunc);
      localStorage.setItem(DEVICE_CURD_OPREATION.circuit_data,rev_item_str);
    }
    static setItem(items:Array<DeviceComponent>){
        const rev_item_str:any=JSON.stringify(items,replacerFunc);
        localStorage.setItem(DEVICE_CURD_OPREATION.circuit_data,rev_item_str);
    }
    static updateItem(item:DeviceComponent){
        const items_str:any=localStorage.getItem(DEVICE_CURD_OPREATION.circuit_data);
        let items:Array<DeviceComponent>=JSON.parse(items_str);
        items=items.map((itm:DeviceComponent)=>{
            if(itm.id==item.id){
                return item
            }
            return itm;
        })
        const rev_item_str:any=JSON.stringify(items,replacerFunc);
        localStorage.setItem(DEVICE_CURD_OPREATION.circuit_data,rev_item_str);
    }
    static removeItem(item:DeviceComponent){
        const items_str:any=localStorage.getItem(DEVICE_CURD_OPREATION.circuit_data);
        let items:Array<DeviceComponent>=JSON.parse(items_str);
        items=items.filter((itm:DeviceComponent)=>item.id!==itm.id)
        const rev_item_str:any=JSON.stringify(items,replacerFunc);
        localStorage.setItem(DEVICE_CURD_OPREATION.circuit_data,rev_item_str);
    }
    static removeAllItem(){
        localStorage.setItem(DEVICE_CURD_OPREATION.circuit_data,"[]");
    }

    static getItems(){
        const items_str:any=localStorage.getItem(DEVICE_CURD_OPREATION.circuit_data);
        let items:Array<DeviceComponent>=JSON.parse(items_str);
        return items || [];
    }

    static addCircuitData(){
      let subCirList=[];
      for(const key in localStorage){
        if(key.toLowerCase().search(DEVICE_CURD_OPREATION.sub_circuit_prefix)>=0){
           subCirList.push(key);
        }
      }
      subCirList.forEach((key)=>{
        localStorage.removeItem(key);
      })
      const items=this.getItems();
      // const sub_cir_items:Array<DeviceComponent>=items.filter((d:DeviceComponent)=>d.is_instance);
      items.forEach((d:DeviceComponent)=>{
        localStorage.setItem(DEVICE_CURD_OPREATION.sub_circuit_prefix+d.cell_name,d.getSubCircuitString())
      })
    }
    static setSubCircuitData(items:Array<DeviceComponent>){
        let subCirList=[];
        for(const key in localStorage){
          if(key.toLowerCase().search(DEVICE_CURD_OPREATION.sub_circuit_prefix)>=0){
             subCirList.push(key);
          }
        }
        subCirList.forEach((key)=>{
          localStorage.removeItem(key);
        })
        
        items.forEach((d:DeviceComponent)=>{
          localStorage.setItem(DEVICE_CURD_OPREATION.sub_circuit_prefix+d.cell_name,d.getSubCircuitString())
        })
      }
}
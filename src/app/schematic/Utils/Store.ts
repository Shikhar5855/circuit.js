import { DeviceComponent } from "./device";
import { getAllDevice } from "./device/util";

export class Store{
    static allDevice:Array<DeviceComponent>=[];
    static subCirList:Array<any>=[];
    static getDeviceComponentByCellName(cell_name:any){
        return this.allDevice.find((d)=>d.cell_name==cell_name);
    }
}
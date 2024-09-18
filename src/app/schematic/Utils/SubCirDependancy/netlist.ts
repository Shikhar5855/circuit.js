import { DeviceComponent } from "../device";
import { CircuitDepency } from "./Dependancy";
import { getModelData, getSubCirData } from "./Model_Cir_Data";


function updateDepenacy(obj1:any,obj2:any){
    const {sub_cir,model,VDD,VSS}=obj2;
    for(const key in sub_cir){
        if(obj2.sub_cir[key]){
            obj1.sub_cir[key]=true;
        }
    }

    for(const key in model){
        if(obj2.model[key]){
            obj1.model[key]=true;
        }
    }
    if(VDD){
        obj1.VDD=true;
    }
    if(VSS){
        obj1.VSS=true;
    }
    return obj1
}


function getModelArray(sub_cir_dep:CircuitDepency){
    const model_dep:any=[]
    const subcir_dep:any=[];
    if(sub_cir_dep.model.Daiod){
      model_dep.push("");
    }
    if(sub_cir_dep.model.NMOS){
        
    }
    if(sub_cir_dep.model.PMOS){
        
    }
    if(sub_cir_dep.model.NPN){
        
    }
    if(sub_cir_dep.model.PNP){
        
    }
}
export function convertIntoNetlist(divComp:any,devList:Array<any>){
     const p_data=divComp.data;
     const p_cells=divComp.cell_list;
     let p_sub_cir_dep=divComp.subCirDep;
     const netList:any=[p_data];
     while(p_cells.length>0){
        const cell_name=p_cells.pop();
        const selectDiv=devList.find((d)=>d.name==cell_name);
        if(selectDiv){
            const {cell_list,data,subCirDep,name}=selectDiv;
            p_sub_cir_dep=updateDepenacy(p_sub_cir_dep,subCirDep);
            netList.unshift(data)
            cell_list.forEach((d:string)=>{
                p_cells.push(d);
            })
        }
     }
   const modelData=getModelData(p_sub_cir_dep);
   const predefine_sub_cir_data=getSubCirData(p_sub_cir_dep);
   
   return `${[modelData,predefine_sub_cir_data,netList.join("\n")].filter((d)=>d).join("\n\n")}`
     
}
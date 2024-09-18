import { EVENT_NAME, EventListner } from "./EventListner";
import { DeviceComponent } from "./device";
import { Circuit, CircuitConst } from "./device/Circuit";
import { DEVICE_TYPE } from "./device/DeviceConst";
import { cloneDevice, getAllDevice, getDeviceToCircuitObj } from "./device/util";

declare var CircuitJS1: any;
declare var onCanvasMouseRelease:any;
declare var ongwtEvent:any;
export const UNDO_REDO_OPREATION={
    ADD:"add",
    DELETE:"delete",
    MOVE:"move",
    ROTATION_CLOCKWISE:"rotation_clockwise",
    ROTATION_ANTI_CLOCKWISE:"rotation_anti_clockwise"
}
export class UndoRedo{
   static undo:any=[];
   static redo:any=[];
   static copyCutData:any={
    isCopy:null,
    data:[],
    undoIndex:-1,
   }
  static resetCopyCutData(){
    this.copyCutData={
      isCopy:null,
      data:[],
      undoIndex:-1,
     }
  } 
  static addHistry(id:any){
      onCanvasMouseRelease(null);
    const deviceCir:DeviceComponent= getDeviceToCircuitObj()
    let cirList:any=[];
    if(id){
      const divData=deviceCir.device.find((d)=>d.id==id)
      if(divData){
          cirList.push(divData);
      } 
    }
    else{
      cirList= deviceCir.device.filter((d)=>d.is_selected);
    }
    if(cirList.length>0){
      this.undo.push({data:cirList,isDeleted:false})
      this.redo=[]
    }
    // if(!id)
    //  cirList= deviceCir.device.filter((d)=>d.is_selected);
    // if(cirList.length<=0){
    //     this.undo.push({data:cirList,isDeleted:false})
    // }
    // else{
      // const divData=deviceCir.device.find((d)=>d.id==id)
      // if(divData){
      //     cirList.push(divData);
      // }
    // }
    //console.log("undo==>",this.undo)
    CircuitJS1.resetAction();
   }
  static deleteOpreation(id:number){
    const deviceCir:DeviceComponent= getDeviceToCircuitObj()
    const cirList:any=deviceCir.device.filter((d)=>d.is_selected);
    if(cirList.length<=0){
        const divData=deviceCir.device.find((d)=>d.id==id)
        if(divData){
            cirList.push(divData);
        }
    }
    if(cirList.length>0){
        this.undo.push({data:cirList,isDeleted:true})
        cirList.forEach((d:any)=>{
          CircuitJS1.deleteEle(d.id);
        })
        this.redo=[]
    }
    //console.log("undo==>",this.undo)
   }
   static doUndo(redoRequired=true){
    if(this.undo.length<=0){
        return ;
    }
      let {isDeleted,data}=this.undo.pop();
      const cirObj:any={}
      const isDeletedObj:any={}
     // this.resetCopyCutData();
      this.undo.forEach((cirL:any)=>{
        cirL.data.forEach((d:any)=>{
            d["isDeleted"]=cirL.isDeleted;
            if(!cirObj[d.id]){
                cirObj[d.id]=[];
            }
            cirObj[d.id].push(d); 
            //isDeletedObj[d.id]=cirL.isDeleted;
        })
      })
        if(isDeleted){
         data.forEach((d:any)=>{
            CircuitJS1.addUndoEle();;
            //cirData.push(cirObj[d.id]);
         })
        }
        else{
            data.forEach((d:any)=>{
               if(cirObj[d.id] && cirObj[d.id].length>0){
                   const latestPos:any=cirObj[d.id].pop();
                     latestPos.setPostion();
                     latestPos.update(d.id); 
                     if(latestPos.isDeleted){
                      CircuitJS1.deleteEleWithoutUndo(d.id);
                    }
                    EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{});
               }
               else{
                 CircuitJS1.deleteEle(d.id);
                 EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{});
                 //isDeleted=true;
               }
             }) 
        }
        if(redoRequired){
        this.redo.push({isDeleted,data})
        }
        setTimeout(()=>{
          onCanvasMouseRelease();
        },100)

   }
   static doRndo(){
    if(this.redo.length<=0){
      return ;
    }
    let {isDeleted,data}=this.redo.pop();
    const cirObj:any={}
    //this.resetCopyCutData();
    this.undo.forEach((cirL:any)=>{
      cirL.data.forEach((d:any)=>{
          if(!cirObj[d.id]){
              cirObj[d.id]=[];
          }
          cirObj[d.id].push(d); 
      })
    })
      if(isDeleted){
       data.forEach((d:any)=>{
          CircuitJS1.deleteEle(d.id);
          EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{});
       })
      }
      else{
        data.forEach((d:any)=>{
          if(cirObj[d.id] && cirObj[d.id].length>0){
              // const latestPos:any=cirObj[d.id].pop();
              //   latestPos.setPostion();
              //   latestPos.update(d.id);
                // EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{});
          }
          else{
            CircuitJS1.addUndoEle(d.id);
            //isDeleted=true;
          }
        }) 
          data.forEach((d:any)=>{
             d.setPostion();
             d.update(d.id);
             EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{});
             //latestPos.update(d.id); 
           }) 
      }
      this.undo.push({isDeleted,data})
      setTimeout(()=>{
        onCanvasMouseRelease();
      },100)
 }
 static rotateAllEle(id:any,isclockWise:boolean){
  const deviceCir:DeviceComponent= getDeviceToCircuitObj()
    let cirList:any=[];
    if(!id)
     cirList= deviceCir.device.filter((d)=>d.is_selected);
    if(cirList.length<=0){
        const divData=deviceCir.device.find((d)=>d.id==id)
        if(divData){
            cirList.push(divData);
        }
    }
    if(cirList.length>0){
        cirList.forEach((d:any)=>{
          if(d.type!=DEVICE_TYPE.SUB_CIRCUIT){
            CircuitJS1.rotateEleById(d.id,isclockWise?0:1)
          }
        
        })
        this.addHistry(null);
    }
 }
 static copyOrCut(id:any,isCopy:boolean){
  const deviceCir:DeviceComponent= getDeviceToCircuitObj()
  let cirList:any=[];
  if(!id)
   cirList= deviceCir.device.filter((d)=>d.is_selected);
  if(cirList.length<=0){
      const divData=deviceCir.device.find((d)=>d.id==id)
      if(divData){
          cirList.push(divData);
      }
  }
  this.copyCutData.data=cirList;
  this.copyCutData.isCopy=isCopy;
  if(isCopy){
    this.copyCutData.undoIndex=-1;
  }
  else{
    this.deleteOpreation(-1);
    this.copyCutData.undoIndex=this.undo.length-1;
  }
  console.log("copycutdata==>",this.copyCutData)
 }
 static getMidPointOfSelectedCir(cirList:Array<Circuit>){
    let x:any=null,y:any=null,x1:any=null,y1:any=null;
    cirList.forEach((d:Circuit)=>{
      d.x=parseInt(d.x+"");
      d.y=parseInt(d.y+"");
      d.x1=parseInt(d.x1+"");
      d.y1=parseInt(d.y1+"");
      if(x==null || x<d.x ){
        x=d.x
      }
      if(y==null || y<d.y ){
        y=d.y
      }
      if(x1==null || x1<d.x1 ){
        x=d.x1
      }
      if(y1==null || y1<d.y1 ){
        y=d.y1
      }


      if(x==null || x>d.x ){
        x1=d.x
      }
      if(y==null || y>d.y ){
        y1=d.y
      }
      if(x1==null || x1>d.x1 ){
        x1=d.x1
      }
      if(y1==null || y1>d.y1 ){
        y1=d.y1
      }
    })
    const midX=Math.ceil((x+x1)/2);
    const midY=Math.ceil((y+y1)/2);
    return {midX,midY}
 }
 static convertAxix(n:any){
  const num=parseInt(n+"");
  const rem=num%16;
  console.log("num==>",num,rem)
  return num+16-rem;
 }
 static pasteEle(){
  if(this.copyCutData.data.length>0 && CircuitConst?.last_mouse_down_pos?.x){
     if(this.copyCutData.isCopy){
        let deviceCount=CircuitJS1.getDeviceCount();
        if(deviceCount>0){
          const cloneCir=this.copyCutData.data.map((d:any)=>{
            d.setNameById(deviceCount);
            d.id=deviceCount;
            deviceCount++;
              return cloneDevice(d);
          })
         const cirStr= cloneCir.map((d:any)=>{
           // console.log("copy cir==>",d.toCircuitString())
           return d.toCircuitString();
          }).join("\n");
          localStorage.setItem("circuitClipboard",cirStr);
          const {x,y}=CircuitConst.last_mouse_down_pos;
          CircuitJS1.setMouseCursor(x,y)
          CircuitJS1.menuPerformed("edit","paste");
          localStorage.setItem("circuitClipboard","");
          CircuitConst.is_copy_ele=true;
          cloneCir.forEach((d:any)=>{
            d.update(d.id);
          })
          CircuitConst.is_copy_ele=false;
          this.addHistry(null);
       }
     }
     else{
      if(CircuitConst.last_mouse_down_pos){
        let cloneCir=this.copyCutData.data.map((d:any)=>{
            return cloneDevice(d);
        })
        let {midX,midY} =this.getMidPointOfSelectedCir(cloneCir);
        midX=this.convertAxix(midX);
        midY=this.convertAxix(midY)
        let {x,y}=CircuitConst.last_mouse_down_pos;
         x=this.convertAxix(x);
         y=this.convertAxix(y);
        cloneCir=cloneCir.map((d:Circuit)=>{
            CircuitJS1.undoById(parseInt(d.id+""));
            const disX=this.convertAxix(d.x-midX);
            const disY=this.convertAxix(d.y-midY);
            const disX1=this.convertAxix(d.x1-midX);
            const disY1=this.convertAxix(d.y1-midY);
            d.x=x+disX;
            d.y=y+disY;
            d.x1=x+disX1;
            d.y1=y+disY1;
            d.setPostion();
            return d;
        })
        //this.doUndo(false);
        // cloneCir.forEach((d:any)=>{
        //   d.setPostion();
        // })
        this.undo=this.undo.filter((d:any,i:any)=>i!=this.copyCutData.undoIndex)
        this.resetCopyCutData();
        this.addHistry(null);
        this.doUndo();
        this.doRndo();
        //EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{})
        // if(cloneCir.length>0){
        //   const deviceCir= this.getSelectedDevice();
        //   if(deviceCir.length>0){
        //     setTimeout(()=>{
        //       ongwtEvent(deviceCir[0].id,JSON.stringify(deviceCir[0].basic_info))
        //     },100)
        //   }
        // }
      }
     }
  }
 }
static dublicateEle(){
  const deviceCir:DeviceComponent= getDeviceToCircuitObj()
  let cirList:any=[];
   cirList= deviceCir.device.filter((d)=>d.is_selected);
   const {midX} =this.getMidPointOfSelectedCir(cirList);
   const width=(CircuitConst.canvas.width)/2;
   let offset=112;
   if(width<midX){
    offset=-112;
   }
  //  cirList=cirList.map((d:Circuit)=>{
  //     d.x=d.x+offset;
  //     d.y=d.y+offset;
  //     d.x1=d.x1+offset;
  //     d.y1=d.y1+offset;
  //     return d;
  //   })
  //   const cirStr= cirList.map((d:any)=>{
  //     // console.log("copy cir==>",d.toCircuitString())
  //     return d.toCircuitString();
  //    }).join("\n");
  //    localStorage.setItem("circuitClipboard",cirStr);
  //    CircuitJS1.menuPerformed("edit","paste");
  //    localStorage.setItem("circuitClipboard","");
  //    CircuitConst.is_copy_ele=true;
  //   //  cloneCir.forEach((d:any)=>{
  //   //    d.update();
  //   //  })
  //    CircuitConst.is_copy_ele=false;
  //    this.addHistry(null);
   //const height=CircuitConst.canvas.height;

  if(cirList.length>0){
    let deviceCount=CircuitJS1.getDeviceCount();
    if(deviceCount>0){
      let cloneCir=cirList.map((d:any)=>{
        d.setNameById(deviceCount);
        d.id=deviceCount;
        deviceCount++;
          return cloneDevice(d);
      })
     const cirStr= cloneCir.map((d:any)=>{
       // console.log("copy cir==>",d.toCircuitString())
       return d.toCircuitString();
      }).join("\n");
      localStorage.setItem("circuitClipboard",cirStr);
      CircuitJS1.menuPerformed("edit","paste");
      localStorage.setItem("circuitClipboard","");

      cloneCir=cloneCir.map((d:Circuit)=>{
        d.x=d.x+offset;
       // d.y=d.y+offset;
        d.x1=d.x1+offset;
        //d.y1=d.y1+offset;
        return d;
      })

      cloneCir.forEach((d:any)=>{
           d.setPostion();
      })
      CircuitConst.is_copy_ele=true;
      cloneCir.forEach((d:any)=>{
        d.update(d.id);
      })
      CircuitConst.is_copy_ele=false;
      this.addHistry(null);
    }
  }
}

static swapTerminal(){
  const deviceCir:DeviceComponent= getDeviceToCircuitObj()
  let cirList:any=[];
   cirList= deviceCir.device.filter((d)=>d.is_selected);
   if(cirList.length>0){
    cirList.forEach((d:any)=>{
      if(d.type!=DEVICE_TYPE.SUB_CIRCUIT){
        CircuitJS1.rotateEleById(d.id,1)
        CircuitJS1.rotateEleById(d.id,1)
      }
    })
    this.addHistry(null);
   }
}
static getSelectedDevice(){
  const deviceCir= getAllDevice()
  let cirList:any=[];
   cirList= deviceCir.filter((d:any)=>d.is_selected.toLowerCase()=="true");
  return cirList || []
}
}
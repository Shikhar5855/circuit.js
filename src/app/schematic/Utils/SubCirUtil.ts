import { GWT_PORT_TYPE } from "./Command";
import { DeviceInfo } from "./DeviceDetails";
import { CircuitDepency, ModelDependancy } from "./SubCirDependancy/Dependancy";
import { DeviceComponent } from "./device";
import { DEVICE_TYPE } from "./device/DeviceConst";
import { IO } from "./device/IO";

// function syncAllPort(portObj){
//     const activeId=[];
//     const deactiveId=[];
//     const wireConnectedPort=[]
//     for(const key in portObj){
//      const portDetail=portObj[key];
//      if(portDetail.isWireConnected){
//          wireConnectedPort.push({id:portDetail.active,name:portDetail.name})
//      }
//      else{
//       activeId.push(portDetail.active)
//      }
//       if(portDetail.deactive.length>0){
//          portDetail.deactive.forEach((p)=>{
//              deactiveId.push(p);
//          })
//       }
//     }
//     // console.log("active ids==>",activeId);
//     // console.log("deactive ids==>",deactiveId);
//     // console.log("wire connect port==>",wireConnectedPort)
//     if(activeId.length>0){
//       const ids=activeId.join(",");
//       //console.log("active ids==>",ids);
//       window.deviceInfo.bulkUpdatePointStatus(ids,false);
//     }
//     if(deactiveId.length>0){
//       const ids=deactiveId.join(",");
//       //console.log("deactive ids==>",ids);
//       window.deviceInfo.bulkUpdatePointStatus(ids,true);
//     }
//     if(wireConnectedPort){
//      wireConnectedPort.forEach((d)=>{
//          window.deviceInfo.updateConnectDevice(parseInt(d.id+""),d.name) 
//      })
//     }
//  }
 function getPortNames(pointObj:any){
     let portNameObj:any={}
      for(const key in pointObj){
          if(pointObj[key].length>0){
             portNameObj[key]={name:"",active:"",deactive:[]}
             portNameObj[key].name=pointObj[key][0].name;
             portNameObj[key].active=pointObj[key][0].pid;
             for(let i=1;i<pointObj[key].length;i++){
              portNameObj[key].deactive.push(pointObj[key][i].pid)
             }
          }
      }
      return portNameObj;
 }
 function gotoWireNode(wireNode:any,did:any,wirePortObj:any,wireDevice:any,nanWirePortMapping:any,pointObj:any,isTransfer:any,name:any,visitingNode:any){
     if(visitingNode[wireNode]){
         return;
     }
     visitingNode[wireNode]=true;
     const netName=nanWirePortMapping[wireNode]?.name;
   //  console.log("log==>",name,wireNode,isTransfer,netName)
        if(!isTransfer && netName){
          const deviceId= wirePortObj[wireNode].did;
          const[p1,p2]=wireDevice[did].d;
          //console.log(p1,p2)
          if(wireNode!=p1.key){
              gotoWireNode(p1.key,did,wirePortObj,wireDevice,nanWirePortMapping,pointObj,true,netName,visitingNode);
          }
          else if(wireNode!=p2.key){
             gotoWireNode(p2.key,did,wirePortObj,wireDevice,nanWirePortMapping,pointObj,true,netName,visitingNode);
          }
        }
        else if(isTransfer){   // i.e two or more wire is connected without device
         if(netName){
           //  console.log("name==>",name)
             nanWirePortMapping[wireNode].name=name;
             nanWirePortMapping[wireNode]["isWireConnected"]=true
            // nanWirePortMapping[wireNode]["status"]=false

         }
             wirePortObj[wireNode].forEach((d:any)=>{
                 if(d.did!=did){
                     const[p1,p2]=wireDevice[d.did].d;
                     if(wireNode!=p1.key){
                         gotoWireNode(p1.key,d.did,wirePortObj,wireDevice,nanWirePortMapping,pointObj,true,name,visitingNode);
                     }
                     else if(wireNode!=p2.key){
                         gotoWireNode(p2.key,d.did,wirePortObj,wireDevice,nanWirePortMapping,pointObj,true,name,visitingNode);
                     } 
                 }
             })
        }
     //  else{
     //     console.log("log==>",name,wireNode,isTransfer,netName)
     //  }
 }
 function executionWirePointMap(wirePortObj:any,wireDevice:any,portNameMapping:any,pointObj:any){
        const checkVisingWireNode:any={};
        for(const key in wirePortObj){
         checkVisingWireNode[key]=false;
        }
        for(const key in wirePortObj){
           if(wirePortObj[key].length==1){
             gotoWireNode(key,wirePortObj[key][0].did,wirePortObj,wireDevice,portNameMapping,pointObj,false,"",checkVisingWireNode)
           }
        }
 }
 function getDeviceAndWirePoint(data:Array<PortDef>,deviceTypeObj:any){
     const nanWirePoint:any=[];
     const wirePoint:any=[]
     const wireList:any={}
     data.forEach((d)=>{
         if(deviceTypeObj[d.did]=="W"){
            wirePoint.push(d);
            if(!wireList[d.did]){
               wireList[d.did]={s:false,d:[]};
            }
            wireList[d.did].d.push({id:d.id,key:d.x+"_"+d.y})
         }
         else{
             nanWirePoint.push(d);
         }
     })
     return [getPointMapWithDevice(nanWirePoint),getPointMapWithDevice(wirePoint),wireList]
 }
 function getPointMapWithDevice(data:any){
    return data.reduce((acc:any,d:any)=>{
         const port = d.x+"_"+d.y;
        if(!acc[port]){
            acc[port]=[];
        }
        acc[port].push({did:d.did,pid:d.id,name:d.pname,wire_type:d.wire_type});
        return acc;
     },{})
 }
 function getDeviceData(data:Array<DeviceDef>){
     return data.reduce((acc:any,d)=>{
          acc[d.did]=d.type;
          return acc;
     },{})
 }


//  function syncPortConnectedType(devicePortObj){

//    // const newDevObj=JSON.parse(JSON.stringify(devicePortObj));
//     for(const port in devicePortObj){
//       if(devicePortObj[port].length>=2){
//          const [p1,...restPort] =devicePortObj[port];
//          const l= restPort.filter((d)=>d.wire_type==p1.wire_type).length;
//          if(l!=restPort.length){
//             restPort.forEach((d)=>{
//                 this.window.deviceInfo.updateConnectedPointType(parseInt(d.pid+""),"NET");
//                 this.window.deviceInfo.updateConnectedPointType(parseInt(p1.pid+""),"NET")
//             })
//          }
//       }
//     }
//     //console.log("syncPortConnectedType==>",devicePortObj);
//  }

//  function synWireInputType(wireObj,deviceInfo){
//     console.log("wireObj==>",wireObj,deviceInfo);

//  }
type PortDef={
    pname:string,
    x:string,
    y:string,
    dname?:string,
    did:number,
    id:number
}

type DeviceDef={
    did:number,
    name?:string,
    type?:string
}
 export var convertIntoSubCir=(divComp:DeviceComponent)=>{
  // divComp.cell_name=DeviceInfo.cell_name;
  divComp.device.sort((a,b)=>parseInt(a.id+"")-parseInt(b.id+""));
    const pointList:Array<PortDef>=[];
    const deviceList:Array<DeviceDef>=[];
    const IO_DETAILS:any={
        I:[],
        O:[],
        IO:[],
        VDD:[],
        VSS:[],
        VDDI:[],
        VSSI:[],
    }
    const IO_DETAILS_OBJ:any={
        I:{},
        O:{},
        IO:{},
        VDD:{},
        VSS:{},
        VDDI:{},
        VSSI:{}
    }
    divComp.device.forEach((v:any)=>{
        deviceList.push({
            did:v.id,
            name:v.name,
            type:v.type
        })
        
        v.port_list.forEach((p:any,i:any)=>{
            pointList.push({
                pname:p.portName,
                x:p.x,
                y:p.y,
                dname:v.name,
                did:v.id,
                id:(i+1)
            })
            if(v.type!=DEVICE_TYPE.INPUT_OUTPUT){
               
            }
            else{
               const ioP:IO=v;
               if(ioP.ioType==GWT_PORT_TYPE.IN){
                     IO_DETAILS.I.push(p)
               }
               else if(ioP.ioType==GWT_PORT_TYPE.OUT){
                IO_DETAILS.O.push(p)

               }
               else if(ioP.ioType==GWT_PORT_TYPE.IN_OUT){
                IO_DETAILS.IO.push(p)

               }
               else if(ioP.ioType==GWT_PORT_TYPE.POWER){
                IO_DETAILS.VDD.push(p)

               }
               else if(ioP.ioType==GWT_PORT_TYPE.GROUND){
                IO_DETAILS.VSS.push(p)

               }
               else if(ioP.ioType==GWT_PORT_TYPE.VDDI){
                 IO_DETAILS.VDDI.push(p)
               }
               else if(ioP.ioType==GWT_PORT_TYPE.VSSI){
                IO_DETAILS.VSSI.push(p)                
               }
               else if(ioP.ioType==GWT_PORT_TYPE.NET){
                
               }
            }
        })
    })
   
    const deviceTypeObj=getDeviceData(deviceList);
    const[pointObj,wireObj,wirePort]= getDeviceAndWirePoint(pointList,deviceTypeObj)
    const portObj=getPortNames(pointObj);
    console.log(wireObj,wirePort);
     executionWirePointMap(wireObj,wirePort,portObj,pointObj);

    //  divComp.device.forEach((d)=>{
    //     if(d.type==DEVICE_TYPE.VOLTAGE){
    //         const [n1,n2] = d.port_list;
    //         portObj[n1.x+"_"+n1.y].name="0";
    //     } 
    //  })

     IO_DETAILS.I.forEach((p:any)=>{
      const key=p.x+"_"+p.y;
      p.portName=portObj[key].name;
      p.key=key;
     })

     IO_DETAILS.O.forEach((p:any)=>{
        const key=p.x+"_"+p.y;
        p.portName=portObj[key].name;
        p.key=key;
    })
    IO_DETAILS.IO.forEach((p:any)=>{
        const key=p.x+"_"+p.y;
        p.portName=portObj[key].name;
        p.key=key;
    })
    IO_DETAILS.VDD.forEach((p:any)=>{
        const key=p.x+"_"+p.y;
        const netname=portObj[key].name;
        for(let netvdd in portObj){
            if(portObj[netvdd].name==netname){
                portObj[netvdd].name="VDD";
            }
        }
        p.key=key;
    })
    IO_DETAILS.VDDI.forEach((p:any)=>{
        const key=p.x+"_"+p.y;
        const netname=portObj[key].name;
        for(let netvdd in portObj){
            if(portObj[netvdd].name==netname){
                portObj[netvdd].name="VDDi";
            }
        }
        p.key=key;
    })
    IO_DETAILS.VSS.forEach((p:any)=>{
        const key=p.x+"_"+p.y;
        const netname=portObj[key].name;
        for(let netvdd in portObj){
            if(portObj[netvdd].name==netname){
                portObj[netvdd].name="VSS";
            }
        }
        p.key=key;
    })

    IO_DETAILS.VSSI.forEach((p:any)=>{
        const key=p.x+"_"+p.y;
        const netname=portObj[key].name;
        for(let netvdd in portObj){
            if(portObj[netvdd].name==netname){
                portObj[netvdd].name="VSSI";
            }
        }
        p.key=key;
    })
    const nePortObj:any={};
    for(const key in portObj){
        nePortObj[key]=portObj[key].name
    }

   //  console.log("SubCir pointObj==>",portObj,IO_DETAILS);
   const netListList:any=[];
   const cell_list:any=[];
   const subCirDep=new CircuitDepency();
   divComp.device.forEach((d:any)=>{
     if(d.type !=DEVICE_TYPE.WIRE && d.type != DEVICE_TYPE.INPUT_OUTPUT){
          try{
          const netlist_div= d.getNetlistValue(nePortObj,subCirDep);
          console.log("subCirDep==>",subCirDep,d);
          netListList.push(netlist_div);
          if(d.type==DEVICE_TYPE.SUB_CIRCUIT){
            cell_list.push(d.cell_name);
          }
          }
          catch(err){
            console.log("Error in device==>",d)
          }
     }
   })
   const pin_detail:any=[]
   IO_DETAILS.I.forEach((p:any)=>{
    pin_detail.push(p.portName);
   })

   IO_DETAILS.O.forEach((p:any)=>{
    pin_detail.push(p.portName);
  })
  IO_DETAILS.IO.forEach((p:any)=>{
    pin_detail.push(p.portName);
  })
  let vdd=IO_DETAILS.VDD.length>0;
  let vddi=IO_DETAILS.VDDI.length>0;;
//   IO_DETAILS.VDD.forEach((p:any)=>{
//       vdd=true;
//   })
//   IO_DETAILS.VDD.forEach((p:any)=>{
//     vddi=true;
//   })
  let vss=IO_DETAILS.VSS.length>0;
  let vssi=IO_DETAILS.VSSI.length>0;;
//   IO_DETAILS.IO_DETAILS.VSSI.length>0
  if(vdd){
    pin_detail.push(ModelDependancy.VDD_NODE);
  }
  if(vss){
    pin_detail.push(ModelDependancy.VSS_NODE);
  }
  if(vddi){
    pin_detail.push(ModelDependancy.VDDI_NODE);
  }
  if(vssi){
    pin_detail.push(ModelDependancy.VSSI_NODE);

  }

  const sub_cir_text=`\n.SUBCKT ${divComp.cell_name} ${pin_detail.join(" ")}\n${netListList.join("\n")}\n.ENDS\n`;

   return {
    data:sub_cir_text,
    subCirDep,
    name:divComp.cell_name,
    cell_list
   }
  // console.log("Netlist details==>",netListList,subCirDep) 
 }
function syncAllPort(portObj){
    const activeId=[];
    const deactiveId=[];
    const wireConnectedPort=[]
    for(const key in portObj){
     const portDetail=portObj[key];
     if(portDetail.isWireConnected){
         wireConnectedPort.push({id:portDetail.active,name:portDetail.name})
     }
     else{
      activeId.push(portDetail.active)
     }
      if(portDetail.deactive.length>0){
         portDetail.deactive.forEach((p)=>{
             deactiveId.push(p);
         })
      }
    }
    // console.log("active ids==>",activeId);
    // console.log("deactive ids==>",deactiveId);
    // console.log("wire connect port==>",wireConnectedPort)
    if(activeId.length>0){
      const ids=activeId.join(",");
      //console.log("active ids==>",ids);
      window.deviceInfo.bulkUpdatePointStatus(ids,false);
    }
    if(deactiveId.length>0){
      const ids=deactiveId.join(",");
      //console.log("deactive ids==>",ids);
      window.deviceInfo.bulkUpdatePointStatus(ids,true);
    }
    if(wireConnectedPort){
     wireConnectedPort.forEach((d)=>{
         window.deviceInfo.updateConnectDevice(parseInt(d.id+""),d.name) 
     })
    }
 }
 function getPortNames(pointObj){
     let portNameObj={}
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
 function gotoWireNode(wireNode,did,wirePortObj,wireDevice,nanWirePortMapping,pointObj,isTransfer,name,visitingNode){
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
             wirePortObj[wireNode].forEach((d)=>{
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
 function executionWirePointMap(wirePortObj,wireDevice,portNameMapping,pointObj){
        const checkVisingWireNode={};
        for(const key in wirePortObj){
         checkVisingWireNode[key]=false;
        }
        for(const key in wirePortObj){
           if(wirePortObj[key].length==1){
             gotoWireNode(key,wirePortObj[key][0].did,wirePortObj,wireDevice,portNameMapping,pointObj,false,"",checkVisingWireNode)
           }
        }
 }
 function getDeviceAndWirePoint(data,deviceTypeObj){
     const nanWirePoint=[];
     const wirePoint=[]
     const wireList={}
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
 function getPointMapWithDevice(data){
    return data.reduce((acc,d)=>{
         const port = d.x+"_"+d.y;
        if(!acc[port]){
            acc[port]=[];
        }
        acc[port].push({did:d.did,pid:d.id,name:d.pname,wire_type:d.wire_type});
        return acc;
     },{})
 }
 function getDeviceData(data){
     return data.reduce((acc,d)=>{
          acc[d.did]=d.type;
          return acc;
     },{})
 }


 function syncPortConnectedType(devicePortObj){

   // const newDevObj=JSON.parse(JSON.stringify(devicePortObj));
    for(const port in devicePortObj){
      if(devicePortObj[port].length>=2){
         const [p1,...restPort] =devicePortObj[port];
         const l= restPort.filter((d)=>d.wire_type==p1.wire_type).length;
         if(l!=restPort.length){
            restPort.forEach((d)=>{
                this.window.deviceInfo.updateConnectedPointType(parseInt(d.pid+""),"NET");
                this.window.deviceInfo.updateConnectedPointType(parseInt(p1.pid+""),"NET")
            })
         }
      }
    }
    //console.log("syncPortConnectedType==>",devicePortObj);
 }

//  function synWireInputType(wireObj,deviceInfo){
//     console.log("wireObj==>",wireObj,deviceInfo);

//  }
 var onCanvasMouseRelease=(id)=>{
  try{
    console.log("device selected==>",id);
    const pointList=CircuitJS1.exportPointCircuit();
    const deviceList= CircuitJS1.exportDeviceCircuit();
    //console.log(pointList,deviceList)
   
    let deviceJson=JSON.parse(deviceList);
    deviceJson.sort((a,b)=>parseInt(a.id+"")-parseInt(b.id+""));
    console.log("deviceJson==>",deviceJson)
    let pointJson=JSON.parse(pointList);
    pointJson.sort((a,b)=>parseInt(a.did+"")-parseInt(b.did+""))
    const deviceTypeObj=getDeviceData(deviceJson);
    const[pointObj,wireObj,wirePort]= getDeviceAndWirePoint(pointJson,deviceTypeObj)
    const portObj=getPortNames(pointObj);
    console.log(wireObj,wirePort);
     executionWirePointMap(wireObj,wirePort,portObj,pointObj);
    // console.log("pointObj==>",pointObj);
     syncAllPort(portObj);
     //const updatedPoint= JSON.parse(CircuitJS1.exportPointCircuit());
    // syncPortConnectedType(pointObj,wireObj)
   //  synWireInputType(wireObj,deviceJson)
   //  console.log("updatedpoint==>",updatedPoint)
     onmouserelease.forEach((cb)=>{
       if(cb){
           cb({portObj,wireObj,wirePort,deviceTypeObj,deviceJson,pointObj,pointJson})
       }
     })
    }
    catch(err){
      console.log("Error canvas==>",err)
    }
 //    console.log("deviceList==>",getDeviceData(JSON.parse(deviceList)));
 }

 const onmouserelease=[];

 function addDeviceChange(cb){
    onmouserelease.push(cb);
 }





 function getCanvas(){
    if(this.window["cir_ui_200593"]){
      return this.window["cir_ui_200593"];
    }
    let iframe=document.getElementById("circuitjs1");
    let canvas=null;
    if(iframe){
        const canvasList=document.getElementsByTagName("canvas")
        for(let i=0;i<canvasList.length;i++){
              var c=canvasList[i];
              const title= c.getAttribute("title");
              if(title=="cir_ui_200593"){
                canvas = c;
                this.window["cir_ui_200593"]=c;
                break;
              }
        }
     }
    if(canvas){
      let iframe=document.getElementById("circuitjs1");
      const div1=iframe.nextSibling;
      const div2=div1.nextSibling;
      div2.style.width="0px";
      div2.style.height="0px";
      canvas.height=0;
      canvas.style.height="0px"
      canvas.style.position="relative";
      canvas.style.outline="none";
      CircuitJS1.setCanvasSize(0,0)
    }
     return canvas;  
  }


    let timer=setInterval(()=>{
            try{ 
               const canvas=this.getCanvas();
                    if(canvas){
                        clearInterval(timer);
                    }
               }
            catch(err){
                console.log(err)
            }
    },2000)


const histryEventList=[];
var addHistryEventCB=(cb)=>{
   histryEventList.push(cb);
}
window["addHistryEvent"]=(name,id)=>{
  histryEventList.forEach((cb)=>{
    cb(name,id);
  })
      //console.log("Histry event==>",name,id);
}

localStorage.setItem("euroResistors", "false");
//title = 'circuit';
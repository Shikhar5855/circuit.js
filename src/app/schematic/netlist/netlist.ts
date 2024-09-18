// import {Point,Cuircuit,DeviceUtil} from "./convertCuircuit"
// import {circuitConnection,CircuitMapConnection,getNetlistCode,getSubCirData,getModelData} from "./circuitUtil"
// import {Voltage,Risitor,Capcitor,Inductor,Gate,Daiod,Transistor,Mosfet, ModelDependancy, SubCurcuitDependancy} from "./devices"
// import {DEVICE_TYPE,VOLTAGE_SOURCE_TYPE} from "./CircuitConst"
// import { GWT_PORT_TYPE } from "src/app/Utils/Command"

// export function getNetlistCodeData(circuitStr:any,pointData:any,pointList:any){
//     console.log("pointData netlist");
//     const splitStr=circuitStr.split("\n");
//     let arr:any=[];
//     let sourceDeviceObj:any=[];
//     const pointValue={};
//     let gateName=""
//     let portObj:any={
//         [GWT_PORT_TYPE.IN]:{},
//         [GWT_PORT_TYPE.OUT]:{},
//         [GWT_PORT_TYPE.IN_OUT]:{},
//         [GWT_PORT_TYPE.POWER]:{},
//         [GWT_PORT_TYPE.GROUND]:{},
//         [GWT_PORT_TYPE.NET]:{}
//     }
//     pointList.forEach((d:any)=>{
//         const point=new Point(d.x,d.y,d.wire_type);
//         if(!portObj[point.type]){
//             portObj[point.type]={}
//         }
//         if(!d.status)
//           portObj[point.type][point.getPort()]=d.name;
//     })

//     console.log("portobj==>",portObj)
//     splitStr.forEach((d:any)=>{
//         d=d.trim();
//         if(d){
//             const circuitData=d.split(" ") || [];
//             switch(circuitData[0]){
//                 case DEVICE_TYPE.RESITOR:{
//                     const [type,x1,y1,x2,y2,,id,value] =circuitData;
//                     const p1=new Point(x1,y1,null);
//                     const p2=new Point(x2,y2,null);
//                     const risitor=new Risitor(value);
//                     const d=new Cuircuit(type,risitor).addNode(p1).addNode(p2).addId(id)
//                     arr.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.DAIOD:{
//                     const [type,x1,y1,x2,y2,value,id] =circuitData;
//                     const p1=new Point(x1,y1,null);
//                     const p2=new Point(x2,y2,null);
//                     const daiod=new Daiod(value);
//                     const d=new Cuircuit(type,daiod).addNode(p1).addNode(p2)
//                     arr.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.CAPACITOR:{
//                     const [type,x1,y1,x2,y2,,id,value] =circuitData;
//                     const p1=new Point(x1,y1,null);
//                     const p2=new Point(x2,y2,null);
//                     const capacitor=new Capcitor(value)
//                     const d=new Cuircuit(type,capacitor).addNode(p1).addNode(p2).addId(id)
//                     arr.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.INDUCTOR:{
//                     const [type,x1,y1,x2,y2,,id,value] =circuitData;
//                     const p1=new Point(x1,y1,null);
//                     const p2=new Point(x2,y2,null);
//                     const inductor=new Inductor(value)
//                     const d=new Cuircuit(type,inductor).addNode(p1).addNode(p2).addId(id)
//                     arr.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.WIRE:{
//                     const [type,x1,y1,x2,y2] =circuitData;
//                     const p1=new Point(x1,y1,null);
//                     const p2=new Point(x2,y2,null);
//                     const d=new Cuircuit(type,null).addNode(p1).addNode(p2)
//                     arr.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.VOLTAGE:{
//                     const [type,x1,y1,x2,y2,,id,voltage_source_type,frequancy,max_voltage,dc_offset,phase_angle,duty_cycle] =circuitData;
//                     const p1=new Point(x1,y1,null);
//                     const p2=new Point(x2,y2,null);
//                     const voltage=new Voltage(voltage_source_type,max_voltage,frequancy,dc_offset,phase_angle,duty_cycle)
//                     const d=new Cuircuit(type,voltage).addNode(p1).addNode(p2).addId(id)
//                     arr.push(d)
//                     sourceDeviceObj.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.SWITCH:{
//                     const [type,x1,y1,x2,y2] =circuitData;
//                     const p1=new Point(x1,y1,"L");
//                     const p2=new Point(x2,y2,"H");

//                     const d=new Cuircuit(type,null).addNode(p1).addNode(p2)
//                     arr.push(d)
//                 }
//                 break;
//                 case DEVICE_TYPE.NOTGATE:
//                 case DEVICE_TYPE.ANDGATE:
//                 case DEVICE_TYPE.ORGATE:
//                 case DEVICE_TYPE.NANDGATE:
//                 case DEVICE_TYPE.NORGATE:
//                 case DEVICE_TYPE.XORGATE:
//                    const [type,inout,voltage] = circuitData;
//                    const gate=new Gate(voltage,type);
//                    const d=new Cuircuit(type,gate);
//                    inout.split("@").forEach((s:any,i:any)=>{
//                         const [x,y]=s.split("#");
//                         const p=new Point(x,y,null);
//                         d.addNode(p);
//                         //inputList.push(p);
//                     })
//                     arr.push(d);
//                 break;

//                 case DEVICE_TYPE.NMOS:
//                 case DEVICE_TYPE.PMOS:{
//                     const [type,inout,wp,l,m] = circuitData;
//                     const mos=new Mosfet(null,type,wp,l,m);
//                     const d=new Cuircuit(type,mos);
//                     inout.split("@").forEach((s:any,i:any)=>{
//                          const [x,y]=s.split("#");
//                          const p=new Point(x,y,null);
//                          d.addNode(p);
//                          //inputList.push(p);
//                      })
//                      arr.push(d);
//                 }
//                 break;

//                 case DEVICE_TYPE.NPN:
//                 case DEVICE_TYPE.PNP:{
//                     const [type,inout,wp,l,m] = circuitData;
//                     const mos=new Transistor(null,type,null,null,null,null);
//                     const d=new Cuircuit(type,mos);
//                     inout.split("@").forEach((s:any,i:any)=>{
//                          const [x,y]=s.split("#");
//                          const p=new Point(x,y,null);
//                          d.addNode(p);
//                          //inputList.push(p);
//                      })
//                      arr.push(d);
//                 }
//                 break;
//             }
//         }
//     })

//     sourceDeviceObj.forEach((d:any)=>{
//         const[LPoint] = d.points
//         if(pointData[LPoint.getPort()]){
//             const portname=pointData[LPoint.getPort()].name;
//             for(const key in pointData){
//                 if(pointData[key].name==portname){
//                     pointData[key].name="0";
//                 }
//             }
//         }
//     })

//     const inputist=[];
//     const outputlist=[];
//     const inoutList=[];
//     let isVdd=false;
//     let isVss=false;
//     for(const key in pointData){
//         if(portObj[GWT_PORT_TYPE.POWER][key]){
//             pointData[key].name="vdd";
//             isVdd=true;
//         }
//         else if(portObj[GWT_PORT_TYPE.GROUND][key]){
//             pointData[key].name="vss";
//             isVss=true;
//         }
//         else if(portObj[GWT_PORT_TYPE.IN][key]){
//             inputist.push(portObj[GWT_PORT_TYPE.IN][key] )
//         }
//         else if(portObj[GWT_PORT_TYPE.OUT][key]){
//             outputlist.push(portObj[GWT_PORT_TYPE.OUT][key] )
//         }
//         else if(portObj[GWT_PORT_TYPE.IN_OUT][key]){
//             inoutList.push(portObj[GWT_PORT_TYPE.IN_OUT][key] )
//         }
//     }
//     const commonPort=[...outputlist,...inoutList,inputist]
//     if(isVdd){
//         commonPort.push("vdd");
//     }
//     if(isVss){
//         commonPort.push("vss");
//     }

//     const netlistCode=getNetlistCode(arr,pointData)
//     const subnetlistCode=`\n.SUBCKT sub_cir ${commonPort.join(" ")}\n${netlistCode}\nENDS sub_cir\n`
//     const subcirStr=getSubCirData();
//     const modelStr=getModelData();
//     let vddStr=``;
//     let vssStr=``;
//     if(ModelDependancy.VDD){
//         vddStr=`Vd ${ModelDependancy.VDD_NODE} 0 dc 5`;
//     }
//     if(ModelDependancy.VSS){
//        vssStr=`Vs ${ModelDependancy.VSS_NODE} 0 dc 0`;
//     }
//     //console.log(SubCurcuitDependancy, subcirStr)
//     //console.log(modelStr)
//     return `${modelStr}\n${subcirStr}\n${vddStr}\n${vssStr}\n${subnetlistCode}`;
// }
// // const strInpN='$ 0 0.000005 1.0312258501325766 50 5 50 5e-11\nr 112 112 336 112 0 R1@1 1000\nc 112 208 336 208 0 C2@2 0.00001 0 0.001\nl 128 320 352 336 0 I3@3 1 -0.000012500000000000002 0\nv 112 496 352 496 0 V4@4 0 40 5 0 0 0.5\nw 336 112 336 208 0 W5@5\nw 336 208 352 336 0 W6@6\nw 352 336 352 496 0 W7@7\nw 112 112 112 208 0 W8@8\nw 112 208 128 320 0 W9@9\nw 128 320 112 496 0 W10@10\n';
// // const pointData={"112_112":{"name":"net1","active":"1","deactive":[]},"336_112":{"name":"net2","active":"2","deactive":[]},"112_208":{"name":"net1","active":"3","deactive":[],"isWireConnected":true},"336_208":{"name":"net2","active":"4","deactive":[],"isWireConnected":true},"128_320":{"name":"net1","active":"5","deactive":[],"isWireConnected":true},"352_336":{"name":"net2","active":"6","deactive":[],"isWireConnected":true},"112_496":{"name":"net1","active":"7","deactive":[],"isWireConnected":true},"352_496":{"name":"net2","active":"8","deactive":[],"isWireConnected":true}}
// //  const pointdata='[{"pname":"A","x":"160","y":"112","dname":"R1","status":"false","id":"1"},{"pname":"B","x":"384","y":"112","dname":"R1","status":"true","id":"2"},{"pname":"C","x":"160","y":"272","dname":"V2","status":"false","id":"3"},{"pname":"D","x":"384","y":"272","dname":"V2","status":"true","id":"4"}]'
// //  const inpspoint1={"384_256":{"name":"net1","active":"1","deactive":[]},"176_272":{"name":"net2","active":"2","deactive":["6"]},"176_240":{"name":"net3","active":"3","deactive":["4"]},"64_160":{"name":"net5","active":"5","deactive":["8"]},"80_384":{"name":"net7","active":"7","deactive":["9"]}}
// //  const dinfo='$ 0 0.000005 1.0312258501325766 50 5 50 5e-11\nGA 176#272@176#240@384#256 5 151 176 256 384 256 0 G1@1 2 5 5\nr 176 240 64 160 0 R2@2 1000\nr 176 272 80 384 0 R3@3 1000\nv 64 160 80 384 0 V4@4 0 40 5 0 0 0.5\n'
// //    const str=getNetlistCodeData(dinfo,inpspoint1);
// //    console.log(str);

// //window.getNetlistCodeData=getNetlistCodeData;

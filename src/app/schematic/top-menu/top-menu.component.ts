import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Command, GWT_COMMAND, selectItem } from '../Utils/Command';
import { DeviceDetail } from '../Utils/OnCanvasMouseRelease';
import { EventListner, EVENT_NAME } from '../Utils/EventListner';
import { getNetlistCodeData } from '../netlist/newnetlist';
import { environment } from 'src/environments/environment';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { DeviceComponent } from '../Utils/device';
import { getAllDevice, getDeviceToCircuitObj } from '../Utils/device/util';
import { DeviceDetail as deviceDetailObj } from '../Utils/OnCanvasMouseRelease';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { DeviceCurd, DeviceInfo } from '../Utils/DeviceDetails';
import { Circuit } from '../Utils/device/Circuit';
import { Store } from '../Utils/Store';
import { convertIntoSubCir } from '../Utils/SubCirUtil';
import { convertIntoNetlist } from '../Utils/SubCirDependancy/netlist';
import { UndoRedo } from '../Utils/UndoRedoOpreation';


declare var CircuitJS1: any;
declare var $: any;
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
  logo_url = environment.logo_url;
  logo_name = environment.logo_name;
  cmd = GWT_COMMAND;
  voltageStatus = false;
  currentStatus = false;
  window: any = window;
  document: any = document;
  isNode = true;
  isDevice = true;
  isCellName=false;
  isProperty = false;
  isDeviceSeleted = false;
  cir_name = environment.default_cir_name;
  subCirLis:Array<DeviceComponent>=[];
  isUndo=true;
  isRedo=true;
  deviceComponentId="";
  isUpperCase=true;
  toolBarStatus={
    paste:false,
    editSubCir:false,
    scope:-1
  }
  rotation_histry={

  }
  
  public circuitText: string = ''; // Initialize the text area with an empty string

  constructor(private changeDetectorRef: ChangeDetectorRef,public dialog: MatDialog) {
    EventListner.addEvent(EVENT_NAME.SELECTION_CHANGE, () => {
      this.changeDetectorRef.detectChanges();
    });
    EventListner.addEvent(EVENT_NAME.DEVICE_SELECTED, ({data,device_type}:any) => {
      // this.isDeviceSeleted = true;
      // this.deviceComponentId="";
      // if(device_type=="S"){
      //     let obj=data.reduce((acc:any,d:any)=>{
      //         acc[d.key]=d.value;
      //         return acc;
      //     },{})
      //     if(obj["model_name"]){
      //        const divComp:any= Store.getDeviceComponentByCellName(obj["model_name"]);
      //        this.deviceComponentId=divComp?.id||"";;
      //     }
      // }
      // this.changeDetectorRef.detectChanges();

    });

    EventListner.addEvent(EVENT_NAME.DEVICE_DESELECTED, (data: any) => {
      this.isDeviceSeleted = false;
      this.changeDetectorRef.detectChanges();
    });
    EventListner.addEvent(EVENT_NAME.UNDO_REDO_EVENT,(data:any)=>{
       if(deviceDetailObj.undoItemList.length>0){
         this.isUndo=true;
       }
       else{
        this.isUndo=false;
       }
       if(deviceDetailObj.redoItemList.length>0){
        this.isRedo=true;
       }
       else{
        this.isRedo=false;
       }
       this.changeDetectorRef.detectChanges();
    })

    EventListner.addEvent(EVENT_NAME.HANDLE_CLICK_ACTIVITY,()=>{
       this.handleActivity();
    })
  }
  openDialog(type:string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {cell_name: DeviceInfo.cell_name, id:DeviceInfo.id,type},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result && result.type=="save_cell"){
        const {id,cell_name}=result;
        DeviceInfo.id=id;
        DeviceInfo.cell_name=cell_name;
        
        const item:DeviceComponent=getDeviceToCircuitObj();
        item.id=DeviceInfo.id+"";
        item.cell_name=cell_name;
        if(DeviceInfo.id){
          DeviceCurd.updateItem(item);
        }
        else{
          item.id=new Date().getTime().toString();
          DeviceCurd.addItem(item);
        }
      }
      else if(result && result.type=="only_cell_name"){
        const {cell_name}=result;
        DeviceInfo.cell_name=cell_name;
        this.getNetlistDataWithFileName()
      }
      else if(result && result.type=="clear"){
        UndoRedo.redo=[];
        UndoRedo.undo=[];
        this.blankCanvas();
        DeviceDetail.callDeviceChanges();
       this.isDeviceSeleted=false;
        // setTimeout(()=>{
        //   this.handleActivity();
        // },200)
      }
    });
  }
  addDevice(d: Command) {
    CircuitJS1.menuPerformed(d.name, d.value);
    selectItem(d);
  }
  setCurrentStatus() {
    this.currentStatus = !this.currentStatus;
    CircuitJS1.setCurrentStatus(this.currentStatus ? 1 : 0);
  }
  getNetlistData() {
    let count = parseInt(CircuitJS1.getBadConnectionCount() + "");
    if (count > 0) {
        alert(count + " Bad Connection");
        return;
    }
    let divCompn: DeviceComponent = getDeviceToCircuitObj();
    if (divCompn.isValidationError()) {
        alert("Validation Error");
        return;
    }
    if (DeviceInfo.cell_name) {
        this.getNetlistDataWithFileName();
    } else {
        this.openDialog("only_cell_name");
    }
}

getNetlistDataWithFileName() {
    const deviceComp: DeviceComponent = getDeviceToCircuitObj();
    deviceComp.cell_name = DeviceInfo.cell_name;

    const cirObj: any = convertIntoSubCir(deviceComp);
    let sub_cir_data = convertIntoNetlist(cirObj, Store.subCirList);
    let filename = DeviceInfo.cell_name;
    
    if (this.isUpperCase) {
        sub_cir_data = sub_cir_data.toUpperCase();
        filename += "_uppercase";
    } else {
        sub_cir_data = sub_cir_data.toLowerCase();
        filename += "_lowercase";
    }

    filename += new Date().getTime() + ".cir";

    // Retrieve raw data from localStorage under the key "circuitRecovery"
    let circuitRecovery = localStorage.getItem("circuitRecovery");
    let rawData = "";

    if (circuitRecovery) {
        // If data exists in localStorage, append it
        rawData = circuitRecovery;
    } else {
        console.warn("No circuitRecovery data found in localStorage.");
    }

    // Combine the netlist data with the circuitRecovery data
    const finalData = sub_cir_data + "\n\n*** Circuit Recovery Data ***\n" + rawData;

    // Download the combined data as a file
    this.downloadURI(encodeURIComponent(finalData), filename);
}

downloadURI(uri: string, name: string) {
    const link: any = document.createElement('a');
    link.download = name;
    link.href = 'data:text/plain;charset=utf-8,' + uri + '\n.end';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
convertIntoTime(n: number) {
    return n / 1000;
  }
  startSim() {
    const graph: any = document.getElementById('graph_show');
    graph.style.display = 'block';
    graph.style.top = '250px';
    graph.style.bottom = '100px';
    let d = { col: [], data: [] };
    const str: string = CircuitJS1.exportCircuit();
    const pointData = DeviceDetail.portObj;
    const netlist: string = this.window.getNetlistCodeData(str, pointData);
    const starttime = '0.1u';
    const endtime = '1m';
    const id = new Date().getTime();
    fetch('http://localhost:6060/sim', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        netlist,
        starttime,
        endtime,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.drawGraph(result.data);
      })
      .catch((err) => {
        console.log('sim err==>', err);
      });
  }
  convertToCircuitObject(text: string): any {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const circuitObject: { [key: string]: string } = {};
  
    lines.forEach((line, index) => {
      circuitObject[`line${index}`] = line.trim();
    });
  
    return circuitObject;
  }
  
  formatCircuitData(circuitObject: any): string {
    let formattedData = '';
  
    for (const key in circuitObject) {
      if (circuitObject.hasOwnProperty(key)) {
        formattedData += circuitObject[key] + '\n';
      }
    }
  
    return formattedData.trim(); // Remove trailing newline
  }
  drawGraph = ({ col, data }: { col: any; data: any }) => {
    let obj: any = [];
    col.forEach((k: string) => {
      obj.push([]);
    });
    data.forEach((dd: any) => {
      dd.forEach((cc: string, i: number) => {
        if (i == 0) {
          const num = parseFloat(cc);
          obj[i].push(this.convertIntoTime(num));
        } else {
          const num = parseFloat(cc);
          obj[i].push(num);
        }
      });
    });
    console.log('sim result==>', obj[1]);
    const data1: any = {
      labels: obj[0],
      datasets: [
        {
          label: col[1],
          data: obj[1],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    const decimation = {
      enabled: false,
      algorithm: 'min-max',
    };
    const config: any = {
      type: 'line',
      data: data1,
      tension: 0,
      options: {
        // Turn off animations and data parsing for performance
        animation: false,
        parsing: true,
        scales: {
          x: {},
        },
      },
    };

    new Chart('acquisitions', config);
  };
  addCircuitToCanvas(circuitData: string) {
    if (typeof CircuitJS1 === 'undefined' || !CircuitJS1.importCircuit) {
      console.error('CircuitJS1 is not initialized or importCircuit is missing.');
      return;
    }
  
    try {
      CircuitJS1.importCircuit(circuitData); // Import the circuit
      console.log('Circuit successfully imported:', circuitData);
    } catch (error) {
      console.error('Error importing circuit:', error);
      alert('Failed to import circuit. Please check the data format.');
    }
  }
  setVisibility(type: any) {
    if (type == 'n') {
      this.isNode = !this.isNode;
      CircuitJS1.setGlobelNodeActive('net', this.isNode);
    } else if (type == 'd') {
      this.isDevice = !this.isDevice;
      CircuitJS1.setGlobelNodeActive('device', this.isDevice);
    } else if (type == 'p') {
      this.isProperty = !this.isProperty;
      CircuitJS1.setGlobelNodeActive('property', this.isProperty);
    }
    else if(type=='c'){
      this.isCellName = !this.isCellName;
      CircuitJS1.setGlobelNodeActive('cell_name', this.isCellName);
    }
    else if(type=="U"){
      this.isUpperCase=!this.isUpperCase
    }
    // this.isNode=!this.isNode;
    // CircuitJS1.setGlobelNodeActive(this.isNode?1:0)
  }
  importCircuitFromText() {
    if (!this.circuitText) {
      alert('Please enter circuit data.');
      return;
    }
  
    try {
      // Handle the special character at the beginning ($)
      if (this.circuitText.startsWith('$')) {
        this.circuitText = this.circuitText.substring(1).trim(); // Remove the $ if needed
      }
  
      // Convert the text to an object
      const circuitDataObject = this.convertToCircuitObject(this.circuitText);
  
      // Format the object back into a single string
      const formattedData = this.formatCircuitData(circuitDataObject);
  
      // Log the formatted data
      console.log('Formatted Circuit Data:', formattedData);
  
      // Pass the formatted data to CircuitJS
      this.addCircuitToCanvas(formattedData);
    } catch (error) {
      console.error('Error parsing circuit text:', error);
      alert('Invalid circuit data. Please check the format.');
    }
  }
  

  rotatRight() {
    UndoRedo.rotateAllEle(null,true)
   // EventListner.emit(EVENT_NAME.DEVICE_RIGHT_ROTATE, {});
  }

  rotateLeft() {
    UndoRedo.rotateAllEle(null,false)
    //EventListner.emit(EVENT_NAME.DEVICE_LEFT_ROTATE, {});
  }

  deleteEle() {
    //UndoRedo.deleteOpreation()

    EventListner.emit(EVENT_NAME.DEVICE_DELETEED, {});
    this.handleActivity();
  }

  cloneEle() {
    EventListner.emit(EVENT_NAME.DEVICE_CLONE, {});
  }

  blankCanvas() {
    CircuitJS1.menuPerformed(GWT_COMMAND.ClEAR.name, GWT_COMMAND.ClEAR.value);
   // this.handleActivity();
    //selectItem(GWT_COMMAND.ClEAR);
  }
  cirNameChange(e: any) {
    console.log(e);
    e.target.value = e.target.value.replace(/[^a-zA-Z_]/g, '');
  }
  doUndo(){
     UndoRedo.doUndo();
    //this.handleActivity();
    //  if(this.isUndo && deviceDetailObj.undoItemList.length>0){
    //     const {op,device}=deviceDetailObj.undoItemList.pop();
    //     this.undoRedoOpreation(op,device,true)
    //  }
  }
  doRedo(){
    UndoRedo.doRndo();
  //   if(this.isRedo && deviceDetailObj.redoItemList.length>0){
  //     const {op,device}=deviceDetailObj.redoItemList.pop();
  //     this.undoRedoOpreation(op,device,false)
  //  }
  }

  undoRedoOpreation(op:string,device:Circuit,isUndo:boolean){
    if(op=="new"){
        CircuitJS1.deleteEle(device.id);
        op="delete"
    }
    else if(op=="update"){
         device.setPostion();  
    }
    else if(op == "delete"){
      CircuitJS1.addUndoEle();
      op="new";
    }
    if(isUndo){
      deviceDetailObj.redoItemList.push({op,device})
    }
    else{
      deviceDetailObj.undoItemList.push({op,device})
    }
    EventListner.emit(EVENT_NAME.UNDO_REDO_EVENT,{})
  }
  copyCutEle(isCopy:boolean){
   UndoRedo.copyOrCut(null,isCopy)
   this.toolBarStatus.paste=UndoRedo.copyCutData.data.length>0
   this.handleActivity();
  }
  dublicateEle(){
    UndoRedo.dublicateEle();
  }
  pasteEle(){
    if(this.toolBarStatus.paste){
    UndoRedo.pasteEle();
    }
  }
  swapTerminal(){
    UndoRedo.swapTerminal();
  }
  viewScope(id:any){
    if(this.toolBarStatus.scope>0){
      CircuitJS1.setSimRunning(true)
      CircuitJS1.setScopeById(parseInt(this.toolBarStatus.scope+"") || -1);
    }
  }
  handleActivity(){
    CircuitJS1.setSimRunning(true)
    this.toolBarStatus={
      editSubCir:false,
      scope:-1,
      paste:UndoRedo.copyCutData.data.length>0
    }
    this.isDeviceSeleted = false;
    let cirList=UndoRedo.getSelectedDevice();
    if(cirList.length>0 || UndoRedo.copyCutData.data.length>0){
        this.isDeviceSeleted = true;
    }
    if(cirList.length==1){
      this.singleSelectedItem(cirList[0])
      this.toolBarStatus.scope=parseInt(cirList[0].id+"");      
    }
    else{
      DeviceDetail.callDeviceChanges();
    }
    this.changeDetectorRef.detectChanges();

  }
  singleSelectedItem(item:any){
    if(item){
      this.window["ongwtEvent"](item.id, JSON.stringify(item.basic_info))
    }
  }
  editEle(){
    setTimeout(()=>{
      this.window.open("/schematic?id="+this.deviceComponentId,"_blank");
    },200)
  }
}


@Component({
  selector: 'circuit-form-dailog',
  templateUrl: 'form-dailog.html',
  styleUrls:['form-dailog.scss']
})
export class DialogOverviewExampleDialog {
  title_error=false;
  modelName_error=false;
  type="";
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      this.type=data.type;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveData(){
    let status=true;
    this.title_error=false;
    if(!this.data.cell_name){
       status=false;
       this.title_error=true
    }
    if(status){
    this.dialogRef.close(this.data);
    }
    else{
      this.changeDetectorRef.detectChanges();
    }
    //return false;
  }
  alphNum(e:any){
    e.target.value = e.target.value.replace(/[^a-zA-z0-9]/g,'');
    if(e.target.value.length>30){
      e.target.value=e.target.value.substring(0,10);
    }
  }
  alphbetic(e:any){
    e.target.value = e.target.value.replace(/[^a-zA-z ]/g,'');
    if(e.target.value.length>30){
      e.target.value=e.target.value.substring(0,10);
    }
  }
  clearData(){
    this.dialogRef.close({type:"clear",status:true});
  }

}
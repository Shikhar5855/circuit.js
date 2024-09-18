import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DeviceDetail } from '../Utils/OnCanvasMouseRelease';
import { DeviceCurd, DeviceInfo } from '../Utils/DeviceDetails';
import { convertIntoClone } from '../Utils/device/util';
import { DeviceComponent } from '../Utils/device';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../Utils/Store';
import { convertIntoSubCir } from '../Utils/SubCirUtil';
import { UndoRedo } from '../Utils/UndoRedoOpreation';
import { CircuitConst } from '../Utils/device/Circuit';
import { EVENT_NAME,EventListner } from '../Utils/EventListner';
// import "assets/js/jquery-1.12.4.min.js";
// import "../../../assets/js/jquery-1.12.4.min.js"
// import "../../../assets/js/jquery.nicescroll.min.js"
// import "../../../assets/js/netlist_code.js"
// import "../../../assets/js/on_mouse_release.js"
// import "../../../assets/js/lz-string.min.js"
// import "../../../assets/circuitjs1/circuitjs1.nocache.js"

declare var CircuitJS1: any;
declare var onCanvasMouseRelease:any;
@Component({
  selector: 'app-schematic-main',
  templateUrl: './schematic-main.component.html',
  styleUrls: ['./schematic-main.component.scss'],
})
export class SchematicMainComponent implements OnInit, AfterViewInit, OnDestroy {
  window: any = window;
  document = document;
  jsScript = [
    {
      id: 'crcuitjs_jquery_1',
      path: 'assets/js/jquery-1.12.4.min.js',
    },
    {
      id: 'crcuitjs_jquery_2',
      path: 'assets/js/jquery.nicescroll.min.js',
    },
    {
      id: 'crcuitjs_mouse_release_1',
      path: 'assets/js/on_mouse_release.js',
    },
    {
      id: 'crcuitjs_lz_string_1',
      path: 'assets/js/lz-string.min.js',
    },
    {
      id: 'crcuitjs_main_1',
      path: 'assets/circuitjs1/circuitjs1.nocache.js',
    },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.jsScript.forEach((d) => {
      let s = this.document.getElementById(d.id);
      if (s) {
        s.remove();
        console.log('script ' + d.id + ' is removed');
      }
    });
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.addCanvasInPanel();
  }
  ngOnInit(): void {
    let isReload = localStorage.getItem('is_reload');
    if (isReload && isReload == 'true') {
      localStorage.setItem('is_reload', 'false');
      this.window.location.reload();
    } else {
      localStorage.setItem('is_reload', 'true');
      Promise.all(
        this.jsScript.map((d) => {
          return this.loadFormAssets(d);
        }),
      )
        .then(() => {
          DeviceDetail.init();
         const data= DeviceCurd.getItems();
         const newData:Array<DeviceComponent>= convertIntoClone(data);
         Store.allDevice=newData;
         Store.subCirList=newData.map((d)=>{
            return convertIntoSubCir(d);
         })
         console.log(Store.subCirList)
         DeviceCurd.setSubCircuitData(newData);
        //  const subCirList=newData.map((d:DeviceComponent)=>{
        //    const subStrModel=d.getSubCircuitString();
        //    if(subStrModel){
        //       return {
        //         modelName:d.model_name,
        //         modeStr:subStrModel
        //       }
        //    }
        //    return null;
        //  }).filter((d)=>d)
        //  console.log(subCirList);
          const param:any=this.route.queryParams
          const id=param._value["id"];
          if(id){
                  const selectedDevice:any=newData.find((d:DeviceComponent)=>d.id==id);
                  if(selectedDevice){
                  const arrCir= selectedDevice.device.map((m:any)=>{
                    console.log("div name==>",m.name)
                    return m.toCircuitString()
                  })
                  console.log("arrCir==>",arrCir) 
                  setTimeout(()=>{
                    const str=arrCir.join("\n");
                    CircuitJS1.importCircuit(str);
                    DeviceInfo.id=selectedDevice.id;
                    DeviceInfo.cell_name=selectedDevice.cell_name;
                    selectedDevice.device.forEach((m:any)=>{
                      m.update();
                    })
                    onCanvasMouseRelease(null);
                    //DeviceDetail.init();
                  },1000)
                }
            }
        })
        .catch((err) => {
          console.log('error in script run==>',err);
          
          throw new Error(err);
        });
    }
    this.window.onresize=()=>{
      CircuitJS1.setCanvasSize(window.innerWidth - 350, window.innerHeight - 30);
    }
    //  else{
    //   DeviceDetail.init();
    //  }
  }

  getCanvas() {
    if (this.window['cir_ui_200593']) {
      return this.window['cir_ui_200593'];
    }
    let iframe = document.getElementById('circuitjs1');
    let canvas = null;
    if (iframe) {
      const canvasList = document.getElementsByTagName('canvas');
      for (let i = 0; i < canvasList.length; i++) {
        var c = canvasList[i];
        const title = c.getAttribute('title');
        if (title == 'cir_ui_200593') {
          canvas = c;
          this.window['cir_ui_200593'] = c;
          break;
        }
      }
    }
    if (canvas) {
      let iframe: any = document.getElementById('circuitjs1');
      const div1: any = iframe.nextSibling;
      const div2: any = div1.nextSibling;
      div2.style.width = '0px';
      div2.style.height = '0px';
    }
    CircuitJS1.setCurrentStatus(1);
    return canvas;
  }

  addCanvasInPanel() {
    localStorage.setItem('euroResistors', 'false');
    let timerExe = 50;
    let timer = setInterval(() => {
      timerExe = 2000;
      try {
        const canvas = this.getCanvas();
        if (canvas) {
          CircuitConst.canvas=canvas;
          canvas.height = window.innerHeight - 400;
          canvas.style.height = window.innerHeight - 30 + 'px';
          canvas.style.position = 'relative';
          canvas.style.outline = 'none';
          canvas.addEventListener("click",(e:any)=>{
              console.log("click==>",e);
              EventListner.emit(EVENT_NAME.HANDLE_CLICK_ACTIVITY,{});
          })
          canvas.addEventListener("keydown",(e:any)=>{
           console.log("keyup==>",e)
           if(e.ctrlKey && e.key.toLowerCase()=="v"){
         //   UndoRedo.pasteEle();
           // console.log("Paste here")
           // CircuitJS1.menuPerformed("edit","paste");
           }
          })
          canvas.addEventListener("mousedown", function (e:any) {
            let rect = canvas.getBoundingClientRect();
            let x = Math.ceil(e.clientX - rect.left);
            let y = Math.ceil(e.clientY - rect.top);
            CircuitConst.last_mouse_down_event=e;
            CircuitConst.last_mouse_down_pos={
              x,y
            }
            console.log("mouseDown==>",e);
            //getMousePosition(canvasElem, e);
         });
          CircuitJS1.setCanvasSize(window.innerWidth - 350, window.innerHeight - 30);
          let canvas_container: any = document.getElementById('canvas_ui');
          canvas.setAttribute("title","");
          canvas_container.appendChild(canvas);
          clearInterval(timer);
        }

        // window.addEventListener('wheel', { "passive": false })
      } catch (err) {
        console.log(err);
      }
    }, timerExe);
  }
  title = 'circuit';

  loadFormAssets(src: any) {
    return new Promise((resolve) => {
      const scriptElement = document.createElement('script');
      scriptElement.id = src.id;
      scriptElement.src = src.path;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}

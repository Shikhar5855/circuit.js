import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GraphUtil } from './graphutil';
import { graph_data } from './data';
@Component({
  selector: 'app-circuit-simulation',
  templateUrl: './circuit-simulation.component.html',
  styleUrls: ['./circuit-simulation.component.scss']
})
export class CircuitSimulationComponent implements OnInit,AfterViewInit {
  @ViewChild('canvas_ele') canvasEle?: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
      const canvas:any=this.canvasEle?.nativeElement;
      if(canvas){
        canvas.width=window.innerWidth-200;
        canvas.height=window.innerHeight;
        const ctx=canvas.getContext("2d");
       /// ctx.reset();
        //ctx.restore();
        //ctx.clear(true);
        ctx.clearRect(0, 0, canvas.clientHeight, canvas.clientHeight);
//         ctx.beginPath();
// // ctx.strokeStyle = "red";
// // ctx.lineWidth = 2;
// ctx.moveTo(0, 0);
// ctx.lineTo(30, 30);
// ctx.stroke();
        const grapU=new GraphUtil(ctx,canvas.clientHeight,canvas.clientWidth);
        grapU.init(graph_data.data);
        grapU.drawGraph();
      }
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}

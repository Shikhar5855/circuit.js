function gradient(a:any, b:any) {
    return (b.y-a.y)/(b.x-a.x);
}

function bzCurve(points:any, f:any, t:any,ctx:any) {
    //f = 0, will be straight line
    //t suppose to be 1, but changing the value can control the smoothness too
    if (typeof(f) == 'undefined') f = 0.3;
    if (typeof(t) == 'undefined') t = 0.6;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    var m = 0;
    var dx1 = 0;
    var dy1 = 0;

    var preP = points[0];
    for (var i = 1; i < points.length; i++) {
        var curP = points[i];
        let nexP = points[i + 1];
        let dx2,dy2;
        if (nexP) {
            m = gradient(preP, nexP);
            dx2 = (nexP.x - curP.x) * -f;
            dy2 = dx2 * m * t;
        } else {
            dx2 = 0;
            dy2 = 0;
        }
        ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
        dx1 = dx2;
        dy1 = dy2;
        preP = curP;
    }
    ctx.stroke();
}

// Generate random data
// var lines = [];
// var X = 10;
// var t = 40; //to control width of X
// for (var i = 0; i < 100; i++ ) {
//     const Y = Math.floor((Math.random() * 300) + 50);
//     p = { x: X, y: Y };
//     lines.push(p);
//     X = X + t;
// }

function convertIntoPoint(col:any,data:any,totalD:any,color="blue"){

    const totalC= col.length;

    const stepD=500/totalD;
	const stepC=parseInt((totalC/1000)+"")
	const points=[];

	for(let i=0;i<1000;i++){
		const x= i;
        const y=300-Math.round(data[stepC*i]*stepD);
        points.push({x,y,xo:(stepC*i),yo:data[stepC*i]});	
	}
    console.log(data,points);
    // ctx.setLineDash([0]);
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = color;
    // bzCurve(points, 0.2, 1);
}

function convertIntoTime(n:number) {
    return Math.round(n*1000000);
  }
  function getTotalD([c,...da]:any){
      let totald=-1;
	  da.forEach((d:any)=>{
	    const maxD=Math.max(...d);
        const minD=Math.min(...d);
        const totalD=Math.abs(maxD-minD);
		if(totald<totalD){
			totald=totalD
		}
	  })
	  return totald;
  }
let drawGraph = ({ col, data }:any) => {
    let obj:any = [];
    col.forEach((k:any) => {
      obj.push([]);
    });
    data.forEach((dd:any) => {
      dd.forEach((cc:any, i:any) => {
        if (i == 0) {
          const num = parseFloat(cc);
          obj[i].push(convertIntoTime(num));
        } else {
          const num = parseFloat(cc);
          obj[i].push(num);
        }
      });
    });
	const totalD=getTotalD([[],obj[3]]);
    // convertIntoPoint(obj[0],obj[1],totalD,"red")
	// convertIntoPoint(obj[0],obj[2],totalD,"blue")
	//convertIntoPoint(obj[0],obj[3],totalD,"green")

   // console.log('sim result==>', Math.min(...obj[3]));

  };




  export class GraphUtil{
    data:any={};
    timeLineType="u";
    timeLine:Array<Number>=[]
    col:Array<{name:string,status:boolean}>=[];
    ctx:any;
    axisDetails:any={};
    metaData={
        total_y_distance:0,
        max_y_distance:0,
        min_y_distance:0,
        stepY:0,
        stepX:0,
        height:550,
        width:1200,
        gap:50,
        zeroAxis:0
    }
    constructor(ctx:any,height:any,width:any){
       this.ctx=ctx;
       this.metaData.height=height;
       this.metaData.width=width;
    }
    //graphData:any={};
    bzCurve(points:any, f:any, t:any) {
        if (typeof(f) == 'undefined') f = 0.3;
        if (typeof(t) == 'undefined') t = 0.6;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        var m = 0;
        var dx1 = 0;
        var dy1 = 0;
        var preP = points[0];
        for (var i = 1; i < points.length; i++) {
            var curP = points[i];
            let nexP = points[i + 1];
            let dx2,dy2;
            if (nexP) {
                m = gradient(preP, nexP);
                dx2 = (nexP.x - curP.x) * -f;
                dy2 = dx2 * m * t;
            } else {
                dx2 = 0;
                dy2 = 0;
            }
            this.ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
            dx1 = dx2;
            dy1 = dy2;
            preP = curP;
        }
        this.ctx.stroke();
    }
    convertIntoGraphPoint(key:any,data:any){
        const points=[];
        for(let i=0;i<1000;i++){
            const x= i;
            const y=300-Math.round(data[this.metaData.stepX*i]*this.metaData.stepY);
            points.push({x,y,xo:(this.metaData.stepX*i),yo:data[this.metaData.stepX*i]});	
        }
        this.axisDetails[key]=points;
    }
    getMaximumX(da:any){
        let totald=-1;
        let obj={
            max:0,
            min:0,
            totalD:0
        }
        da.forEach((d:any)=>{
          const maxD=Math.max(...d);
          const minD=Math.min(...d);
          const totalD=Math.abs(maxD-minD);
          if(totald<totalD){
              totald=totalD
              obj.max=maxD;
              obj.min=minD;
              obj.totalD=totald;
          }
        })
        return obj;
    }
    convertIntoTime(n:number) {
        if(this.timeLineType=="n")
            return Math.round(n*1000000000);
        if(this.timeLineType=="u")
            return Math.round(n*1000000);
        if(this.timeLineType=="u")
            return Math.round(n*1000);
        return n;
    }
    init({ col, data }:any){
        let obj:any = [];
        col.forEach((k:any) => {
          obj.push([]);
        });
        data.forEach((dd:any) => {
          dd.forEach((cc:any, i:any) => {
            if (i == 0) {
              const num = parseFloat(cc);
              obj[i].push(convertIntoTime(num));
            } else {
              const num = parseFloat(cc);
              obj[i].push(num);
            }
          });
        });
        col.forEach((d:any,i:number)=>{
           if(i==0){
            this.timeLine=obj[i];
           }
           else{
             this.col.push({name:d,status:true})
             this.data[d]=obj[i];
           }
        })
      };
      setZeroAxis(){
         if(this.metaData.min_y_distance>=0){
             this.metaData.zeroAxis=this.metaData.height - this.metaData.gap;
         }
         else if(this.metaData.max_y_distance<=0){
              this.metaData.zeroAxis=this.metaData.gap;
         }
         else{
            const max=Math.abs(this.metaData.max_y_distance);
            const min =Math.abs(this.metaData.min_y_distance);
            const ratio=(this.metaData.height-(2*this.metaData.gap))/this.metaData.total_y_distance;
            this.metaData.zeroAxis=parseInt((ratio*max)+"")+this.metaData.gap;
            
         }
      }
      draw_x_axix(){
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#fff";
        this.ctx.moveTo(0,this.metaData.zeroAxis);
        this.ctx.lineTo(this.metaData.width,this.metaData.zeroAxis);
        this.ctx.stroke();
    // bzCurve(points, 0.2, 1);
      }
      
      draw_y_axix(){
        this.ctx.beginPath();
        // this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#fff";
        this.ctx.moveTo(this.metaData.gap,0);
        this.ctx.lineTo(this.metaData.gap,this.metaData.height);
        this.ctx.stroke();
      }
      drawGraph(){
        const validCol=this.col.filter((d)=>d.status);
        let gdata=validCol.map(({name})=>{
            this.convertIntoGraphPoint(name,this.data[name])
             return this.data[name];
        })
        const {max,min,totalD}= this.getMaximumX(gdata);
        this.metaData.total_y_distance=totalD;
        this.metaData.max_y_distance=max;
        this.metaData.min_y_distance=min;
        const totalC= this.timeLine.length;
        const stepD=(this.metaData.height-(2*this.metaData.gap))/totalD;
        const stepC=parseInt((totalC/(this.metaData.width-(2*this.metaData.gap)))+"")
        this.metaData.stepX=stepC;
        this.metaData.stepY=stepD;
        this.setZeroAxis();
        this.draw_x_axix();
        this.draw_y_axix();
      }
  }


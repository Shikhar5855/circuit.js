import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnChanges {

  constructor() { }

  ngOnInit(): void {
  }
 ngOnChanges(props:any){
  console.log("change")
 }
  trimValue(e:any,type:'num'|'string'){
    if(type=="string")
      e.target.value = e.target.value.replace(/[^a-zA-Z ]/g,'');
    else if(type=="num")
      e.target.value = e.target.value.replace(/[^0-9]/g,'');
  }
  trimString(e:any){
       e.target.value = e.target.value?.trim()
  }

}

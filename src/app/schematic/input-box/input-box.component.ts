import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import { UndoRedo } from '../Utils/UndoRedoOpreation';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('input_ele') inp?: ElementRef;
  @Input() value?: string;
  @Input() label?: string="";
  @Input() is_undo?:boolean=true;
  @Output() valueChange = new EventEmitter<string>();
  @Output() keyup = new EventEmitter<string>();
  @Input() error?: string="";
  constructor() {}
  ngOnChanges(changes: any): void {
    if (changes.value.currentValue) {
        this.value = changes.value.currentValue;
        const inputText: any = this.inp?.nativeElement;
        if(inputText){
          inputText.value = this.value;
        }
      
        //this.value = e.target.value;
       // this.valueChange.emit(this.value);
    }
    else{
        this.error="*Required"
    }
    if (changes.error) {
      this.error=changes.error.currentValue;
    }
  }

  ngAfterViewInit(): void {
    // console.log("hhhhh==>",this.value)
    // const ele:any=this.inp?.nativeElement;
    // const inputText=ele.contentWindow.document.getElementsByTagName("input")[0];
    // inputText.value=this.value;
    // ele.addEventListener("change",(e:any)=>{
    //    this.value=e.target.value;
    //    this.valueChange.emit(ele.value)
    // })
    // ele.value=this.value;
    // ele.addEventListener("keyup",(e:any)=>{
    //   if(e.key=="Backspace"){
    //      ele.value=e.target.value.substring(0,e.target.value.length-1);
    //   }
    //   else if(e.key.length==1){
    //     ele.value+=e.key;
    //   }
    //   //this.value=e.target.value;
    //   this.valueChange.emit(ele.value)
    //    //console.log("e==>",e.target);
    // });
    //this.loadIframe();
    const inputText: any = this.inp?.nativeElement;
    inputText.value = this.value;
  }
  loadIframe() {
    const inputText: any = this.inp?.nativeElement;
    //const inputText = ele.contentWindow.document.getElementsByTagName('input')[0];
    //inputText.style="margin:0px;"
    inputText.value = this.value;

    inputText.addEventListener('change', (e: any) => {
      this.value = e.target.value;
      this.valueChange.emit(this.value);
    });

    inputText.addEventListener('keyup', (e: any) => {
      this.value = e.target.value;
      // this.valueChange.emit(this.value);
      // this.keyup.emit(e);
    });
  }
  keyUpEvent(e:any){
    this.value = e.target.value;
    //this.valueChange.emit(this.value);
    this.keyup.emit(e); 
  }
  valChange(e:any){
    this.error="";
    this.value = e.target.value;
    this.valueChange.emit(this.value);
    if(this.value){
      if(this.is_undo){
        UndoRedo.addHistry(null)
      }
    }
    else{
      this.error="*Required"
    }
  }
  ngOnInit(): void {}
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}

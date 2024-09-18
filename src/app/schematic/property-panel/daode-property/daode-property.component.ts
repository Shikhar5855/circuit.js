import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daode-property',
  templateUrl: './daode-property.component.html',
  styleUrls: ['./daode-property.component.scss'],
})
export class DaodePropertyComponent {
  @Input() cloneElm: any;

  inpuObj = {
    device_name: '',
  };
}

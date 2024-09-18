import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { DeviceDetail } from './schematic/Utils/OnCanvasMouseRelease';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
   // DeviceDetail.init();
  }
  title = 'circuit';

}

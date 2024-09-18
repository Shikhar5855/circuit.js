import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
declare var CircuitJS1: any;
declare var document: any;
@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.scss'],
})
export class CanvasPanelComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    let globleEle;
  }
}

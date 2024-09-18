import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchematicMainComponent } from './schematic-main/schematic-main.component';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { PropertyPanelComponent } from './property-panel/property-panel.component';
import { CanvasPanelComponent } from './canvas-panel/canvas-panel.component';
import { RisitorPropertyComponent } from './property-panel/risitor-property/risitor-property.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { PortDetailComponent } from './property-panel/port-detail/port-detail.component';
import { VoltagePropertyComponent } from './property-panel/voltage-property/voltage-property.component';
import { GatePropertyComponent } from './property-panel/gate-property/gate-property.component';
import { CapacitorPropertyComponent } from './property-panel/capacitor-property/capacitor-property.component';
import { InductorPropertyComponent } from './property-panel/inductor-property/inductor-property.component';
import { NmosPropertyComponent } from './property-panel/nmos-property/nmos-property.component';
import { NpnPropertyComponent } from './property-panel/npn-property/npn-property.component';
import { WirePropertyComponent } from './property-panel/wire-property/wire-property.component';
import {DialogOverviewExampleDialog} from "./top-menu/top-menu.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CircuitSimulationComponent } from './circuit-simulation/circuit-simulation.component';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';

const drawerRoutes: any = [
  {
    path: 'schematic',
    component: SchematicMainComponent,
  },
  {
    path:"simulation",
    component:CircuitSimulationComponent
  }
];

@NgModule({
  declarations: [
    SchematicMainComponent,
    SideMenuComponent,
    TopMenuComponent,
    PropertyPanelComponent,
    CanvasPanelComponent,
    RisitorPropertyComponent,
    InputBoxComponent,
    PortDetailComponent,
    VoltagePropertyComponent,
    CapacitorPropertyComponent,
    GatePropertyComponent,
    InductorPropertyComponent,
    NmosPropertyComponent,
    NpnPropertyComponent,
    WirePropertyComponent,
    DialogOverviewExampleDialog,
    CircuitSimulationComponent
  ],
  exports: [
    SchematicMainComponent,
    SideMenuComponent,
    TopMenuComponent,
    PropertyPanelComponent,
    CanvasPanelComponent,
    RisitorPropertyComponent,
    InputBoxComponent,
    PortDetailComponent,
    VoltagePropertyComponent,
    CapacitorPropertyComponent,
    GatePropertyComponent,
    InductorPropertyComponent,
    NmosPropertyComponent,
    NpnPropertyComponent,
    WirePropertyComponent,
    DialogOverviewExampleDialog,
    RouterModule,

  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,    
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    RouterModule.forChild(drawerRoutes)
  ],
})
export class SchematicModule {}

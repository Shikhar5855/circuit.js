import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SchematicModule } from './schematic/schematic.module';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestRouteComponent } from './test-route/test-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'circuit',
        clientId: 'circuit-ui'
      },
      initOptions: {
        onLoad: 'login-required',  // allowed values 'login-required', 'check-sso';
        flow: "standard"  
      }
    });
}

const drawerRoutes:any = [
  {
    path:"",
    component:TestRouteComponent
  },
  {
    path: '',
    loadChildren: () => import('../app/schematic/schematic.module').then(m => m.SchematicModule)
  }
];
@NgModule({
  declarations: [
    AppComponent,
    TestRouteComponent
  ],
  imports: [
    SchematicModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(drawerRoutes),
    BrowserAnimationsModule,
    //KeycloakAngularModule
  ],
  exports:[
    RouterModule,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

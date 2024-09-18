import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    TestComponent,
    AppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class EmptyModule { }

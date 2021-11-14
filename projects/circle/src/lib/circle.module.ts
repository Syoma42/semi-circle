import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CircleComponent } from './circle.component';



@NgModule({
  declarations: [
    CircleComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  exports: [
    CircleComponent
  ]
})
export class CircleModule { }

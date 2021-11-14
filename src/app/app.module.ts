import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CircleModule } from 'projects/circle/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CircleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

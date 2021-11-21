import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { valueOptions } from 'projects/circle/src/models/valueOptions';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'semi-circle';
  theme: Theme = 'dark-theme'

  valueOpt: valueOptions = {
    curVal: 43,
    minVal: 40,  
    midVal: 50, 
    maxVal: 70, 
    style: '0.22',  
    minZoneCol: '#00FF00',
    midZoneCol: '#FFFF00',
    maxZoneCol: '#BE061C',
    minStrokeCol: '#00ff00',
    midStrokeCol: '#FFFF00',
    maxStrokeCol: '#BE061C'
  };

  public styles = ['0.22', '0.25', '0.39', '0.5']


  constructor (
    private service: DataServiceService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {}


  ngOnInit(): void {
    this.getData()
    this.setTheme()
    // this.service.getClick()
  }

  // theme

  setTheme = (): void => {
    this.renderer.addClass(this.document.body, this.theme)
  }

  switchTheme(): void {
    this.document.body.classList.replace(
      this.theme, 
      this.theme === 'light-theme' ? (this.theme = 'dark-theme') 
      : (this.theme = 'light-theme')
    )
  }

  // data

  getData() {
    this.service.listen('getData').subscribe((data) => {
      // @ts-ignore
      return this.valueOpt.curVal = data  
  })
  }

  

  clickData() {
    this.service.getClick()
  }

  unClickData() {
    this.service.unGetClick()
  }

}

export type Theme = 'dark-theme' | 'light-theme' 



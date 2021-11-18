import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from './services/data-service.service';
import { zoneOptions } from 'projects/circle/src/models/zoneOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'semi-circle';
  checkInput: string = 'Hello Input'

  zoneOpt: zoneOptions = {
  start2: 100
  };

  exform: FormGroup;
  curRad: number;
  minRad: number;
  midRad: number;
  maxRad: number = 220;
  curColor: string;
  valueColor: string;
  numberColor: string;
  start: number = 270;
  end: number;
  valueMargin: number = 100;
  numberValueMargin: number = 150;
  scaleMarginX: number = 155;


  constructor (private fb: FormBuilder,
              private service: DataServiceService) {}

  ngOnInit(): void {
    this.exform = this.fb.group({
      'curVal' : [43, Validators.required],
      'minVal' : [25, Validators.required],
      'midVal' : [50, Validators.required],
      'maxVal' : [70, Validators.required],
      'style' : ['0.22', Validators.required],
      'minZoneCol' : ['#171825', Validators.required],
      'midZoneCol' : ['#FFFF00', Validators.required],
      'maxZoneCol' : ['#BE061C', Validators.required],
      'minStrokeCol': ['#00ff00', Validators.required],
      'midStrokeCol': ['#FFFF00', Validators.required],
      'maxStrokeCol': ['#BE061C', Validators.required]
    }) 
  }
  ngAfterViewInit() {}
  ngAfterViewChecked() {}

  // Getters

  get curVal() {
    return this.exform.get('curVal');
  }

  get minVal() {
    return this.exform.get('minVal');
  }

  get midVal() {
    return this.exform.get('midVal');
  }

  get maxVal() {
    return this.exform.get('maxVal');
  }

  get style() {
    return this.exform.get('style')
  }

  get minZoneCol() {
    return this.exform.get('minZoneCol')
  }

  get midZoneCol() {
    return this.exform.get('midZoneCol')
  }

  get maxZoneCol() {
    return this.exform.get('maxZoneCol')
  }

  get minStrokeCol() {
    return this.exform.get('minStrokeCol')
  }

  get midStrokeCol() {
    return this.exform.get('midStrokeCol')
  }

  get maxStrokeCol() {
    return this.exform.get('maxStrokeCol')
  }
}

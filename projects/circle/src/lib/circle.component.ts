import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zoneOptions } from '../models/zoneOptions';
import { CircleService } from './circle.service';

@Component({
  selector: 'lib-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() zoneOpt: zoneOptions;

  private context: CanvasRenderingContext2D;

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
  
  
  public styles = ['0.22', '0.25', '0.39', '0.5']
  
  
  constructor (private fb: FormBuilder
              //  private service: CircleService
  ) {}


  ngOnInit(): void {
    this.exform = this.fb.group({
      'curVal' : [43, Validators.required],
      'minVal' : [25, Validators.required],
      'midVal' : [50, Validators.required],
      'maxVal' : [70, Validators.required],
      'style' : ['0.22', Validators.required],
      'minZoneCol' : ['#00ff00', Validators.required],
      'midZoneCol' : ['#FFFF00', Validators.required],
      'maxZoneCol' : ['#BE061C', Validators.required],
      'minStrokeCol': ['#00ff00', Validators.required],
      'midStrokeCol': ['#FFFF00', Validators.required],
      'maxStrokeCol': ['#BE061C', Validators.required]
    }) 

    // this.service.listen('test event').subscribe((data) => {
    //   console.log(data)
    // }) 
    
    
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.newConfirm()
    console.log(this.zoneOpt)
  }

  ngAfterViewChecked() : void {
    this.newConfirm()
  }


  // get input values

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

  // live update

  newConfirm(): void {
    this.clearCanv()
    this.setZone()
    this.semiCircle()
  }

  clearCanv(): void {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  setZone(): void {
    this.valueColor = this.curColor
    if (this.curVal?.value <= this.minVal?.value) { // green
      this.curColor = this.minZoneCol?.value
    } else if (this.curVal?.value > this.midVal?.value) { // red
      this.curColor = this.maxZoneCol?.value
    } else {                                      // yellow
      this.curColor = this.midZoneCol?.value
    }
  }
  
  // draw semi-circle

  semiCircle(): void {
    this.setStyle()
    this.currentValue()
    this.transparentSection()
    this.setScaleMargin()
    this.setValueMargin()
    this.strokesNumbers()
  }

  setStyle(): void {
    switch(this.style?.value) {
      case '0.22':
        this.end = 350
        break
      case '0.25':
        this.end = 360
        break
      case '0.39':
        this.end = 410
        break
      case '0.5':
        this.end = 450
        break
      default:
        this.end = 350
    }
  }

  currentValue(): void {
    this.curRad = this.maxRad * (this.curVal?.value / this.maxVal?.value);

    if (this.curRad > 220) {
      this.curRad = 220
    }
    
    this.context.beginPath()
    this.context.fillStyle = this.curColor;
    this.context.moveTo(175, 250);
    this.context.arc(175, 250, this.curRad, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false);
    this.context.fill();
  }

  transparentSection(): void {
    this.context.beginPath();
    this.context.fillStyle = 'rgb(38, 42, 54)';
    this.context.moveTo(175, 250);
    this.context.arc(175, 250, 50, this.start * Math.PI / 180.0, (this.end + 5) * Math.PI / 180.0, false);
    this.context.fill();
  }

  setScaleMargin(): void {
    if (this.minVal?.value > 999 || this.midVal?.value > 999 || this.maxVal?.value > 999) {
      this.scaleMarginX = 150
    }
  }

  setValueMargin(): void {
    if (this.curVal?.value > 999) {
      this.valueMargin = 50
      this.numberValueMargin = 100
    } else {
      this.valueMargin = 100
      this.numberValueMargin = 150
    }
  }

  strokesNumbers(): void {
    this.minRad = this.maxRad * (this.minVal?.value / this.maxVal?.value);
    this.midRad = this.maxRad * (this.midVal?.value / this.maxVal?.value);
    // numbers min -> max
    this.drawValue('10px arial', this.minStrokeCol?.value, this.minVal?.value, this.scaleMarginX, 250 - this.minRad)
    this.drawValue('10px arial', this.midStrokeCol?.value, this.midVal?.value, this.scaleMarginX, 250 - this.midRad)
    this.drawValue('10px arial', this.maxStrokeCol?.value, this.maxVal?.value, this.scaleMarginX, 250 - this.maxRad)
    // strokes min -> max
    this.drawStroke(this.minRad, this.minStrokeCol?.value)
    this.drawStroke(this.midRad, this.midStrokeCol?.value)
    this.drawStroke(this.maxRad, this.maxStrokeCol?.value)
    // current value
    this.drawValue('20px arial', this.valueColor, 'ROP', this.valueMargin, 260)
    this.drawValue('36px arial', this.valueColor, this.curVal?.value, this.numberValueMargin, 260)
  }


  drawValue(font: string, color: string, value: string, marginX: number, marginY: number): void {
    this.context.beginPath()
    this.context.font = font
    this.context.fillStyle = color
    this.context.fillText(value, marginX, marginY)
  }

  drawStroke(radius: number, color: string): void {

    if (this.minRad < 50) {
      radius = 0
    }

    this.context.beginPath()
    this.context.arc(175, 250, radius, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false)
    this.context.strokeStyle = color
    this.context.lineWidth = 2
    this.context.stroke()
  }
}

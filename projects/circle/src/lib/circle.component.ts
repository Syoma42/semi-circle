import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D;

  exform: FormGroup;
  curRad: number;
  minRad: number;
  midRad: number;
  maxRad: number = 220;
  curColor: string;
  valueColor: string;
  numberColor: string = 'yellow';
  minStrokeColor: string;
  midStrokeColor: string;
  maxStrokeColor: string;
  start: number = 270;
  end: number;
  valueMargin: number = 100;
  numberValueMargin: number = 150;
  scaleMarginX: number = 155;
  
  
  
  public styles = ['0.22', '0.25', '0.39', '0.5']
  
  
  constructor (private fb: FormBuilder) {}


  ngOnInit(): void {
    this.exform = this.fb.group({
      'curVal' : [43, Validators.required],
      'minVal' : [25, Validators.required],
      'midVal' : [50, Validators.required],
      'maxVal' : [70, Validators.required],
      'style' : ['0.25', Validators.required],
      'minZoneCol' : ['#171825', Validators.required],
      'midZoneCol' : ['#FFFF00', Validators.required],
      'maxZoneCol' : ['#BE061C', Validators.required]
    }) 
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.newConfirm()
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

  // form functions

  newConfirm(): void {
    if (this.curVal?.value <= this.minVal?.value) {  // green zone
      this.clearCanv()
      this.greenZone()
      this.semiCircle()
    } else if (this.curVal?.value > this.midVal?.value) {  // red zone
      this.clearCanv()
      this.redZone()
      this.semiCircle()
    } else {  // yellow zone
      this.clearCanv()
      this.yellowZone()
      this.semiCircle()
    }
  }

  clearCanv(): void {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  greenZone(): void {
    this.curColor = this.minZoneCol?.value;
    this.valueColor = 'green';
    this.minStrokeColor = 'yellow';
    this.midStrokeColor = this.minStrokeColor;
    this.maxStrokeColor = this.midStrokeColor;
  }

  yellowZone(): void {
    this.curColor = this.midZoneCol?.value;
    this.valueColor = this.curColor;
    this.minStrokeColor = '#171825';
    this.midStrokeColor = '#FFFF00';
    this.maxStrokeColor = '#FFFF00';
  }

  redZone(): void {
    this.curColor = this.maxZoneCol?.value;
    this.valueColor = this.curColor;
    this.minStrokeColor = 'rgb(23, 24, 37)';
    this.midStrokeColor = this.minStrokeColor;
    this.maxStrokeColor = '#FFFF00';
  }
  
  // draw semi-circle

  semiCircle(): void {
    this.setStyle()
    this.currentValue();
    this.transparentSection();
    this.setScaleMargin()
    this.strokesNumbers();
    this.setValueMargin();
    this.numberValue();
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
    this.context.arc(175, 250, 50, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false);
    this.context.fill();
  }

  strokesNumbers(): void {
    this.minRad = this.maxRad * (this.minVal?.value / this.maxVal?.value);
    this.midRad = this.maxRad * (this.midVal?.value / this.maxVal?.value);
    // min value
    this.context.beginPath();
    this.context.font = '10px arial';
    this.context.fillStyle = this.numberColor;
    this.context.fillText(`${this.minVal?.value}`, this.scaleMarginX, 250 - this.minRad);
    // min line
    this.context.beginPath();
    this.context.arc(175, 250, this.minRad, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false);
    this.context.strokeStyle = this.minStrokeColor;
    this.context.lineWidth = 2;
    this.context.stroke()
    // mid value
    this.context.beginPath();
    this.context.font = '10px arial';
    this.context.fillStyle = this.numberColor;
    this.context.fillText(`${this.midVal?.value}`, this.scaleMarginX, 250 - this.midRad);
    // mid line 
    this.context.beginPath();
    this.context.arc(175, 250, this.midRad, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false);
    this.context.strokeStyle = this.midStrokeColor;
    this.context.lineWidth = 2;
    this.context.stroke()
    // max value
    this.context.beginPath();
    this.context.font = '10px arial';
    this.context.fillStyle = this.numberColor;
    this.context.fillText(`${this.maxVal?.value}`, this.scaleMarginX, 30);
    // max line
    this.context.beginPath();
    this.context.arc(175, 250, this.maxRad, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false);
    this.context.strokeStyle = this.maxStrokeColor;
    this.context.lineWidth = 2;
    this.context.stroke()
  }

  numberValue(): void {
    // value section
    this.context.beginPath();
    this.context.font = '20px arial'
    this.context.fillStyle = this.valueColor;
    this.context.fillText('ROP', this.valueMargin, 260)
    // number section
    this.context.beginPath();
    this.context.font = '36px arial';
    this.context.fillStyle = this.valueColor;
    this.context.fillText(`${this.curVal?.value}`, this.numberValueMargin, 260);
  }

  setStyle(): void {
    if (this.style?.value === '0.22') {
      this.end = 350
    } else if (this.style?.value === '0.25') {
      this.end = 360
    } else if (this.style?.value === '0.39') {
      this.end = 410
    } else if (this.style?.value === '0.5') {
      this.end = 450
    } else {
      this.end = 350;
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

  setScaleMargin(): void {
    if (this.minVal?.value > 999 || this.midVal?.value > 999 || this.maxVal?.value > 999) {
      this.scaleMarginX = 150
    }
  }
}

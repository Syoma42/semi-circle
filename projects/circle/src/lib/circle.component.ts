import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Theme } from 'src/app/app.component';
import { valueOptions } from '../models/valueOptions';


@Component({
  selector: 'lib-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  
  @Input() valueOpt: valueOptions;
  @Input() theme: Theme;

  private context: CanvasRenderingContext2D;

  curRad: number;
  minRad: number;
  midRad: number;
  maxRad: number = 170;
  curColor: string;
  valueColor: string;
  numberColor: string;
  start: number = 270;
  end: number;
  valueMargin: number = 100;
  numberValueMargin: number = 150;
  scaleMarginX: number = 155;
  transparentCol: string;
    
  
  constructor () {}


  ngOnInit(): void {  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  ngAfterViewChecked() : void {
    this.newConfirm()
  }

  ngAfterContentChecked(): void {
    this.validation()
  }

  // validation

  validation(): void {
    if (this.valueOpt.minVal >= this.valueOpt.midVal) {  // min >= mid
      // alert('Minimum value can not exceed middle value')
      this.valueOpt.minVal = this.valueOpt.midVal - 1
    } else if (this.valueOpt.midVal >= this.valueOpt.maxVal) { // mid >= max
      // alert('Middle value can not exceed maximum value')
      this.valueOpt.midVal = this.valueOpt.maxVal - 1
    } 
  }

  // live update

  newConfirm(): void {
    this.setTheme()
    this.clearCanv()
    this.setZone()
    this.semiCircle()
  }
  
  clearCanv(): void {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  setZone(): void {
    if (this.valueOpt.curVal <= this.valueOpt.minVal) { // green
      this.curColor = this.valueOpt.minZoneCol
    } else if (this.valueOpt.curVal > this.valueOpt.midVal) { // red
      this.curColor = this.valueOpt.maxZoneCol
    } else {                                      // yellow
      this.curColor = this.valueOpt.midZoneCol
    }
    this.valueColor = this.curColor
  }

  setTheme(): void {
    this.theme === 'dark-theme' ? this.transparentCol = 'rgb(38, 42, 54)' : this.transparentCol = 'white'
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
    switch(this.valueOpt.style) {
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
    this.curRad = this.maxRad * (this.valueOpt.curVal / this.valueOpt.maxVal) + 50;

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
    this.context.fillStyle = this.transparentCol;
    this.context.moveTo(175, 250);
    this.context.arc(175, 250, 51, this.start * Math.PI / 180.0, (this.end + 5) * Math.PI / 180.0, false);
    this.context.fill();
  }

  setScaleMargin(): void {
    if (this.valueOpt.minVal > 999 || this.valueOpt.midVal > 999 || this.valueOpt.maxVal > 999) {
      this.scaleMarginX = 150
    }
  }

  // setValueMargin(): void {
  //   if (this.valueOpt.curVal > 999) {
  //     this.valueMargin = 50
  //     this.numberValueMargin = 100
  //   } else {
  //     this.valueMargin = 100
  //     this.numberValueMargin = 150
  //   }
  // }

  // setValueMargin(): void {
  //   if (this.valueOpt.curVal > 999 && this.valueOpt.nameVal.length > 3) {
  //     this.valueMargin = 5
  //     this.numberValueMargin = 100
  //   } else if (this.valueOpt.curVal > 999 || this.valueOpt.nameVal.length > 3) {
  //     this.valueMargin = 50
  //     this.numberValueMargin = 100
  //   } else {
  //     this.valueMargin = 100
  //     this.numberValueMargin = 150
  //   }
  // }

  setValueMargin(): void {
    if (this.valueOpt.curVal > 999 && this.valueOpt.nameVal.length > 3 ) {
      this.valueMargin = 5
      this.numberValueMargin = 100
    } else if (this.valueOpt.curVal > 999) {
      this.valueMargin = 55
      this.numberValueMargin = 100
    } else if (this.valueOpt.nameVal.length > 3) {
      this.valueMargin = 100 - (this.valueOpt.nameVal.length - 3) * 20
    } else {
      this.valueMargin = 100
      this.numberValueMargin = 150
    }
  }

  setValueMargin2(): void {
    
  }


  strokesNumbers(): void {
    this.minRad = this.maxRad * (this.valueOpt.minVal / this.valueOpt.maxVal);
    this.midRad = this.maxRad * (this.valueOpt.midVal / this.valueOpt.maxVal);
    // numbers min -> max
    this.drawValue('10px arial', this.valueOpt.minStrokeCol, `${this.valueOpt.minVal}`, this.scaleMarginX, 200 - this.minRad)
    this.drawValue('10px arial', this.valueOpt.midStrokeCol, `${this.valueOpt.midVal}`, this.scaleMarginX, 200 - this.midRad)
    this.drawValue('10px arial', this.valueOpt.maxStrokeCol, `${this.valueOpt.maxVal}`, this.scaleMarginX, 200 - this.maxRad)
    // strokes min -> max
    this.drawStroke(this.minRad, this.valueOpt.minStrokeCol)
    this.drawStroke(this.midRad, this.valueOpt.midStrokeCol)
    this.drawStroke(this.maxRad, this.valueOpt.maxStrokeCol)
    // current value
    this.drawValue('20px arial', this.valueColor, `${this.valueOpt.nameVal}`, this.valueMargin, 260)
    this.drawValue('36px arial', this.valueColor, `${this.valueOpt.curVal}`, this.numberValueMargin, 260)
  }


  drawValue(font: string, color: string, value: string, marginX: number, marginY: number): void {
    this.context.beginPath()
    this.context.font = font
    this.context.fillStyle = color
    this.context.fillText(value, marginX, marginY)
  }

  drawStroke(radius: number, color: string): void {
    this.context.beginPath()
    this.context.arc(175, 250, radius + 50, this.start * Math.PI / 180.0, this.end * Math.PI / 180.0, false)
    this.context.strokeStyle = color
    this.context.lineWidth = 2
    this.context.stroke()
  }
}

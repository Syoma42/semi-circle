import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { valueOptions } from 'projects/circle/src/models/valueOptions';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'semi-circle';

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


  constructor (private service: DataServiceService) {}


  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.listen('getData').subscribe((data) => {
      // @ts-ignore
      return this.valueOpt.curVal = data  
  })
  }

  

}



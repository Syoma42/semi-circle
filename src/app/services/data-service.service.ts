import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  socket: any;
  readonly url: string = 'ws://localhost:3000';
  val = new Subject<number>()
  

  constructor() { 
    this.socket = io(this.url);
  }

  listen(eventName : string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)
      })
    })
  }

  getClick() {
    this.socket.emit('getClick')
  }

  unGetClick() {
    this.socket.emit('unGetClick')
  }
}

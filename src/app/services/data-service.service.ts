import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  socket: any;
  readonly url: string = 'ws://localhost:3000';
  subject = new BehaviorSubject<number>(30)
  
  constructor() { 
    this.socket = io(this.url);
    this.listen('getData').subscribe((data) => {
    this.subject.next(data as number)
  })
  }

  listen(eventName : string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: number) => {
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

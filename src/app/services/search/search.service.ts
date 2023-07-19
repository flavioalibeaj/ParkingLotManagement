import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  dataEmitter = new EventEmitter<string>()

  constructor() { }

  dataPassingEvent(data: string) {
    this.dataEmitter.emit(data)
  }
}

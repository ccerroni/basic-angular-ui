import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public url: 'http://localhost:3200/api';
  constructor() { }
}

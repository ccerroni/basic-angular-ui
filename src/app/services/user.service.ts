import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from "./global.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
     
  ) { }

  register() {
    console.log('I am in the service');
  }
}

import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  url: string;
  identity: string;
  token:string;
  constructor(
     private globalService: GlobalService,
     private _http: HttpClient
  ) { 
    this.url = globalService.url;
  }

  addAnimal(token:string ,animal:any) {
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    );

    return this._http.post(`${this.url}/animal/add`, params, {headers: headers});
  }
}


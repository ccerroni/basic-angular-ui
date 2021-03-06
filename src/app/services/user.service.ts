import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from "./global.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  identity: string;
  token:string;
  constructor(
     private globalService: GlobalService,
     private http: HttpClient
  ) { 
    this.url = globalService.url;
  }

  register(userToRegister) {
    userToRegister.role = 'ROLE_USER';
    let params= JSON.stringify(userToRegister);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/user/register`, params, { headers: headers});
  }

  login(userToLogin, getToken = null){
    if(getToken){
      userToLogin.getToken = getToken;
    }
    let params = JSON.stringify(userToLogin);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/user/login`, params, { headers: headers});
  }

  getIdentity() {
    return JSON.parse(localStorage.getItem('identity'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
  }

  updateUser(userToUpdate:any){
    let params = JSON.stringify(userToUpdate);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    return this.http.put(`${this.url}/user/update-user/${userToUpdate._id}`, params, { headers: headers});
  }

  getUrlImage() {
    let user = this.getIdentity();
    return user && user.image ? `${this.url}/user/get-image-file/${user.image}` : null;
  }
}

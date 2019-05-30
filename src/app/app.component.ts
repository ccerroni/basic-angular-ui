import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;

  constructor(private userService: UserService, private _router: Router) {
    this.title= 'BASICAPP';
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this.userService.getIdentity();
  }

  logout() {
    this.userService.logout();
    this._router.navigate(['/']);
  }
}

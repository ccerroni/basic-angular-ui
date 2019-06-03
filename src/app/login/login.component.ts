import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { getToken } from '@angular/router/src/utils/preactivation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title: String;
  public loginForm: FormGroup;
  public user: User;
  public status: string;
  public token: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {
    this.title = 'Login';
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res.user && res.user._id) {
            this.user = res.user;
            this.user.password = '';
            localStorage.setItem('identity', JSON.stringify(this.user));

            //getToken
            this.getToken();
          }
          else {
            alert('Login Fail');
          }
  
          return res;
        },
        error => {
          console.log('An error occours ', <any>error);
        });
    }
  }

  getToken() {
    this.userService.login(this.loginForm.value, true).subscribe(
      (res: any) => {
        if (res.token && res.token.length > 0) {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          this.status = 'success';
          this._router.navigate(['/']);
        }
        else {
          console.log('token not generated');
          this.status = 'fail';
        }
        return res;
      },
      error => {
        console.log('An error occours ', <any>error);
      });
  }
}

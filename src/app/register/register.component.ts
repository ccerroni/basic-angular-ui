import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from "../models/user.model";
import {  UserService } from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: String;
  public registerForm: FormGroup;
  public user: User;
  isFormSubmitted: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) 
    { 
      this.title = 'Register';
      this.user = new User('', '', '', '', '', 'ROLE_USER', '');
      this.isFormSubmitted = false;
    }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.registerForm);
    this.userService.register();
    this.isFormSubmitted= true;
  }

}

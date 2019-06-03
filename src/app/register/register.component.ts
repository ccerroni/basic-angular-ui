import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from "../models/user.model";
import {  UserService } from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public title: String;
  public registerForm: FormGroup;
  public user: User;
  public isFormSubmitted: boolean;
  public status: string;

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
    if(this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe((res: any) => {
        if (res.user && res.user._id) {
          this.user = res.user;
          this.status='success';
        }
        else {
          this.user = new User('', '', '', '', '', 'ROLE_USER', '');
          this.status='fail';
        }
        
        return res;
      },
      error => {
        console.log('An error occours');
      });
    }
    
    this.isFormSubmitted= true;
  }

}

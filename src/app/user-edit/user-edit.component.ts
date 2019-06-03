import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { UploadService } from "../services/upload.service";
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public isFormSubmitted: boolean;
  public profileForm: FormGroup;
  public status: string;
  public url: string;
  public urlImage: string;

  constructor(
    private _userService:UserService,
    private _uploadService:UploadService,
    private _globalService: GlobalService
    )
    {
      this.title ='User Profile';
      this.identity = _userService.getIdentity();
      this.token = _userService.getToken();
      this.user = this.identity;
      this.url = _globalService.url;
      this.urlImage = this._userService.getUrlImage();
      console.log(this.urlImage);
    }

  ngOnInit() {
    this.user = this._userService.getIdentity();
    this.profileForm = new FormGroup({
      name: new FormControl(this.user? this.user.name: null, [Validators.required]),
      lastName: new FormControl(this.user? this.user.lastName: null, [Validators.required]),
      email: new FormControl(this.user ? this.user.email: null, [Validators.required, Validators.email]),
      image: new FormControl('')
    });
  }

  onSubmit() {
    if(this.profileForm.valid) {
      let userToUpdate= {_id: this.user._id, ...this.profileForm.value}
      this._userService.updateUser(userToUpdate).subscribe(
        (response:any) => {
          if(!response.user) {
            this.status = 'Error';
          }
          else {
            this.user = {...response.user};
            this.updateIdentity(this.user);
            this._uploadService.makeFileRequest(`${this.url}/user/upload-image-user/${this.user._id}`, [], this.filesToUpload, this.token, 'image').then(
              (result:any) => {
                this.user.image = result.image;
                this.updateIdentity(this.user);
              }
            );

            this.status = 'success';
          }
        },
        error => {
          var errorMessage = <any>error;
          if(errorMessage) {
            this.status = 'Error';
          }
        }
      );
    }
    this.isFormSubmitted= true;
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    if(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    }
  }

  updateIdentity(user:User) {
    localStorage.setItem('identity', JSON.stringify(user));
  }

}

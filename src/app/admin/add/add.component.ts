import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { AnimalService } from '../../services/animal.service';
import { Animal } from "../../models/animal.model";
import { UserService } from "../../services/user.service";
import { UploadService } from "../../services/upload.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [
    UserService, AnimalService, UploadService
  ]
})
export class AddComponent implements OnInit {
  public title:string;
  public animal: Animal;
  public identity: string;
  public token: string;
  public url: string;
  public addForm: FormGroup;
  public isFormSubmitted: boolean;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
    private GLOBAL: GlobalService,
    private _uploadService: UploadService
  ) { 
    this.url = this.GLOBAL.url;
    this.title = 'Add new animal';
    this.animal = new Animal('', '', '', '', null, '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.isFormSubmitted= false;
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl(this.animal.name, [Validators.required]),
      description: new FormControl(this.animal.description),
      year: new FormControl(this.animal.year ? this.animal.year : new Date().getFullYear(), [Validators.required]),
      image: new FormControl(this.animal.image ? this.animal.image : '')
    });
  }
  
  onSubmit() {
    console.log(this.addForm.value);
    this._animalService.addAnimal(this.token, this.addForm.value).subscribe(
      (response:any) => {
        if (!response.animal) {
          this.status = 'error';
        }
        else {
          this.status = 'success';
          this.animal = response.animal;
          //the upload anima image

          this._router.navigate(['/admin-panel/list']);
        }
      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage) {
          this.status = 'error';
        }
      }
    );
  }

}

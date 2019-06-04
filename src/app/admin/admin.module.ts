import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AdminGuard } from '../services/admin.guard';
import { UserService } from "../services/user.service";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ MainComponent, ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    AdminGuard,
    UserService
  ]
})
export class AdminModule { }

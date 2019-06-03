import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { KeeperComponent } from './keeper/keeper.component';
import { ShopComponent } from './shop/shop.component';
import { ParksComponent } from './parks/parks.component';
import { ErrorComponent } from './error/error.component';
import { AnimalComponent } from './animal/animal.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UploadService } from "./services/upload.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Services


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    KeeperComponent,
    ShopComponent,
    ParksComponent,
    ErrorComponent,
    AnimalComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

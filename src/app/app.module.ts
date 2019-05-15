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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    KeeperComponent,
    ShopComponent,
    ParksComponent,
    ErrorComponent,
    AnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

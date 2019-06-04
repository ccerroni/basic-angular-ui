import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AdminGuard } from '../services/admin.guard';

const adminRoutes: Routes = [
  { 
    path: 'admin-panel', 
    component: MainComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main', component: MainComponent },
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit', component: EditComponent }
    ]
   },
   { path: 'list-panel', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

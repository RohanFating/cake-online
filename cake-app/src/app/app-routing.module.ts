import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeInfoComponent } from './cake/components/cake-info/cake-info.component';
import { CakeDetailsComponent } from './cake/components/cake-details/cake-details.component';
import { AddCakeComponent } from './cake/components/add-cake/add-cake.component';

export const routes: Routes = [
  {
    path: '',
    component: CakeInfoComponent,
  },
  {
    path: 'cake-details/:id',
    component: CakeDetailsComponent,
  },
  {
    path: 'add-cake',
    component: AddCakeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

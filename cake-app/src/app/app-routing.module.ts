import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeInfoComponent } from './cake/components/cake-info/cake-info.component';
import { CakeDetailsComponent } from './cake/components/cake-details/cake-details.component';

export const routes: Routes = [
  {
    path: '',
    component: CakeInfoComponent,
  },
  {
    path: 'cake-details/:id',
    component: CakeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

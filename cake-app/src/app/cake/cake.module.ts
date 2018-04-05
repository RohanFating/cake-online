import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeInfoComponent } from './components/cake-info/cake-info.component';
import { CakeDetailsComponent } from './components/cake-details/cake-details.component';
import { CakeService } from './services/cake.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCakeComponent } from './components/add-cake/add-cake.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ CakeService ],
  declarations: [ CakeInfoComponent, CakeDetailsComponent, AddCakeComponent ],
})
export class CakeModule { }

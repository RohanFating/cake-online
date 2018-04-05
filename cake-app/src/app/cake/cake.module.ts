import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeInfoComponent } from './components/cake-info/cake-info.component';
import { CakeDetailsComponent } from './components/cake-details/cake-details.component';
import { CakeReviewsComponent } from './components/cake-reviews/cake-reviews.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CakeInfoComponent, CakeDetailsComponent, CakeReviewsComponent]
})
export class CakeModule { }

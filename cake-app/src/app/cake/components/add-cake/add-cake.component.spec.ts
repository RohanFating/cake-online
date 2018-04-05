import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeReviewsComponent } from './cake-reviews.component';

describe('CakeReviewsComponent', () => {
  let component: CakeReviewsComponent;
  let fixture: ComponentFixture<CakeReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

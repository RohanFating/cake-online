import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AddCakeComponent } from './add-cake.component';
import { CakeService } from '../../services/cake.service';
import { CAKE_LIST_RESPONSE } from '../../../../assets/cake-mock.response';


/**
 * Unit test for AddCakeComponent
 */
describe('AddCakeComponent', () => {
  let component: AddCakeComponent;
  let fixture: ComponentFixture<AddCakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule ],
      providers: [CakeService,
        { provide: Router, useValue: MockRouter },
      ],
      declarations: [AddCakeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form values', () => {
    component.reviewsForm.patchValue({
      yumFactor: 5,
      comment: 'Cool cake'
    });
    expect(component.reviewsForm.get('yumFactor').value).toBe(5);
    component.resetModels();
    expect(component.reviewsForm.get('yumFactor').value).toBe(1);
  });

  it('should get list of all cakes using getCakeList', () => {
    //  To test private functions
    const mockComponent: any = component;
    mockComponent.ngOnInit();
    fixture.detectChanges();
    mockComponent.reviewsForm.patchValue({
      yumFactor: 1,
      imageUrl: 'abx.jpg',
      name: 'Choco Cake',
      comment: 'Cool cake'
    });
    mockComponent.cakeInfo = CAKE_LIST_RESPONSE[0];
    const addCakeSpy: any = spyOn(mockComponent, 'resetModels');
    spyOn(mockComponent.cakeService, 'submitCake').and.returnValue(Observable.of(CAKE_LIST_RESPONSE[1]));
    mockComponent.addCake();
    fixture.detectChanges();
    expect( addCakeSpy ).toHaveBeenCalled();
  });
});

class MockRouter {
  navigate(): boolean {
    return true;
  }
  back(): boolean {
    return true;
  }
}

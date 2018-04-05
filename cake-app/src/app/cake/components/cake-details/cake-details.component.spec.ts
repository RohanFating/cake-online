import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CakeModule } from '../../cake.module';
import { CAKE_LIST_RESPONSE } from '../../../../assets/cake-mock.response';
import { CakeService } from '../../services/cake.service';
import { CakeDetailsComponent } from './cake-details.component';
/**
 * Unit test for CakeDetailsComponent
 */
describe('CakeDetailsComponent', () => {
  let component: CakeDetailsComponent;
  let fixture: ComponentFixture<CakeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CakeModule ],
      providers: [ CakeService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '5a95d9343fa54b0401954588' },
            },
          }
        },
        { provide: Router, useValue: mockRouter },
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cake details using getCakeDetailsById and also validate updateCakeInfo', () => {
    //  To test private functions
    const mockComponent: any = component;
    spyOn(mockComponent.cakeService , 'getCakeDetailsById').and.returnValue(Observable.of(CAKE_LIST_RESPONSE[0]));
    mockComponent.ngOnInit();
    fixture.detectChanges();
    expect(mockComponent.cakeInfo.id).toBe('5a95d9343fa54b0401954588');
  });

  it('should clean up component on ngOnDestrpy', () => {
    component.ngOnDestroy();
    expect(component.cakeInfo).toBe(null);
  });

});

const mockRouter: any = {
  navigate: jasmine.createSpy('navigate')
};

 class MockActivatedRoute {
  public snapshot: any  = {
      params: {
        id: 12121,
      }
  };
 }

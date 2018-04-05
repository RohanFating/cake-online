import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CakeModule } from '../../cake.module';
import { CakeInfoComponent } from './cake-info.component';
import { CakeService } from '../../services/cake.service';
import { CAKE_LIST_RESPONSE } from '../../../../assets/cake-mock.response';

/**
 * Unit test for CakeInfoComponent
 */
describe('CakeInfoComponent', () => {
  let component: CakeInfoComponent;
  let fixture: ComponentFixture<CakeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CakeModule],
      providers: [CakeService,
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of all cakes using getCakeList', () => {
    //  To test private functions
    const mockComponent: any = component;
    spyOn(mockComponent.cakeService, 'getCakeList').and.returnValue(Observable.of(CAKE_LIST_RESPONSE));
    mockComponent.ngOnInit();
    fixture.detectChanges();
    expect(mockComponent.cakeList.length).toBeGreaterThan(0);
  });

  it('should navigate to second page', () => {
    const mockComp: any = component;
    mockComp.nextPage('detail', CAKE_LIST_RESPONSE[0]);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should clean up component on ngOnDestrpy', () => {
    component.ngOnDestroy();
    expect(component.cakeList.length).toBe(0);
  });
});

const mockRouter: any = {
  navigate: jasmine.createSpy('navigate')
};

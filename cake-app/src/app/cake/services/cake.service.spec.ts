import { TestBed, inject } from '@angular/core/testing';
import { CakeService } from './cake.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CAKE_LIST_RESPONSE } from '../../../assets/cake-mock.response';

/**
 * Unit test for CakeService
 */
describe('CakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CakeService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([CakeService], (service: CakeService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Validating getCakeList
   */
  it('should call getCakeList service to get all cakes list',
   inject([CakeService, XHRBackend], (service: CakeService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(CAKE_LIST_RESPONSE)
      })));
      service.getCakeList().subscribe((data) => {
        expect(data.length).toBeGreaterThan(0);
      },
        (err) => {
          fail('Error in service call');
        });
    });
  }));

  it('should validate error scenario for getCakeList service', inject([CakeService, XHRBackend],
    (service: CakeService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Error('Error in service call'));
        service.getCakeList().subscribe((data) => {
          fail('Error in service call');
        },
          (err) => {
            expect(err).toBeDefined();
          });
      });
    }));

  /**
   * Validating getCakeDetailsById
   */
  it('should call getCakeDetailsById service to get details of perticular cake item',
   inject([CakeService, XHRBackend], (service: CakeService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(CAKE_LIST_RESPONSE[0])
      })));
      service.getCakeDetailsById('5a95d9343fa54b0401954588').subscribe((data) => {
        expect(data.id).toBe('5a95d9343fa54b0401954588');
      },
        (err) => {
          fail('Error in service call');
        });
    });
  }));

  it('should validate error scenario for getCakeDetailsById service', inject([CakeService, XHRBackend],
    (service: CakeService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Error('Error in service call'));
        service.getCakeDetailsById('5a95d9343fa54b0401954588').subscribe((data) => {
          fail('Error in service call');
        },
          (err) => {
            expect(err).toBeDefined();
          });
      });
    }));

  /**
   * Validating submitCake
   */
  it('should submit cake submitCake service',
  inject([CakeService, XHRBackend], (service: CakeService, mockBackend: MockBackend) => {
   mockBackend.connections.subscribe((connection) => {
     connection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(CAKE_LIST_RESPONSE[0])
     })));
     service.submitCake( CAKE_LIST_RESPONSE[0]).subscribe((data) => {
       expect(data.id).toBe('5a95d9343fa54b0401954588');
     },
       (err) => {
         fail('Error in service call');
       });
   });
 }));

 it('should validate error scenario for submitCakeReviews service', inject([CakeService, XHRBackend],
   (service: CakeService, mockBackend: MockBackend) => {
     mockBackend.connections.subscribe((connection) => {
       connection.mockError(new Error('Error in service call'));
       service.submitCake( CAKE_LIST_RESPONSE[0]).subscribe((data) => {
         fail('Error in service call');
       },
         (err) => {
           expect(err).toBeDefined();
         });
     });
   }));
});

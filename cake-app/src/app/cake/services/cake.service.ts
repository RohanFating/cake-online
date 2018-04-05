import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CakeInfo } from '../interfaces/cake.interface';
import { AppConstant } from '../constants/constants';

/**
 * This service is use to handle all kind of server communication
 */
@Injectable()
export class CakeService {

  private http: HttpClient;
  /**
   * Construction function
   * @param http - http client
   */
  constructor( http: HttpClient ) {
    this.http = http;
   }

  /**
   * To get cake info
   */
  public getCakeList(): Observable<any> {
  return this.http.get( AppConstant.BASE_URL );
  }

  /**
   * To get cake details
   */
  public getCakeDetailsById( id: string ): Observable<any> {
    return this.http.get( `${AppConstant.BASE_URL}/${id}`);
  }

  /**
   * To get cake details
   */
  public submitCakeReviews( id: string, cakeInfo: any ): any {
      return this.http.put( `${AppConstant.BASE_URL}/${id}`, cakeInfo );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CakeService } from '../../services/cake.service';
import { CakeInfo } from '../../interfaces/cake.interface';
import { AppConstant } from '../../constants/constants';
/**
 * CakeDetailsComponent to show cake details and review section
 */
@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html'
})
export class CakeDetailsComponent implements OnInit, OnDestroy {

  // Holds selected cake information
  public cakeInfo: CakeInfo;

  // To show error message if data unavailable
  public errorMessage: string;

  private activatedRoute: ActivatedRoute;
  private cakeService: CakeService;

  /**
   * @constructor
   * @param activatedRoute - to read query param
   * @param router - to navigate to other pages
   * @param cakeService - service to get detail info
   */
  constructor(activatedRoute: ActivatedRoute, cakeService: CakeService) {
    this.activatedRoute = activatedRoute;
    this.cakeService = cakeService;
    this.cakeInfo = {
      id: '',
      comment: '',
      yumFactor: 0,
      imageUrl: '',
      name: ''
    };
  }

  /**
   * Lifecycle Hook ngOnInit
   */
  public ngOnInit() {
    this.errorMessage = '';
    const id: string = this.activatedRoute.snapshot.params.id;
    this.cakeService.getCakeDetailsById(id).subscribe(
      (data) => {
        this.cakeInfo = data;
      },
      (err) => {
        this.errorMessage = AppConstant.ERROR_MESSAGE;
      }
    );
  }

   /**
   * Navigate to detail page
   * @param data - selected cake item
   */
  public goBack( data: CakeInfo ): void {
    window.history.back();
   }

  /**
   * Lifecycle Hook ngOnDestroy to clean up component
   */
  public ngOnDestroy(): void {
    this.cakeInfo = null;
  }
}

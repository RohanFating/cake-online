import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CakeService } from '../../services/cake.service';
import { CakeInfo } from '../../interfaces/cake.interface';
import { AppConstant } from '../../constants/constants';
/**
 * Cake Infor component to show grid of cakes
 */
@Component({
  selector: 'app-cake-info',
  templateUrl: './cake-info.component.html'
})
export class CakeInfoComponent implements OnInit, OnDestroy {

  // Contains list of all cake items coming from server
  public cakeList: Array<CakeInfo>;
  public errorMessage: string;
  private router: Router;
  private cakeService: CakeService;

  /**
   * @constructor
   * @param router - to navigate from one page to other
   * @param cakeService - to get list of cakes using cake services
   */
  constructor( router: Router, cakeService: CakeService ) {
    this.router = router;
    this.cakeService = cakeService;
    this.cakeList = [];
  }

  /**
   * Lifecycle Hook ngOnInit
   */
  public ngOnInit() {
    this.errorMessage = '';
    this.cakeService.getCakeList().subscribe(
      ( data ) => {
        this.cakeList = data;
      },
      ( err ) => {
          this.errorMessage = AppConstant.ERROR_MESSAGE;
      }
    );
  }

  /**
   * Lifecycle Hook ngOnDestroy to clean up component
   */
  public ngOnDestroy(): void {
    this.cakeList = [];
  }

  /**
   * Navigate to detail page
   * @param data - selected cake item
   */
  public openakeDetails( data: CakeInfo ): void {
    this.router.navigate(['/cake-details/', data.id]);
  }

}

import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CakeInfo } from '../../interfaces/cake.interface';
import { CakeService } from '../../services/cake.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from '../../constants/constants';

/**
 * Component to handle reviews and ratings for cake basis on yum factor and comment
 */
@Component({
  selector: 'app-add-cake',
  templateUrl: './add-cake.component.html'
})
export class AddCakeComponent implements OnInit, OnDestroy {

  // Input property to get cake Info on selector
  @Input() public cakeInfo: CakeInfo;

  // Trigger event on successful reviews submission
  @Output() public reviewsGiven: EventEmitter<CakeInfo>;

  // To render yum factor select input
  public yumFactors: Array<number> = [1, 2, 3, 4, 5];
  // To show error message if data unavailable
  public errorMessage: string;

  public fb: FormBuilder;
  public reviewsForm: FormGroup;

  private router: Router;
  private cakeService: CakeService;

  /**
   * @constructor
   * @param cakeService - to call api to update cake reviews
   */
  constructor( cakeService: CakeService, fb: FormBuilder,  router: Router ) {
    this.router = router;
    this.fb = fb;
    this.cakeService = cakeService;
    this.reviewsGiven = new EventEmitter<CakeInfo>();
  }

  /**
   * Lifecycle Hook ngOnInit
   */
  public ngOnInit(): void {
    this.reviewsForm = this.fb.group( {
      yumFactor: [1],
      imageUrl: new FormControl( '', [Validators.required]),
      name: new FormControl( '', [Validators.required, Validators.minLength(3)]),
      comment: new FormControl( '', [Validators.required, Validators.minLength(3)])
    }, );
    this.resetModels();
  }

  /**
   * To reset form values
   */
  public resetModels(): void {
    this.reviewsForm.patchValue({
      yumFactor: 1,
      imageUrl: '',
      name: '',
      comment: ''
    });
  }

  /**
   * Submit reviews on server after complete form validation
   */
  public submitReviews(): void {
    if (this.reviewsForm.valid) {
      const param: any = {
        comment: this.getFormValues('comment'),
        yumFactor: this.getFormValues('yumFactor'),
        imageUrl: this.getFormValues('imageUrl'),
        name: this.getFormValues('name')
      };
      this.errorMessage = '';
      this.cakeService.submitCake('5a95e28f3fa54b04019590ij', param).subscribe(
        (data) => {
          this.cakeInfo = data;
          // this.reviewsGiven.emit(data);
        },
        (err) => {
          this.errorMessage = AppConstant.ERROR_MESSAGE_REVIEWS;
        }
      );
    }
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

  private getFormValues( formControl: string ): string {
    return this.reviewsForm.get( formControl ).value;
  }
}

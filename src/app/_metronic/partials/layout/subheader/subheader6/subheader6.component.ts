import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbItemModel } from '../_models/breadcrumb-item.model';
import { LayoutService } from '../../../../core';
import { SubheaderService } from '../_services/subheader.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subheader6',
  templateUrl: './subheader6.component.html',
})
export class Subheader6Component implements OnInit, OnDestroy {
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  title$: Observable<string>;
  breadcrumbs$: Observable<BreadcrumbItemModel[]>;
  description$: Observable<string>;

  role: string;

  subDaysCnt: number;
  subExpiryDate: string;
  subPaymentDate: string;
  subIsActive: string;
  subAmount: number;
  subscriptionDetails: any = [];


  lessThanSevenDaysWarning: string;
  lessThanFifteenDaysWarning: string;
  freeTrialWarning: string;
  subscriptionIsExpiredWarning: string;
  adminFreeUsageWarning: string;
  perOrderPlanWarning: string;
  sellerMadeInactiveWarning: string;

  unSubscription: Subscription[] = [];
  strSellerId: string;
  currentTransactionData: any = [];


  constructor(
    private layout: LayoutService,
    private subheader: SubheaderService,
    public emitterService: EmitterService,
    private cdr: ChangeDetectorRef,
    public paymentService: PaymentService,
    private spinner: NgxSpinnerService
  ) {
    this.title$ = this.subheader.titleSubject.asObservable();
    this.breadcrumbs$ = this.subheader.breadCrumbsSubject.asObservable();
    this.description$ = this.subheader.descriptionSubject.asObservable();
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.role = sessionStorage.getItem('role');

    const isLoggedIn = this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        this.checkRole();
        this.cdr.detectChanges();
      }
      this.unSubscription.push(isLoggedIn);
    });

    const isPaymentSub = this.emitterService.isPaymentOrStatusChange.subscribe(val => {

      if (val) {
        this.checkRole();

        this.cdr.detectChanges();
      }
      this.unSubscription.push(isPaymentSub);
    }

    );

    const isPaymentOrStatusActivated = this.emitterService.isPaymentOrStatusActivated.subscribe(val => {
      if (val) {
        this.checkRole();
        this.cdr.detectChanges();
      }
      this.unSubscription.push(isPaymentOrStatusActivated);
    });

    this.checkRole();



  }

  ngOnInit() {
    this.subheaderCSSClasses = this.layout.getStringCSSClasses('subheader');
    this.subheaderContainerCSSClasses = this.layout.getStringCSSClasses(
      'subheader_container'
    );
    this.subheaderMobileToggle = this.layout.getProp('subheader.mobileToggle');
    this.subheaderDisplayDesc = this.layout.getProp('subheader.displayDesc');
    this.subheaderDisplayDaterangepicker = this.layout.getProp(
      'subheader.displayDaterangepicker'
    );
  }

  checkRole() {

    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {

      this.currentTransactionData = res;
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.currentTransactionData));

      if (this.role == 'Seller') {
        this.subscriptionDetails = this.currentTransactionData;

        this.subExpiryDate = this.subscriptionDetails[0].ExpiryDatee;
        this.subPaymentDate = this.subscriptionDetails[0].PaymentDatee;
        this.subIsActive = this.subscriptionDetails[0].SubscriptionIsActive;
        this.subAmount = this.subscriptionDetails[0].Amount;

        let moment = require('moment');


        let diffInDays = 0;

        diffInDays = moment(this.subExpiryDate).diff(moment(this.subPaymentDate), 'days');
        this.subDaysCnt = diffInDays;
       

        this.spinner.hide();

        if (this.subIsActive == 'ACTIVE') {

          if (this.subscriptionDetails[0].PaymentMode == 'Continue Free' && (Number(this.subDaysCnt) >= 8 || Number(this.subDaysCnt) <= 14)) {
            this.freeTrialWarning = 'FREE_TRAIL';
            this.lessThanSevenDaysWarning = '';
            this.adminFreeUsageWarning = '';
            this.sellerMadeInactiveWarning = '';
          }
          if (Number(this.subDaysCnt) < 8) {
            this.lessThanSevenDaysWarning = 'LESS_THAN_SEVEN_DAYS_REMAINING';
            this.freeTrialWarning = '';
            this.adminFreeUsageWarning = '';
            this.sellerMadeInactiveWarning = '';
          }
          if (this.subscriptionDetails[0].PaymentMode == 'Continue Free' && (Number(this.subDaysCnt) >= 8 || Number(this.subDaysCnt) <= 14) &&
            this.subscriptionDetails[0].LifeTimeAccess == 'Y') {
            this.adminFreeUsageWarning = 'ADMIN_FREE_USAGE';
            this.freeTrialWarning = '';
            this.sellerMadeInactiveWarning = '';
          }
          if ((Number(this.subDaysCnt) >= 8) && this.subscriptionDetails[0].PaymentMode != 'Continue Free') {
            if ((Number(this.subDaysCnt) <= 15)) {
              this.lessThanFifteenDaysWarning = 'LESS_THAN_FIFTEEN_DAYS_REMAINING';
              this.adminFreeUsageWarning = '';
              this.sellerMadeInactiveWarning = '';
            }
            else {
              this.freeTrialWarning = '';
              this.lessThanSevenDaysWarning = '';
              this.lessThanFifteenDaysWarning = '';
              this.subscriptionIsExpiredWarning = '';
              this.adminFreeUsageWarning = '';
              this.sellerMadeInactiveWarning = '';
              return;
            }
          }
        }

        if (this.subIsActive == 'INACTIVE' && Number(this.subDaysCnt) < 0) {
          this.subscriptionIsExpiredWarning = 'PACK_IS_EXPIRED';
          this.adminFreeUsageWarning = '';
          this.sellerMadeInactiveWarning = '';
        }

        if (this.subIsActive == 'INACTIVE' && Number(this.subDaysCnt) > 0 && (this.subscriptionDetails[0].InActivatedDateOn != null || this.subscriptionDetails[0].InActivatedDateOn != undefined)) {
          this.sellerMadeInactiveWarning = 'SELLER_IS_INACTIVE';
          this.subscriptionIsExpiredWarning = '';
          this.adminFreeUsageWarning = '';
        }
        if (this.subIsActive == 'INACTIVE' && Number(this.subDaysCnt) > 0 && (this.subscriptionDetails[0].InActivatedDateOn == null || this.subscriptionDetails[0].InActivatedDateOn == undefined)) {
          this.freeTrialWarning = '';
          this.lessThanSevenDaysWarning = '';
          this.lessThanFifteenDaysWarning = '';
          this.subscriptionIsExpiredWarning = '';
          this.adminFreeUsageWarning = '';
          this.sellerMadeInactiveWarning = '';
          return;
        }
      }

    },
      err => {
        this.spinner.hide();
      });

  }




  ngOnDestroy() {
    this.unSubscription.forEach((sb) => sb.unsubscribe());
  }
}

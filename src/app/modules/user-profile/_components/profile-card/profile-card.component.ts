import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DialogSellerActiveInactiveComponent } from 'src/app/pages/payment/dialog-seller-active-inactive/dialog-seller-active-inactive.component';
import { DialogSubscriptionHistoryComponent } from 'src/app/pages/payment/dialog-subscription-history/dialog-subscription-history.component';
import { PreviousTrasactions } from 'src/app/pages/payment/payment.model';
import { EmitterService } from 'src/app/shared/emitter.service';
import { AuthService, UserModel } from '../../../auth';
import * as moment from 'moment';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {

  user$: Observable<UserModel>;
  sellerName: string;
  vendorCode: string;
  role: string;
  city: string;
  sellerPaymentData: any = [];
  previousTrasactions: PreviousTrasactions = new PreviousTrasactions();
  strSellerId: string;
  unSubscription: Subscription[] = [];
  paymentMode: string;
  isLifeTimeAccess: string;

  constructor(
    public userService: AuthService,
    private router: Router,
    public emitterService: EmitterService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private paymentService: PaymentService
  ) {
    this.user$ = this.userService.currentUserSubject.asObservable();
    this.router.navigate(['/user-profile/addAddress']);
  }

  ngOnInit(): void {
    this.sellerName = sessionStorage.getItem('sellerName');
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.vendorCode = sessionStorage.getItem('vendorId');
    this.role = sessionStorage.getItem('role');

    this.city = sessionStorage.getItem('city');
    this.sellerPaymentData = JSON.parse(sessionStorage.getItem("subscriptionDetails"));

    this.previousTrasactions.SellerId = Number(this.strSellerId);
    this.previousTrasactions.CurrentDate = moment(new Date()).format('YYYY-MM-DD');

    if (this.role == 'Seller') {
      this.paymentMode = this.sellerPaymentData[0].PaymentMode.trim();
      this.isLifeTimeAccess = this.sellerPaymentData[0].LifeTimeAccess.trim();
    }
    else {
      return;
    }


    const isLoggedInSubscription = this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        this.city = '';
        this.city = sessionStorage.getItem('city');
        this.role = sessionStorage.getItem('role');
        this.cdr.detectChanges();
      }
    });

    this.unSubscription.push(isLoggedInSubscription);

    const isDialogClosedSub = this.emitterService.isDialogClosed.subscribe(val => {
      if (val) {
        this.updatePreviousTransactions(this.previousTrasactions);
      }
    });
    this.unSubscription.push(isDialogClosedSub);

    this.updatePreviousTransactions(this.previousTrasactions);
  }

  openTransactionHistory() {
    this.dialog.open(DialogSubscriptionHistoryComponent, {
      height: '600px',
      width: '1200px'
    });
  }

  openActiveStatus() {
    this.dialog.open(DialogSellerActiveInactiveComponent, {
      height: '300px',
      width: '1200px',
      data: this.sellerPaymentData
    });
  }

  updatePreviousTransactions(previousTrasactions) {
    this.spinner.show();
    this.paymentService.updatePreviousTransactionsData(previousTrasactions).subscribe(res => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    this.unSubscription.forEach((sb) => sb.unsubscribe());
  }

}

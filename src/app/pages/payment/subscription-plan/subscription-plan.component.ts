import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { PaymentGateWay } from '../payment.model';
import { PaymentService } from '../payment.service';
import { v4 as uuid } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss']
})
export class SubscriptionPlanComponent implements OnInit, OnDestroy {

  role: string;
  payuform: PaymentGateWay = new PaymentGateWay();

  payuUrl: string = 'https://3intellects.co.in/uat_InventoryService/Default.aspx';
  // payuUrl: string = 'http://localhost:55547/Default.aspx';

  txnid: string;
  isHidden: boolean = true;
  makePayment: boolean = false;
  sellerData: any = [];
  uuidv4Num: string;
  date: Date;
  sellerPaymentData: any = [];
  isSubscriptionValid: string;
  paymentRequest: any = [];
  private unsubscribe: Subscription[] = [];
  sellerContactCredentials: any = [];

  constructor(
    private router: Router,
    private emitterService: EmitterService,
    public toastr: ToastrService,
    private subheader: SubheaderService,
    public paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');

    this.addTitle();
    if (this.role == 'Admin') {
      this.router.navigate(['/dashboard']);
    }
    this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");

    this.sellerData = JSON.parse(sessionStorage.getItem("sellerData"));
    this.sellerPaymentData = JSON.parse(sessionStorage.getItem("subscriptionDetails"));

    const isPaymentOrStatusChange = this.emitterService.isPaymentOrStatusChange.subscribe(val => {

      if (val) {
        this.sellerPaymentData = JSON.parse(sessionStorage.getItem("subscriptionDetails"));
        this.isSubscriptionValid = '';
        this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
        this.isSubscriptionValid = 'INACTIVE';
        this.addTitle();
        this.cdr.detectChanges();
      }
    });
    this.unsubscribe.push(isPaymentOrStatusChange);

    const isPaymentOrStatusActivated = this.emitterService.isPaymentOrStatusActivated.subscribe(val => {
      if (val) {

        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = '';
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
          this.isSubscriptionValid = 'ACTIVE';
          this.addTitle();
          this.cdr.detectChanges();
        }
      }
      this.unsubscribe.push(isPaymentOrStatusActivated);
    });

    this.getSellerContactCredentials(this.sellerData.id);


  }

  addTitle() {

    setTimeout(() => {
      this.subheader.setTitle('Subscription');
      this.subheader.setBreadcrumbs([{
        title: 'Subscription',
        linkText: 'Subscription',
        linkPath: '/payment/subscription'
      }]);
    }, 1);
  }


  goToSuccessPage() {
    this.router.navigate(['/success']);
  }

  goToFailurePage() {
    this.router.navigate(['/failure']);
  }

  confirmPayment(amount, selectedCardID) {

    if (this.sellerPaymentData[0].LifeTimeAccess == 'Y') {
      this.toastr.error('We Offered You To Use System Access Under Free Program !');
      return;
    }

    if (this.sellerPaymentData[0].PaymentMode == 'Per Order Subscription') {
      this.toastr.error('You Are Under Per Order Subscription Mode !');
      return;
    }
    else {

      let tempNum = uuid();
      this.uuidv4Num = tempNum.toString().substring(1, 8);

      this.payuform.Name = this.sellerData.name.trim();
      this.payuform.EmailID = (this.sellerContactCredentials[0].Email).trim();
      this.payuform.Amount = amount;
      this.payuform.mobilno = (this.sellerContactCredentials[0].MobileNumber).trim();

      let dateObj = new Date();

      this.txnid = ('web' + 'txnid' + this.uuidv4Num + dateObj.getMilliseconds());
      let url = new URL(this.payuUrl);
      url.searchParams.set('Name', this.payuform.Name);
      url.searchParams.set('EmailID', this.payuform.EmailID);
      url.searchParams.set('Amount', this.payuform.Amount);
      url.searchParams.set('mobileno', this.payuform.mobilno.toString());
      url.searchParams.set('TransationID', this.txnid.toString());

      this.payuUrl = url.href;
      this.paymentService.pUrl = url.href;




      this.makePayment = true;
      sessionStorage.removeItem("paymentRequest");
      sessionStorage.setItem("paymentRequest", JSON.stringify(this.payuform));


      if (selectedCardID == 1) {
        document.getElementById("cardOne").style.borderColor = "#ff8c00";
        document.getElementById("buttonOne").style.color = "black";

        document.getElementById("cardTwo").style.borderColor = "white";
        document.getElementById("buttonTwo").style.color = "white";

        document.getElementById("cardThree").style.borderColor = "white";
        document.getElementById("buttonThree").style.color = "white";

        document.getElementById("cardFour").style.borderColor = "white";
        document.getElementById("buttonFour").style.color = "white";
      }
      if (selectedCardID == 2) {
        document.getElementById("cardTwo").style.borderColor = "#ff8c00";
        document.getElementById("buttonTwo").style.color = "black";

        document.getElementById("cardOne").style.borderColor = "white";
        document.getElementById("buttonOne").style.color = "white";

        document.getElementById("cardThree").style.borderColor = "white";
        document.getElementById("buttonThree").style.color = "white";

        document.getElementById("cardFour").style.borderColor = "white";
        document.getElementById("buttonFour").style.color = "white";
      }
      if (selectedCardID == 3) {
        document.getElementById("cardThree").style.borderColor = "#ff8c00";
        document.getElementById("buttonThree").style.color = "black";

        document.getElementById("cardOne").style.borderColor = "white";
        document.getElementById("buttonOne").style.color = "white";

        document.getElementById("cardTwo").style.borderColor = "white";
        document.getElementById("buttonTwo").style.color = "white";

        document.getElementById("cardFour").style.borderColor = "white";
        document.getElementById("buttonFour").style.color = "white";
      }
      if (selectedCardID == 4) {
        document.getElementById("cardFour").style.borderColor = "#ff8c00";
        document.getElementById("buttonFour").style.color = "black";

        document.getElementById("cardOne").style.borderColor = "white";
        document.getElementById("buttonOne").style.color = "white";

        document.getElementById("cardTwo").style.borderColor = "white";
        document.getElementById("buttonTwo").style.color = "white";

        document.getElementById("cardThree").style.borderColor = "white";
        document.getElementById("buttonThree").style.color = "white";
      }



      this.toastr.success('Please Hit Confirm To Continue');
    }

  }

  getSellerContactCredentials(sellerId) {
    this.paymentService.getSellerCredentials(sellerId).subscribe(res => {
      this.sellerContactCredentials = res;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}

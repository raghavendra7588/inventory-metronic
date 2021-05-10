import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_services/auth-http/user.model';
import { LoginService } from '../login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { SellerPaymentVerification } from '../login.model';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth = {
  //   email: '',
  //   password: '',
  // };
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  user: User = new User();
  sellerPaymentVerification: SellerPaymentVerification = new SellerPaymentVerification();
  loginSub: Subscription;
  isLoggedInCheck: boolean = false;
  errors: any;

  isButtonDisabled: boolean = false;
  isSubscriptionValid: string;

  subscriptionDetailsData: any;
  date: Date;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private emitterService: EmitterService,
    public toastr: ToastrService,
    private paymentService: PaymentService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }


    this.date = new Date();
    this.date.setDate(this.date.getDate() + Number(15));
    let d = moment(new Date(this.date)).format('YYYY-MM-DD');
 

    this.sellerPaymentVerification.tempExpiryDate = d;
    this.sellerPaymentVerification.tempStartDate = moment(new Date()).format('YYYY-MM-DD');
    
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    // this.returnUrl =
    //   this.route.snapshot.queryParams['returnUrl'.toString()] || '/';

    this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        this.hasError = false;
        const loginSubscr = this.authService
          .login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe((user: UserModel) => {

            if (this.isSubscriptionValid == 'INACTIVE') {
              this.router.navigate(['/payment/subscription']);
            }
            if (user && this.isSubscriptionValid == 'ACTIVE') {
              this.router.navigate(['/']);
            
                this.toastr.success('Logged In Successfully !!');
          

            }
            else {
              this.hasError = true;
            }
          });
        this.unsubscribe.push(loginSubscr);
      }
    });
    this.authService.checkLocalCache();
    this.router.navigate(['/auth/login']);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
  login() {
    this.authService.checkLocalCache();
    this.isButtonDisabled = true;
    this.loginService.loginUser(this.user).subscribe(data => {
      sessionStorage.setItem('sellerData', JSON.stringify(data));
      if (data.role == 'Seller') {
        this.sellerPaymentVerification.sellerId = data.id;
        this.sellerPaymentVerification.vendorName = data.name;
        this.sellerPaymentVerification.vendorCode = data.vendorcode;

        this.paymentService.getsellerSubscriptionDetails(this.sellerPaymentVerification).subscribe(res => {
         
          this.subscriptionDetailsData = res;
          this.isSubscriptionValid = this.subscriptionDetailsData[0].SubscriptionIsActive;
          sessionStorage.setItem('isSubscriptionValid', this.isSubscriptionValid.toString());
          sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.subscriptionDetailsData));
         
        }, err => {
          this.toastr.error('Please Check Your API is Running Or Not!');
          this.isButtonDisabled = false;
       
        });
      }
      else {
        this.isSubscriptionValid = 'ACTIVE';
        sessionStorage.setItem('isSubscriptionValid', this.isSubscriptionValid.toString());
        this.isButtonDisabled = false;
      }

      this.authService.setLocalCache(data.token, data.name, data.id, data.categories, data.vendorcode, data.role, data.city);
      sessionStorage.removeItem('currentlySelectedTab');
      sessionStorage.setItem('currentlySelectedTab', 'Inventory');

      this.emitterService.isLoggedIn.emit(true);
      this.emitterService.isLoggedInSuccessful.emit(true);
      this.isLoggedInCheck = true;
      this.isButtonDisabled = false;

    },
      error => {
        this.errors = error;
        this.isButtonDisabled = false;
        
        if (this.errors) {
          this.toastr.error(this.errors.error);
          this.isButtonDisabled = false;
        }
 
      });

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

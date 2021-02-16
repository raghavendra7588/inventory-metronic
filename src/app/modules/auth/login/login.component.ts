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
  loginSub: Subscription;
  isLoggedInCheck: boolean = false;
  errors: any;

  isButtonDisabled: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private emitterService: EmitterService,
    public toastr: ToastrService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.user.username = '9821163061';
    this.user.password = '987654';


  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';

    this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        this.hasError = false;
        const loginSubscr = this.authService
          .login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe((user: UserModel) => {
            if (user) {
              this.router.navigate([this.returnUrl]);
              this.toastr.success('Logged In Successfully !!');
            } else {
              this.hasError = true;
            }
          });
        this.unsubscribe.push(loginSubscr);
      }
    });
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
    this.loginService.loginUser(this.user).subscribe(data => {
      // console.log('logged in data', data)
      this.authService.setLocalCache(data.token, data.name, data.id, data.categories, data.vendorcode, data.role, data.city);
      sessionStorage.removeItem('currentlySelectedTab');
      sessionStorage.setItem('currentlySelectedTab', 'Inventory');
      this.emitterService.isLoggedIn.emit(true);
      this.emitterService.isLoggedInSuccessful.emit(true);
      this.isLoggedInCheck = true;
      this.isButtonDisabled = true;

    },
      error => {
        this.errors = error;
        console.log('eror', this.errors.error);
        if (this.errors) {
          this.toastr.error(this.errors.error);
        }
      });

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

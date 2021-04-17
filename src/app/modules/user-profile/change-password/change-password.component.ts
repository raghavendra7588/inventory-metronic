import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { SalesService } from 'src/app/pages/sales/sales.service';
import { AuthService, UserModel, ConfirmPasswordValidator } from '../../auth';
import { ChangePassword } from '../../user-profile.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  sellerData: any = [];
  particularSellerUser: any = [];
  vendorCode: string;
  vendorId: string;
  changePassword: ChangePassword = new ChangePassword();

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    public salesService: SalesService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.loadForm();
    });
    this.subscriptions.push(sb);
    this.vendorCode = sessionStorage.getItem('vendorId');
    this.vendorId = sessionStorage.getItem('sellerId');
    // this.getAllSellerData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  save() {
    // this.formGroup.markAllAsTouched();
    // if (!this.formGroup.valid) {
    //   return;
    // }

    // this.user.password = this.formGroup.value.password;
    // this.userService.isLoadingSubject.next(true);
    // setTimeout(() => {
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);

    if (this.changePassword.currentPassword != this.changePassword.newPassword) {
      this.toastr.error('New Password and Confirm Password Not Same');
      return;
    }

    let user = {
      IsActive: '1',
      address: this.sellerData[0].address,
      city: this.sellerData[0].city,
      emailid: this.sellerData[0].emailid,
      id: this.sellerData[0].id,
      mobilenumber: this.sellerData[0].mobilenumber,
      name: this.sellerData[0].name,
      password: this.changePassword.confirmPassword,
      pincode: this.sellerData[0].pincode,
      role: this.sellerData[0].role,
      state: this.sellerData[0].state,
      userid: "1"
    }
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.editAdminUser(user).subscribe(res => {
      this.toastr.success('Password Updated Successfully !!');
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });

  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }


  getAllSellerData() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.getAllSellerUsers('Seller').subscribe(res => {
      this.sellerData = res;
      this.extractParticularSeller(this.sellerData);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  extractParticularSeller(arr) {
    // this.spinner.show();
    let particularSellerUserObj = [];
    arr.filter(res => {
      if ((res.vendorcode) == (this.vendorCode) && (res.role) === 'Seller') {
        particularSellerUserObj.push(res);
      }
    });


    this.sellerData = particularSellerUserObj;

  
    this.formGroup.get('currentPassword').setValue(this.sellerData[0].password);
    this.spinner.hide();
  }
}

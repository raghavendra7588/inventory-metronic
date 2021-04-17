import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { EditUpdateAdmin } from '../../sales/sales.model.';
import { SalesService } from '../../sales/sales.service';
import { Address } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressForm: FormGroup;
  address: Address = new Address();

  addressData: any = [];
  sellerId: number;
  sellerName: string;
  maxLength = 10;
  maxLengthPinCode = 6;
  copyAddressToggle: boolean = false;
  isButtonDisabled: boolean = false;

  particularSellerResponse: any = [];
  firstAddressResponse: any = [];
  editUpdateAdmin: EditUpdateAdmin = new EditUpdateAdmin();
  adminUsers: any = [];
  strSellerId: string;
  role: string;
  newCity: string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private dialogRef: MatDialogRef<AddAddressComponent>,
    public purchaseService: PurchaseService,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private salesService: SalesService,
    private spinner: NgxSpinnerService
  ) {

    this.addressForm = this.formBuilder.group({
 
      billing_name: [''],
      shipping_name: [''],
      billing_address: [''],
      billing_city: [''],
      billing_pinCode: [''],
      billing_country: [''],
      billing_state: [''],
      billing_phone: [''],
      billing_email: [''],
      shipping_email: [''],
      shipping_addresss: [''],
      shipping_city: [''],
      shipping_pinCode: [''],
      shipping_country: [''],
      shipping_state: [''],
      shipping_phone: [''],
      paymentTerm: ['']
    });

    this.addressData = data;


  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.role = sessionStorage.getItem('role');
    if (this.addressData) {
      this.assignValues();
    }
    else {
    }

    this.sellerId = parseInt(sessionStorage.getItem('sellerId'));
    this.address.sellerId = Number(this.sellerId);
    this.address.sellerName = sessionStorage.getItem('sellerName');
    this.address.billingName = sessionStorage.getItem('sellerName');
    this.address.shippingName = sessionStorage.getItem('sellerName');


    this.address.billing_country = 'India';
    this.address.shipping_country = 'India';
  }

  defaultAddressValues() {

    this.address.billing_address = 'ABC';
    this.address.billing_city = 'Aurangabad';
    this.address.billing_pinCode = 431004;
    this.address.billing_country = 'India';
    this.address.billing_state = 'Maharashtra';
    this.address.billing_phone = 7272727272;
    this.address.billing_email = 'test@gmail.com';
  }



  onSubmit() {
    this.isButtonDisabled = true;

    if (this.addressData) {
      this.address.id = this.addressData.id;
    }
    else {
      this.address.id = '0';
    }


    if (this.address.billing_address === null || this.address.billing_address === undefined || this.address.billing_address === '') {
      this.address.billing_address = 'NULL';
    }

    if (this.address.billing_city === null || this.address.billing_city === undefined || this.address.billing_city === '') {
      this.address.billing_city = 'NULL';
    }


    if (this.address.billing_pinCode === null || this.address.billing_pinCode === undefined) {
      this.address.billing_pinCode = 0;
    }

    if (this.address.billing_country === null || this.address.billing_country === undefined || this.address.billing_country === '') {
      this.address.billing_country = 'NULL';
    }

    if (this.address.billing_state === null || this.address.billing_state === undefined || this.address.billing_state === '') {
      this.address.billing_state = 'NULL';
    }

    if (this.address.billing_phone === null || this.address.billing_phone === undefined) {
      this.address.billing_phone = 0;
    }

    if (this.address.billing_email === null || this.address.billing_email === undefined || this.address.billing_email === '') {
      this.address.billing_email = 'NULL';
    }

    if (this.address.shippingName === null || this.address.shippingName === undefined || this.address.shippingName === '') {
      this.address.shippingName = 'NULL';
    }

    if (this.address.shipping_address === null || this.address.shipping_address === undefined || this.address.shipping_address === '') {
      this.address.shipping_address = 'NULL';
    }
    if (this.address.shipping_city === null || this.address.shipping_city === undefined || this.address.shipping_city === '') {
      this.address.shipping_city = 'NULL';
    }
    if (this.address.shipping_pinCode === null || this.address.shipping_pinCode === undefined) {
      this.address.shipping_pinCode = 0;
    }
    if (this.address.shipping_country === null || this.address.shipping_country === undefined || this.address.shipping_country === '') {
      this.address.shipping_country = 'NULL';
    }

    if (this.address.shipping_state === null || this.address.shipping_state === undefined || this.address.shipping_state === '') {
      this.address.shipping_state = 'NULL';
    }

    if (this.address.shipping_phone === null || this.address.shipping_phone === undefined) {
      this.address.shipping_phone = 0;
    }
    if (this.address.shipping_email === null || this.address.shipping_email === undefined || this.address.shipping_email === '') {
      this.address.shipping_email = 'NULL';
    }

    this.purchaseService.saveAddressMaster(this.address).subscribe(data => {
      this.emitterService.isAddressCreated.emit(true);
      this.toastr.success('Record Submitted Successfully');
    });
    this.dialogRef.close();
  }

  assignValues() {
    this.address.billingName = this.addressData.billingName;
    this.address.billing_address = this.addressData.billing_address;
    this.address.billing_city = this.addressData.billing_city;
    this.address.billing_pinCode = this.addressData.billing_pinCode;
    this.address.billing_country = this.addressData.billing_country;
    this.address.billing_state = this.addressData.billing_state;
    this.address.billing_phone = this.addressData.billing_phone;
    this.address.billing_email = this.addressData.billing_email;
    this.address.shippingName = this.addressData.shippingName;
    this.address.shipping_address = this.addressData.shipping_address;
    this.address.shipping_city = this.addressData.shipping_city;
    this.address.shipping_pinCode = this.addressData.shipping_pinCode;
    this.address.shipping_country = this.addressData.shipping_country;
    this.address.shipping_state = this.addressData.shipping_state;
    this.address.shipping_phone = this.addressData.shipping_phone;
    this.address.shipping_email = this.addressData.shipping_email;
  }
  copyBillingAddress() {

    this.copyAddressToggle = !this.copyAddressToggle;
    if (this.copyAddressToggle) {
      this.address.shippingName = this.address.billingName;
      this.address.shipping_address = this.address.billing_address;
      this.address.shipping_city = this.address.billing_city;
      this.address.shipping_pinCode = this.address.billing_pinCode;
      this.address.shipping_country = this.address.billing_country;
      this.address.shipping_state = this.address.billing_state;
      this.address.shipping_phone = this.address.billing_phone;
      this.address.shipping_email = this.address.billing_email;
    } else {
      this.address.shippingName = '';
      this.address.shipping_address = '';
      this.address.shipping_city = '';
      this.address.shipping_pinCode = 0;
      this.address.shipping_country = '';
      this.address.shipping_state = '';
      this.address.shipping_phone = 0;
      this.address.shipping_email = '';
    }

  }







}

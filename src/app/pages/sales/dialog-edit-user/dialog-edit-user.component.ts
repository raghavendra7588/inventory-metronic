import { Component, EventEmitter, Inject, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogUpdateMobileNumberComponent } from '../dialog-update-mobile-number/dialog-update-mobile-number.component';
import { EditUpdateAdmin, EditUser, SellerPaymentMode, ValidateAdminUser } from '../sales.model.';
import { SalesService } from '../sales.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { PaymentService } from '../../payment/payment.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  role: string;
  editUserForm: FormGroup;
  editUser: EditUser = new EditUser();
  validateAdminUser: ValidateAdminUser = new ValidateAdminUser();
  editUpdateAdmin: EditUpdateAdmin = new EditUpdateAdmin();
  sellerPaymentMode: SellerPaymentMode = new SellerPaymentMode();

  userData: any = [];
  strSellerId: string;
  maxLengthPinCode = 6;
  maxLengthPhone = 10;
  hide = true;
  validateResponse: any = [];

  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;
  message: string;
  isEditMode: boolean = false;
  paymentModeTypes: any = [];
  isPerOrderSubscription: boolean = false;
  isPerOrderSubscriptionStr: string = '';



  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateMobileNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public paymentService: PaymentService
  ) {
    this.editUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      emailid: [''],
      mobilenumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: [''],
      subscriptionPaymentMode: [''],
      subscriptionPaymentAmount: ['']

    });
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.role = sessionStorage.getItem('role');
    this.userData = data;


    if (this.userData && this.userData.length) {
      this.role = this.userData.role;
    }
    else {
      this.role = sessionStorage.getItem('role');
    }


  }

  ngOnInit(): void {
    if (this.userData) {
      this.assignValues();
    }
    this.getPaymentModeDetails();
  }

  getPaymentModeDetails() {
    this.paymentService.getPaymentMode().subscribe(res => {
      this.paymentModeTypes = res;
    });
  }

  onSubmit() {

    if (this.userData) {

      if (this.isPerOrderSubscriptionStr == 'Per Order Subscription') {
        if (this.editUser.subcriptionPaymentAmount == ''
          || this.editUser.subcriptionPaymentAmount == undefined || this.editUser.subcriptionPaymentAmount == null) {
          this.toastr.error('Subscription Amount Is Required');
          return;
        }
        else {
          this.sellerPaymentMode.PaymentAmount = this.editUser.subcriptionPaymentAmount;
        }
      }

      if (this.isPerOrderSubscriptionStr == 'Continue Free'.trim() || this.isPerOrderSubscriptionStr == 'Paid Subscription'.trim()) {
        this.sellerPaymentMode.PaymentAmount = '0';
      }


      this.editUpdateAdmin.IsActive = '1';
      this.editUpdateAdmin.userid = this.strSellerId;

      this.editUpdateAdmin.address = this.editUser.address;
      this.editUpdateAdmin.city = this.editUser.city;

      this.editUpdateAdmin.emailid = this.editUser.emailid;
      this.editUpdateAdmin.id = this.userData.id;
      this.editUpdateAdmin.mobilenumber = this.editUser.mobilenumber;
      this.editUpdateAdmin.name = this.editUser.name;
      this.editUpdateAdmin.password = this.editUser.password;
      this.editUpdateAdmin.pincode = this.editUser.pincode;
      this.editUpdateAdmin.role = this.userData.role;
      this.editUpdateAdmin.state = this.editUser.state;

      this.editUpdateAdmin.subscriptionPaymentMode = this.editUser.subscriptionPaymentMode;

      this.sellerPaymentMode.SellerId = Number(this.userData.id);
      this.sellerPaymentMode.UpdatedBySellerId = Number(this.strSellerId);

      this.sellerPaymentMode.PaymentMode = this.editUser.subscriptionPaymentMode;


      this.salesService.editAdminUser(this.editUpdateAdmin).subscribe(res => {
        this.paymentService.updatePaymentMode(this.sellerPaymentMode).subscribe(data => {
 
        }, err => {
          this.spinner.hide();
        });
        this.toastr.success('Updated Successfully !!');
        this.emitterService.isAdminCreadtedOrUpdated.emit(true);
        this.dialogRef.close();
      }, err => {
        this.spinner.hide();
      });
    }

    else {
      this.validateAdminUser.address = this.editUser.address;
      this.validateAdminUser.city = this.editUser.city;
      this.validateAdminUser.emailid = this.editUser.emailid;
      this.validateAdminUser.mobilenumber = this.editUser.mobilenumber;
      this.validateAdminUser.name = this.editUser.name;
      this.validateAdminUser.password = this.editUser.password;
      this.validateAdminUser.pincode = this.editUser.pincode;
      this.validateAdminUser.state = this.editUser.state;


      this.spinner.show(undefined,
        {
          type: 'square-spin',
          size: 'medium',
          color: 'white'
        }
      );

      this.salesService.saveAdminUser(this.validateAdminUser).subscribe(res => {

        this.validateResponse = res;

        if (this.validateResponse == 'OK') {
          this.editUpdateAdmin.IsActive = '1';

          this.editUpdateAdmin.address = this.editUser.address;
          this.editUpdateAdmin.city = this.editUser.city;
          this.editUpdateAdmin.emailid = this.editUser.emailid;
          this.editUpdateAdmin.id = '0';
          this.editUpdateAdmin.mobilenumber = this.editUser.mobilenumber;
          this.editUpdateAdmin.name = this.editUser.name;
          this.editUpdateAdmin.password = this.editUser.password;
          this.editUpdateAdmin.pincode = this.editUser.pincode;

          if (this.salesService.currentTab == 'Add New Admin') {
            this.editUpdateAdmin.role = 'Admin';
          }
          else if (this.salesService.currentTab == 'Add New Seller') {
            this.editUpdateAdmin.role = 'Seller';
          }
          else if (this.salesService.currentTab == 'Add New Customer') {
            this.editUpdateAdmin.role = 'Customer';
          }
          else if (this.salesService.currentTab == 'Add New Sales Person') {
            this.editUpdateAdmin.role = 'sales';
          }
          else if (this.salesService.currentTab == 'Add New Back Office') {
            this.editUpdateAdmin.role = 'backoffice';
          }
          else if (this.salesService.currentTab == 'Add New MIS') {
            this.editUpdateAdmin.role = 'mis';
          }
          else if (this.salesService.currentTab == 'Add New Partner') {
            this.editUpdateAdmin.role = 'partner';
          }

          this.editUpdateAdmin.state = this.editUser.state;
          this.editUpdateAdmin.userid = this.strSellerId;

        

          this.salesService.editAdminUser(this.editUpdateAdmin).subscribe(res => {
            this.toastr.success('Saved Successfully !!');
            this.emitterService.isAdminCreadtedOrUpdated.emit(true);
            this.dialogRef.close();
            this.spinner.hide();
          },
            err => {
              this.spinner.hide();
            });
        }


      });



    }
  }


  assignValues() {
    this.isEditMode = true;
    this.editUser.name = this.userData.name;
    this.editUser.emailid = this.userData.emailid;
    this.editUser.mobilenumber = this.userData.mobilenumber;
    this.editUser.password = this.userData.password;
    this.editUser.address = this.userData.address;
    this.editUser.pincode = this.userData.pincode;
    this.editUser.state = this.userData.state;
    this.editUser.city = this.userData.city;

    this.editUser.IsActive = this.userData.IsActive;
    this.editUser.id = this.userData.id;
    this.editUser.role = this.userData.role;
    this.editUser.userid = this.userData.id;
  }

  deleteUser() {
    this.editUpdateAdmin.address = this.editUser.address;
    this.editUpdateAdmin.city = this.editUser.city;
    this.editUpdateAdmin.emailid = this.editUser.emailid;
    this.editUpdateAdmin.id = this.userData.id;
    this.editUpdateAdmin.mobilenumber = this.editUser.mobilenumber;
    this.editUpdateAdmin.name = this.editUser.name;
    this.editUpdateAdmin.password = this.editUser.password;
    this.editUpdateAdmin.pincode = this.editUser.pincode;
    this.editUpdateAdmin.state = this.editUser.state;

    if (this.role == 'Admin') {
      this.editUpdateAdmin.userid = this.strSellerId;
      this.editUpdateAdmin.role = "Admin"
      this.editUpdateAdmin.IsActive = "0";
    }

    else if (this.role == 'Seller') {
      this.editUpdateAdmin.role = 'Seller';
      this.editUpdateAdmin.userid = this.strSellerId;
      this.editUpdateAdmin.IsActive = "0";
    }
    else if (this.role == 'Customer') {
      this.editUpdateAdmin.role = 'Customer';
      this.editUpdateAdmin.userid = "1";
      this.editUpdateAdmin.IsActive = "0";
    }
    else if (this.role == 'sales') {
      this.editUpdateAdmin.role = 'sales';
      this.editUpdateAdmin.userid = this.strSellerId;
      this.editUpdateAdmin.IsActive = "0";
    }
    else if (this.role == 'backoffice') {
      this.editUpdateAdmin.role = 'backoffice';
      this.editUpdateAdmin.userid = this.strSellerId;
      this.editUpdateAdmin.IsActive = "0";
    }
    else if (this.role == 'mis') {
      this.editUpdateAdmin.role = 'mis';
      this.editUpdateAdmin.userid = this.strSellerId;
      this.editUpdateAdmin.IsActive = "0";
    }
    else if (this.role == 'partner') {
      this.editUpdateAdmin.role = 'partner';
      this.editUpdateAdmin.userid = this.strSellerId;
      this.editUpdateAdmin.IsActive = "0";
    }
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.editAdminUser(this.editUpdateAdmin).subscribe(res => {
      this.toastr.error('Deleted Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.deleteUser();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  selectedPaymentModeFromList(paymentModeStr) {
    if (paymentModeStr == 'Per Order Subscription') {
      this.isPerOrderSubscription = true;
      this.isPerOrderSubscriptionStr = paymentModeStr;
    }
    else {
      this.isPerOrderSubscription = false;
      this.isPerOrderSubscriptionStr = paymentModeStr;
    }
  }

}

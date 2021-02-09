import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogUpdateMobileNumberComponent } from '../dialog-update-mobile-number/dialog-update-mobile-number.component';
import { EditUpdateAdmin, EditUser, ValidateAdminUser } from '../sales.model.';
import { SalesService } from '../sales.service';
import { NgxSpinnerService } from "ngx-spinner";

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

  userData: any = [];

  maxLengthPinCode = 6;
  maxLengthPhone = 10;
  hide = true;
  validateResponse: any = [];

  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateMobileNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService
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
    });

    this.userData = data;
    console.log('edit user', this.userData);

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
  }

  onSubmit() {

    if (this.userData) {
      this.editUpdateAdmin.IsActive = '1';
      this.editUpdateAdmin.userid = '1';

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


      this.salesService.editAdminUser(this.editUpdateAdmin).subscribe(res => {
        console.log('admin edited', res);
        this.toastr.success('Updated Successfully !!');
        this.emitterService.isAdminCreadtedOrUpdated.emit(true);
        this.dialogRef.close();
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

      console.log('validate new admin user', this.validateAdminUser);
      this.spinner.show(undefined,
        {
          type: 'square-spin',
          size: 'medium',
          color: 'white'
        }
      );

      this.salesService.saveAdminUser(this.validateAdminUser).subscribe(res => {
        console.log('admin saved', res);
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

          this.editUpdateAdmin.state = this.editUser.state;
          this.editUpdateAdmin.userid = '1';

          console.log('edit update admin user', this.editUpdateAdmin);

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

}

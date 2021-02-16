import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { EditUpdateAdmin, EditUser, ValidateAdminUser } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-view-user',
  templateUrl: './dialog-view-user.component.html',
  styleUrls: ['./dialog-view-user.component.scss']
})
export class DialogViewUserComponent implements OnInit {

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



  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService
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

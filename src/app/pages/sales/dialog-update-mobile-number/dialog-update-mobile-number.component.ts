import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { UpdateMobileNumber, UpdateNewMobileNumber } from '../sales.model.';
import { SalesService } from '../sales.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dialog-update-mobile-number',
  templateUrl: './dialog-update-mobile-number.component.html',
  styleUrls: ['./dialog-update-mobile-number.component.scss']
})
export class DialogUpdateMobileNumberComponent implements OnInit {

  updateMobileNumberForm: FormGroup;
  updateMobileNumber: UpdateMobileNumber = new UpdateMobileNumber();
  updateNewMobileNumber: UpdateNewMobileNumber = new UpdateNewMobileNumber();

  userData: any = [];
  maxLengthMobileNumber = 10;
  validateResponse: any;
  newMobileNumber: string;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateMobileNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private salesService: SalesService,
    private spinner: NgxSpinnerService
  ) {

    this.updateMobileNumberForm = this.formBuilder.group({
      mobilenumber: ['', [Validators.required]],
      emailid: [''],
    });

    this.userData = data;
    console.log('edit', this.userData);



  }

  ngOnInit(): void {
    if (this.userData) {
      this.assignValues();
    }
  }


  onSubmit() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );



    let data = { emailid: 'XXXXXX@x123.com', mobilenumber: this.newMobileNumber.toString() };
    console.log('updateMobileNumber', data);
    
    this.salesService.updateContactNumber(data).subscribe(res => {
      this.validateResponse = res;

      if (this.validateResponse == 'OK') {


        let newMobileNumber = {
          id: this.userData.id.toString(),
          mobilenumber: this.userData.mobilenumber.toString(),
          newmobilenumber: this.newMobileNumber.toString(),
          userid: "1"
        }

        console.log('newMobileNumber', newMobileNumber);
        this.salesService.updateMobileNumber(newMobileNumber).subscribe(res => {
          this.toastr.success('Contact Number Is Updated !!');
          this.emitterService.isAdminCreadtedOrUpdated.emit(true);
          this.spinner.hide();
          this.dialogRef.close();
        },
          err => {
            this.spinner.hide();
          });
      }

    },
      err => {
        this.spinner.hide();
      });
  }

  assignValues() {
    this.updateMobileNumber.emailid = 'XXXXXX@x123.com';
    this.updateMobileNumber.mobilenumber = this.newMobileNumber;

    this.updateNewMobileNumber.id = this.userData.id;
    this.updateNewMobileNumber.mobilenumber = this.userData.mobilenumber;
    this.updateNewMobileNumber.newmobilenumber = this.newMobileNumber;
    this.updateNewMobileNumber.userid = '1';
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesEnquiry } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-sales-enquiry',
  templateUrl: './dialog-sales-enquiry.component.html',
  styleUrls: ['./dialog-sales-enquiry.component.scss']
})
export class DialogSalesEnquiryComponent implements OnInit {

  salesEnquiry: SalesEnquiry = new SalesEnquiry();

  enquiryForm: FormGroup;

  enquiryFormData: any = [];
  categoriesData: any = [];
  statusData: any = [];

  constructor(
    private dialogRef: MatDialogRef<DialogSalesEnquiryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
    public formBuilder: FormBuilder
  ) {
    this.enquiryFormData = data;
    console.log('enquiryFormData', this.enquiryFormData);

    this.enquiryForm = this.formBuilder.group({
      ShopName: ['', [Validators.required]],
      ShopKeepersName: ['', [Validators.required]],
      PhoneNo: ['', [Validators.required]],


      Address: ['', [Validators.required]],
      Area: ['', [Validators.required]],
      City: ['', [Validators.required]],

      State: ['', [Validators.required]],
      Pincode: ['', [Validators.required]],
      categoriestext: ['', [Validators.required]],
      Status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getSubCategoriesData();
    this.statusData = [
      {
        id: 0, name: 'Interested'
      },
      {
        id: 1, name: 'Not Interested'
      },
      {
        id: 2, name: 'Registered and Price List Updated'
      },
      {
        id: 3, name: 'Registered and Price List Pending'
      },
      {
        id: 4, name: 'Need More Time'
      },
      {
        id: 5, name: 'Follow up Required'
      },
    ];
    if (this.enquiryFormData) {
      this.assignValues();
    }
  }

  onSubmit() {
    let uniqueCategoryID = [...new Set(this.salesEnquiry.categoriestext)];

    if (this.enquiryFormData) {
      let editEnquiryForm = {
        Address: this.salesEnquiry.Address.toString(),
        Area: this.salesEnquiry.Area.toString(),
        City: this.salesEnquiry.City.toString(),
        IsActive: this.salesEnquiry.IsActive.toString(),
        PhoneNo: this.salesEnquiry.PhoneNo.toString(),
        Pincode: this.salesEnquiry.Pincode.toString(),
        ShopKeepersName: this.salesEnquiry.ShopKeepersName.toString(),
        ShopName: this.salesEnquiry.ShopName.toString(),
        State: this.salesEnquiry.State.toString(),
        Status: this.salesEnquiry.Status.toString(),
        categories: uniqueCategoryID,
        id: this.salesEnquiry.id.toString(),
        userid: '1'
      }
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
      console.log('req editEnquiryForm', editEnquiryForm);
      this.salesService.insertUpdateSalesEnquiry(editEnquiryForm).subscribe(res => {
        this.toastr.success('Updated Successfully !!');
        this.emitterService.isAdminCreadtedOrUpdated.emit(true);
        this.spinner.hide();
        this.dialogRef.close();
      }, err => {
        this.spinner.hide();
      });
    }
    else {
      let editEnquiryForm = {
        Address: this.salesEnquiry.Address.toString(),
        Area: this.salesEnquiry.Area.toString(),
        City: this.salesEnquiry.City.toString(),
        IsActive: '1',
        PhoneNo: this.salesEnquiry.PhoneNo.toString(),
        Pincode: this.salesEnquiry.Pincode.toString(),
        ShopKeepersName: this.salesEnquiry.ShopKeepersName.toString(),
        ShopName: this.salesEnquiry.ShopName.toString(),
        State: this.salesEnquiry.State.toString(),
        Status: this.salesEnquiry.Status.toString(),
        categories: uniqueCategoryID,
        userid: '1'
      };

      console.log('req editEnquiryForm', editEnquiryForm);
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
      this.salesService.insertUpdateSalesEnquiry(editEnquiryForm).subscribe(res => {
        this.toastr.success('Updated Successfully !!');
        this.emitterService.isAdminCreadtedOrUpdated.emit(true);
        this.spinner.hide();
        this.dialogRef.close();
      }, err => {
        this.spinner.hide();
      });
    }
  }

  assignValues() {

    this.salesEnquiry.Address = this.enquiryFormData.Address;
    this.salesEnquiry.Area = this.enquiryFormData.Area;
    this.salesEnquiry.CategoryName = this.enquiryFormData.CategoryName;
    this.salesEnquiry.City = this.enquiryFormData.City;


    this.salesEnquiry.Date = this.enquiryFormData.Date;
    this.salesEnquiry.IsActive = this.enquiryFormData.IsActive;
    this.salesEnquiry.Name = this.enquiryFormData.Name;
    this.salesEnquiry.PhoneNo = this.enquiryFormData.PhoneNo;


    this.salesEnquiry.Pincode = this.enquiryFormData.Pincode;
    this.salesEnquiry.ShopKeepersName = this.enquiryFormData.ShopKeepersName;
    this.salesEnquiry.ShopName = this.enquiryFormData.ShopName;
    this.salesEnquiry.State = this.enquiryFormData.State;


    this.salesEnquiry.Status = this.enquiryFormData.Status;
    this.salesEnquiry.categories = this.enquiryFormData.categories;

    let arr = this.enquiryFormData.categoriestext.split(',');
    console.log('req cat arr', arr);
    this.salesEnquiry.categoriestext = arr;
    this.salesEnquiry.id = this.enquiryFormData.id;
    this.salesEnquiry.userid = this.enquiryFormData.userid;


  }

  getSubCategoriesData() {
    this.salesService.getAllCategoriesData().subscribe(res => {
      this.categoriesData = res;
    });
  }


}

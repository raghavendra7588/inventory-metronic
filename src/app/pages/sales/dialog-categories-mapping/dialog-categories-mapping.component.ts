import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';
import { EditCategory } from '../sales.model.';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dialog-categories-mapping',
  templateUrl: './dialog-categories-mapping.component.html',
  styleUrls: ['./dialog-categories-mapping.component.scss']
})
export class DialogCategoriesMappingComponent implements OnInit {

  userData: any = [];
  categoriesData: any = [];

  editCategory: EditCategory = new EditCategory();
  changedCategory: any = [];
  strSellerId: string;


  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogCategoriesMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private salesService: SalesService,
    private spinner: NgxSpinnerService
  ) {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.userData = data;
    console.log('edit', this.userData);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.salesService.getAllCategoriesData().subscribe(res => {
      console.log('category', res);
      this.categoriesData = res;
    });
  }

  onCategoriesChange(event, category) {

    console.log('category', category);

    this.changedCategory.push(category);
    console.log('  this.changedCategory', this.changedCategory);
  }

  saveCategories() {
    this.editCategory.IsActive = this.userData.IsActive;
    this.editCategory.SellerNameCode = this.userData.SellerNameCode;
    this.editCategory.TotalAmount = this.userData.TotalAmount;
    this.editCategory.TotalCustomer = this.userData.TotalCustomer;
    this.editCategory.TotalOrder = this.userData.TotalOrder;
    this.editCategory.TotalProductMapped = this.userData.TotalProductMapped;
    this.editCategory.TotalSeller = this.userData.TotalSeller;
    this.editCategory.address = this.userData.address;
    this.editCategory.addresses = this.userData.addresses;
    this.editCategory.cashYN = this.userData.cashYN;
    this.editCategory.categories = [];
    this.editCategory.categories = this.changedCategory;

    this.editCategory.city = this.userData.city;
    this.editCategory.creditLimit = this.userData.creditLimit;
    this.editCategory.creditYN = this.userData.creditYN;
    this.editCategory.customerId = this.userData.customerId;
    this.editCategory.emailid = this.userData.emailid;
    this.editCategory.homedelivery = this.userData.homedelivery;
    this.editCategory.homedeliverylimit = this.userData.homedeliverylimit;
    this.editCategory.id = this.userData.id;
    this.editCategory.menus = this.userData.menus;
    this.editCategory.mobilenumber = this.userData.mobilenumber;
    this.editCategory.name = this.userData.name;
    this.editCategory.newmobilenumber = this.userData.newmobilenumber;
    this.editCategory.onlineYN = this.userData.onlineYN;
    this.editCategory.password = this.userData.password;
    this.editCategory.pickup = this.userData.pickup;
    this.editCategory.pincode = this.userData.pincode;
    this.editCategory.referenceCode = this.userData.referenceCode;
    this.editCategory.role = this.userData.role;
    this.editCategory.state = this.userData.state;
    this.editCategory.token = this.userData.token;
    this.editCategory.userid = this.strSellerId;
    this.editCategory.username = this.userData.username;
    this.editCategory.vendorcode = this.userData.vendorcode;
    console.log(this.editCategory);
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.updateCategories(this.editCategory).subscribe(res => {
      console.log(res);
      this.toastr.success('Category Updated Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.spinner.hide();
      this.dialogRef.close();
    }, err => {
      this.spinner.hide();
    });
  }
}

import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { Product } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-product-data',
  templateUrl: './dialog-product-data.component.html',
  styleUrls: ['./dialog-product-data.component.scss']
})
export class DialogProductDataComponent implements OnInit {
  categoriesData: any = [];
  subCategoriesData: any = [];
  brandsData: any = [];
  productMeasurementData: any = [];
  strSellerId: string;
  product: Product = new Product();
  role: string;
 
  displayedColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  imageUrl: string;
  isImageSelected: boolean = false;

  filename: string = null;
  fileData: File = null;
  fileName: any;

  selectedProductMeasurementUnit: any;
  customProductMeasurementUnit: any = [];

  productForm: FormGroup;
  receivedProductData: any = [];
  categoryName: string;
  isButtonDisabled: boolean = false;

  modalRef: BsModalRef;
  message: string;
  isEditMode: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogProductDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.role = sessionStorage.getItem('role');

    this.productForm = this.formBuilder.group({

      categoryid: [''],
      subcategoryid: [''],
      name: [''],

      imgurl: [''],
      brandid: [''],
      descriptions: [''],
      hotkeyword: [''],

      measurementUnit: [''],
      varient: [''],
      price: [''],
    });
    this.receivedProductData = data;


    if (this.role == 'Admin') {
      this.displayedColumns = ['measurementUnit', 'varient', 'price', 'edit'];
    }
    else if (this.role == 'backoffice') {
      this.displayedColumns = ['measurementUnit', 'varient', 'price', 'edit'];
    }
    else if (this.role == 'Seller') {
      this.displayedColumns = ['measurementUnit', 'varient', 'price'];
    }
  }

  ngOnInit(): void {

    if (this.receivedProductData) {
      this.assignValues();
    }
    this.getCategoryData();
    this.getAllSubCategoriesData();
    this.getBrandsData();
    this.getProductMeasurementUnitData();
  }

  selectFile(e) {
    this.isImageSelected = true;
    this.fileData = <File>e.target.files[0];
    this.fileName = e.target.files[0].name;
  }

  getCategoryData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let parentid = '0';
    let userid = '1';
    this.salesService.getAllCategories(parentid, userid).subscribe(res => {

      this.categoriesData = res;

      if (this.role == 'Seller') {
        this.categoriesData = JSON.parse(sessionStorage.getItem('categories'));
      }
    }, err => {
      this.spinner.hide();
    });
  }

  getAllSubCategoriesData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let parentid = 'sub';
    this.salesService.getAllSubCategoriesData(parentid).subscribe(res => {
   
      this.subCategoriesData = res;
    }, err => {
      this.spinner.hide();
    });
  }

  getBrandsData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getBrandsData().subscribe(res => {
   
      this.brandsData = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getProductMeasurementUnitData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getProductMeasureMentUnit().subscribe(res => {
      this.productMeasurementData = res;
    
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  selectedCategoryFromList(res) {

    let parentid = res.id;
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getAllSubCategoriesData(parentid).subscribe(res => {
    
      this.subCategoriesData = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }

  selectedSubCategoryFromList(res) {

  }

  selectedBrandsFromList(res) {
    
  }

  selectectedMeasurementUnit(res) {
   
    this.selectedProductMeasurementUnit = res;

  }

  addProducts() {
 

    const index = this.customProductMeasurementUnit.findIndex((o) => Number(o.pricedecisionfactorid) === Number(this.product.measurementUnit));
    if (index === -1) {             // not exists

      let product = {
        id: "0",
        pricedecisionfactorid: this.product.measurementUnit.toString(),
        quantity: this.product.varient.toString(),
        price: this.product.price.toString(),
        isActive: "True",
        pricedecisionfactorname: this.selectedProductMeasurementUnit.name
      }
  
      this.customProductMeasurementUnit.push(product);
      this.dataSource = new MatTableDataSource(this.customProductMeasurementUnit);
      setTimeout(() => this.dataSource.paginator = this.paginator);

      this.product.varient = '';
      this.product.measurementUnit = '';
      this.product.price = '';
    }
    else {
         // exists
      for (let i = 0; i < this.customProductMeasurementUnit.length; i++) {
        if (Number(this.customProductMeasurementUnit[i].pricedecisionfactorid) === Number(this.product.measurementUnit)) {

          this.customProductMeasurementUnit[i].pricedecisionfactorid = this.product.measurementUnit.toString();
          this.customProductMeasurementUnit[i].quantity = this.product.varient.toString();
          this.customProductMeasurementUnit[i].price = this.product.price.toString();

        }
      }

      this.product.varient = '';
      this.product.measurementUnit = '';
      this.product.price = '';
    }


  }

  editProduct(response) {

    this.product.varient = response.quantity;
    this.product.measurementUnit = response.pricedecisionfactorid;
    this.product.price = response.price;
  }

  deleteProduct(response) {

   

    this.customProductMeasurementUnit = this.customProductMeasurementUnit.filter(item =>
      Number(item.pricedecisionfactorid) != Number(item.pricedecisionfactorid));

    this.product.varient = '';
    this.product.measurementUnit = '';
    this.product.price = '';
  
    this.dataSource = new MatTableDataSource(this.customProductMeasurementUnit);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  onSubmit() {
    this.isButtonDisabled = true;
    const formData = new FormData();



    if (this.receivedProductData) {


      let product = {
        "id": this.receivedProductData.id.toString(),
        "productid": "",
        "categoryid": this.product.categoryid.toString(),
        "categoryname": this.receivedProductData.categoryname,
        "subcategoryid": this.product.subcategoryid.toString(),
        "subcategoryname": this.receivedProductData.subcategoryname.toString(),
        "brandid": this.product.brandid.toString(),
        "brandname": this.receivedProductData.brandname.toString(),
        "name": this.product.name.toString(),
        "imgurl": this.imageUrl,
        "descriptions": this.product.descriptions.toString(),
        "hotkeyword": this.product.hotkeyword.toString(),
        "userid": this.strSellerId,
        "isactive": "True",
        "MRP": '',
        "Discount": '',
        "vendorCode": '',
        "FinalPrice": '',
        "PriceDecisionFactorName": '',
        "Quantity": '',
        "Unit": '',
        "ImageVersion": '',
        "mappingid": '',
        "brandImageUrl": '',
        "outOfStockFlag": '',
        "outOfStockMessage": '',
        "languageCode": '',
        "productDetails": [],
        "varients": this.customProductMeasurementUnit,
        "IsActive": "1"
      }


      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('product', JSON.stringify(product));
    



    }
    else {

      let product = {
        "varients": this.customProductMeasurementUnit,
        "categoryid": this.product.categoryid.toString(),
        "subcategoryid": this.product.subcategoryid.toString(),
        "brandid": this.product.brandid.toString(),
        "name": this.product.name.toString(),
        "imgurl": "",
        "descriptions": this.product.descriptions.toString(),
        "hotkeyword": this.product.hotkeyword.toString(),
        "id": "0",
        "IsActive": "1",
        "userid": this.strSellerId
      }
      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('product', JSON.stringify(product));


    }
    this.salesService.insertProducts(formData).subscribe(res => {
      this.toastr.success('Completed Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    });

  }

  assignValues() {
    this.isEditMode = true;
    this.product.name = this.receivedProductData.name;
    this.product.descriptions = this.receivedProductData.descriptions;

    this.product.categoryid = this.receivedProductData.categoryid;
    this.product.subcategoryid = this.receivedProductData.subcategoryid;
    this.product.brandid = this.receivedProductData.brandid;

    this.product.hotkeyword = this.receivedProductData.hotkeyword;
    this.imageUrl = this.receivedProductData.imgurl;

    this.customProductMeasurementUnit = this.receivedProductData.varients;
    if (this.customProductMeasurementUnit) {
      this.dataSource = new MatTableDataSource(this.customProductMeasurementUnit);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }



  deleteProductData() {
    let product = {
      "id": this.receivedProductData.id.toString(),
      "productid": "",
      "categoryid": this.product.categoryid.toString(),
      "categoryname": this.receivedProductData.categoryname,
      "subcategoryid": this.product.subcategoryid.toString(),
      "subcategoryname": this.receivedProductData.subcategoryname.toString(),
      "brandid": this.product.brandid.toString(),
      "brandname": this.receivedProductData.brandname.toString(),
      "name": this.product.name.toString(),
      "imgurl": this.imageUrl,
      "descriptions": this.product.descriptions.toString(),
      "hotkeyword": this.product.hotkeyword.toString(),
      "userid": '',
      "isactive": "True",
      "MRP": null,
      "Discount": null,
      "vendorCode": '',
      "FinalPrice": null,
      "PriceDecisionFactorName": '',
      "Quantity": '',
      "Unit": '',
      "ImageVersion": '',
      "mappingid": '',
      "brandImageUrl": '',
      "outOfStockFlag": '',
      "outOfStockMessage": '',
      "languageCode": 'En',
      "productDetails": [],
      "varients": this.customProductMeasurementUnit,
      "IsActive": "0"
    }

    this.isButtonDisabled = true;
    const formData = new FormData();

    formData.append('product', JSON.stringify(product));
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.deleteProducts(formData).subscribe(res => {
      this.toastr.error('Deleted Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    }, err => {
      this.spinner.hide();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.deleteProductData();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}

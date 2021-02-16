import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  product: Product = new Product();

  displayedColumns = ['measurementUnit', 'varient', 'price', 'edit'];
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

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogProductDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    public spinner: NgxSpinnerService
  ) {

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
    console.log('receivedProductData', this.receivedProductData);

  }

  ngOnInit(): void {
    if (this.receivedProductData) {
      this.assignValues();
    }
    this.getCategoryData();
    // this.getAllSubCategoriesData();
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
      console.log('cat data', res);
      this.categoriesData = res;
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
      console.log('sub cat data', res);
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
      console.log('brands data', res);
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
      console.log('productMeasurementData data', res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  selectedCategoryFromList(res) {
    console.log('cat', res);
    let parentid = res.id;
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getAllSubCategoriesData(parentid).subscribe(res => {
      console.log('sub cat data', res);
      this.subCategoriesData = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }

  selectedSubCategoryFromList(res) {
    console.log('sub cat', res);
  }

  selectedBrandsFromList(res) {
    console.log('brand', res);
  }

  selectectedMeasurementUnit(res) {
    console.log('MeasurementUnit', res);
    this.selectedProductMeasurementUnit = res;

  }

  addProducts() {
    console.log('this.product.measurementUnit', this.product.measurementUnit);

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
      console.log('not exists');
      this.customProductMeasurementUnit.push(product);
      this.dataSource = new MatTableDataSource(this.customProductMeasurementUnit);
      setTimeout(() => this.dataSource.paginator = this.paginator);

      this.product.varient = '';
      this.product.measurementUnit = '';
      this.product.price = '';
    }
    else {
      console.log('exists');       // exists
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

    console.log('deleted ', response);

    this.customProductMeasurementUnit = this.customProductMeasurementUnit.filter(item =>
      Number(item.pricedecisionfactorid) != Number(item.pricedecisionfactorid));

    this.product.varient = '';
    this.product.measurementUnit = '';
    this.product.price = '';
    console.log('after delete', this.customProductMeasurementUnit);
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
        "userid": "1",
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
      console.log('products', product);



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
        "userid": "1"
      }
      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('product', JSON.stringify(product));
      console.log('products', product);

    }
    this.salesService.insertProducts(formData).subscribe(res => {
      this.toastr.success('Completed Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    });

  }

  assignValues() {
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
      "userid": "1",
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
}

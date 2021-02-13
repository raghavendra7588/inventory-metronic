import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogProductDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
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
    let product = {
      id: "0",
      pricedecisionfactorid: this.selectedProductMeasurementUnit.id.toString(),
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

  editProduct(response) {
    alert('edit clicked');
    this.product.varient = response.quantity;
    this.product.measurementUnit = response.pricedecisionfactorid;
    this.product.price = response.price;
  }

  deleteProduct(response) {
    alert('delete clicked');
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

}

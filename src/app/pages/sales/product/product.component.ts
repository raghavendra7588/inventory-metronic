import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogProductDataComponent } from '../dialog-product-data/dialog-product-data.component';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: any;
  // displayedColumns = ['product', 'brand', 'category', 'subCategory', 'image', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }


  strSellerId: string;
  productData: any = [];
  isDataLoaded: boolean = false;

  role: string;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService

  ) {
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    if (this.role == 'Admin') {
      this.displayedColumns = ['product', 'brand', 'category', 'subCategory', 'image', 'edit'];
    }
    else {
      this.displayedColumns = ['product', 'brand', 'category', 'subCategory', 'image'];
    }

    this.getProductData(this.strSellerId);


    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getProductData(this.strSellerId);
      }
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.salesService.currentTab = 'Edit Product';
    this.dialog.open(DialogProductDataComponent, {
      height: '500px',
      width: '1000px',
      data: res,
      disableClose: true
    });
  }
  setDataSourceAttributes() {
    // this.dataSource.paginator = this.paginator;
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }
  openProductDialog() {
    this.salesService.currentTab = 'Add New Product';
    this.dialog.open(DialogProductDataComponent, {
      height: '500px',
      width: '1000px',
      disableClose: true
    });
  }


  getProductData(userId) {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getProductsData(userId).subscribe(res => {
      console.log('product', res);
      this.productData = res;
      this.dataSource = new MatTableDataSource(this.productData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
    }
      , err => {
        this.spinner.hide();
      });
  }


  downloadTheReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };

    const csvExporter = new ExportToCsv(options);
    if (this.isDataLoaded) {
      let requiredResponse = this.formatResponse(this.productData);
      csvExporter.generateCsv(requiredResponse);
    }

  }

  formatResponse(array) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < array.length; i++) {

      let item = {
        Number: j,
        id: array[i].id,
        name: array[i].name,
        categoryname: array[i].categoryname,
        descriptions: array[i].descriptions,
        imgurl: array[i].imgurl
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }
}

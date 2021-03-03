import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { EmitterService } from 'src/app/shared/emitter.service';
import { UpdateOutOfStockMessage } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-update-out-of-stock',
  templateUrl: './update-out-of-stock.component.html',
  styleUrls: ['./update-out-of-stock.component.scss']
})
export class UpdateOutOfStockComponent implements OnInit {


  displayedColumns = ['id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'outOfStockMsg', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  strSellerID: string;
  sellerData: any = [];
  role: string;
  filteredSellerData: any = [];

  sellerID: any;
  categoryID: any;
  subcategoryID: any;
  brandID: any;
  brandsId: any;
  subCategoryId: any;
  categoryId: any;

  categoriesData: any = [];
  subCategoriesData: any = [];
  brandsData: any = [];
  brandsResponse: any = [];

  selectedSellerID: any;
  unMappedProductData: any = [];
  updateOutOfStockMessage: UpdateOutOfStockMessage = new UpdateOutOfStockMessage();

  outOfStockFlag: string;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.strSellerID = sessionStorage.getItem('sellerId');

    this.getSellerUsers();
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getSellerUsers() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let currentRole = '';
    currentRole = 'Seller';

    this.salesService.getSellerUsers(currentRole).subscribe(res => {
      this.sellerData = res;
      console.log('current role', this.role);
      if (this.role == 'Seller') {
        console.log('current role **', this.role);
        this.filterSellerData(this.sellerData);
        this.categoriesData = JSON.parse(sessionStorage.getItem('categories'));
      }
      this.filteredSellerData = this.sellerData.slice();
      if (Array.isArray(this.sellerData) && this.sellerData.length) {
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
    this.filteredSellerData = this.sellerData.slice();
  }

  filterSellerData(arr) {
    let particularSellerArr = [];
    arr.filter(item => {
      if (Number(item.id) == Number(this.strSellerID)) {
        particularSellerArr.push(item);
      }
    });
    console.log('particularSellerArr', particularSellerArr);
    this.sellerData = particularSellerArr;
  }


  onSellerChange(event, res) {
    console.log('res', res);
    this.categoriesData = res.categories;

    this.sellerData = res.id;
    this.selectedSellerID = res.id;
    console.log('sellerData', this.sellerData);
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

    this.salesService.getMappedProducts(unmapppedData).subscribe(res => {
      this.unMappedProductData = res;
      console.log('unMappedProductData', this.unMappedProductData);
      this.dataSource = new MatTableDataSource(this.unMappedProductData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  editUpdateOutStockMsg(element) {
    console.log('element', element);

    this.updateOutOfStockMessage.AvailableQuantity = element.AvailableQuantity;
    this.updateOutOfStockMessage.BrandID = element.BrandID;
    this.updateOutOfStockMessage.BrandName = element.BrandName;
    this.updateOutOfStockMessage.Discount = element.Discount;
    this.updateOutOfStockMessage.FinalPrice = element.FinalPrice;
    this.updateOutOfStockMessage.Id = element.Id;
    this.updateOutOfStockMessage.IsActive = true;
    this.updateOutOfStockMessage.MRP = element.MRP;
    this.updateOutOfStockMessage.Name = element.Name;
    if (element.OutofStockFlag == true) {
      this.updateOutOfStockMessage.OutofStockFlag = false;
      this.outOfStockFlag = 'Product Updated As In Stock !!'
    }
    else {
      this.updateOutOfStockMessage.OutofStockFlag = true;
      this.outOfStockFlag = 'Product Updated As Out Of Stock !!'
    }
    this.updateOutOfStockMessage.OutofStockMsg = element.OutofStockMsg;
    this.updateOutOfStockMessage.ProductID = element.ProductID;
    this.updateOutOfStockMessage.ProductPrice = element.ProductPrice;
    this.updateOutOfStockMessage.ProductVarientId = element.ProductVarientId;
    this.updateOutOfStockMessage.Quantity = element.Quantity;
    this.updateOutOfStockMessage.SellerId = Number(this.selectedSellerID);
    this.updateOutOfStockMessage.SubCategoryID = element.SubCategoryID;
    this.updateOutOfStockMessage.userid = this.strSellerID;
    this.updateOutOfStockMessage.CategoryID = element.CategoryID;

    console.log('this.updateOutOfStockMessage', this.updateOutOfStockMessage);
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.saveUnmappedProducts(this.updateOutOfStockMessage).subscribe(res => {
      this.toastr.success(this.outOfStockFlag);
      this.outOfStockFlag = '';
      let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

      this.salesService.getMappedProducts(unmapppedData).subscribe(res => {
        this.unMappedProductData = res;
        console.log('unMappedProductData', this.unMappedProductData);
        this.dataSource = new MatTableDataSource(this.unMappedProductData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.subCategoryId = '';
        this.brandsId = '';

        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }, err => {
      this.spinner.hide();
    });
  }


  selectedCategoryFromList(res) {
    console.log('cat seelcted', res);
    this.categoryID = res.id;

    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    this.salesService.getCategoriesData(this.categoryID).subscribe(res => {
      this.subCategoriesData = res;
      this.spinner.hide();
    }, res => {
      this.spinner.hide();
    });

    let req = { CategoryId: this.categoryID, SellerId: this.selectedSellerID, SubCategoryId: '0' };
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    let mappedProductData: any = [];
    this.salesService.getMappedProducts(req).subscribe(res => {
      mappedProductData = res;
      console.log('mappedProductData', mappedProductData);
      this.dataSource = new MatTableDataSource(mappedProductData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, res => {
      this.spinner.hide();
    });
  }

  selectedSubCategoryFromList(res) {
    console.log('sub cat seelcted', res);
    let brands: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    let req = { CategoryId: this.categoryID, SellerId: this.selectedSellerID, SubCategoryId: res.id };
    this.salesService.getMappedProducts(req).subscribe(res => {
      brands = res;
      this.brandsResponse = res;
      console.log('brands data main', res);
      let uniqueBrandNamesArray = this.createUniqueBrandName(brands);
      this.brandsData = this.sortUniqueBrandName(uniqueBrandNamesArray);
      this.dataSource = new MatTableDataSource(brands);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, res => {
      this.spinner.hide();
    });
  }

  selectedBrandFromList(res) {
    console.log('brand seelcted', res);
    console.log('brands data from select list', this.brandsData);
    console.log('brands SEELCTED ID', this.brandsId);
    let remainingCategoriesArray = this.brandsResponse.filter(function (item) {
      return Number(item.BrandID) == Number(res.BrandID);
    });

    this.dataSource = new MatTableDataSource(remainingCategoriesArray);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }


  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID }
        sortedArray.push(item);
      }
    }
    return sortedArray;
  }

  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.BrandName.localeCompare(b.BrandName);
    });
    return array
  }
}

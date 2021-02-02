import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { InventoryService } from '../../inventory/inventory.service';
import { PriceList } from '../../purchase/purchase.model';
import { PurchaseService } from '../../purchase/purchase.service';
import { DialogProductVendorWisePurchaseReportComponent } from '../dialog-product-vendor-wise-purchase-report/dialog-product-vendor-wise-purchase-report.component';


import * as _ from 'lodash';
import { ExportToCsv } from 'export-to-csv';
import { ReportsService } from '../reports.service';
import { ProductVendorWisePurchaseReport } from '../reports.model';

@Component({
  selector: 'app-product-vendor-wise-purchase-report',
  templateUrl: './product-vendor-wise-purchase-report.component.html',
  styleUrls: ['./product-vendor-wise-purchase-report.component.scss']
})
export class ProductVendorWisePurchaseReportComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'BrandWiseTotal', 'totalOrders',
    'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount', 'print'];

  purchaseReport: ProductVendorWisePurchaseReport = new ProductVendorWisePurchaseReport();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  datePicker: any;
  objSeller: any;
  sellerName: string;
  sellerId: any;
  startDate: string;
  endDate: string;
  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];
  productArray: any = [];

  multipleCategoriesArray: any = [];
  categoriesArray1: any = [];
  categoriesArray2: any = [];
  categoriesArray3: any = [];
  public multipleBrandArray: any = [];
  array1: any = [];
  array2: any = [];
  array3: any = [];
  finalBrandArray: any = [];
  multipleBrands: any = [];
  brands1: any = [];
  brands2: any = [];
  brands3: any = [];
  categoryList: string;
  subCategoriesList: string;
  brandList: string;
  buyingPrice: any;
  price: any;
  dbData: any = [];
  catchMappedData: any = [];
  updateAllArray: any = [];
  updateAllRecordsCount: number = 0;
  multipleEntries = [];
  multipleEntriesArray: any = [];
  isPriceValid: any;
  isMultipleAmount: boolean;
  priceList: PriceList = new PriceList();
  masterBrandData: any = [];
  selectedBrandId: number;
  anyArray: any = [];
  uniqueBrandNamesArray = [];
  finalProductArray = [];
  allSelected = false;
  purchaseReportResponse: any = [];
  allBrandSelected: boolean = false;

  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};
  productSettings = {};
  categoryId: any;
  subCategoryId: any;
  finalProductNameArray: any = [];
  reportData: any = [];
  strSellerId: string;
  vendorId: any;
  vendorData: any = [];
  AllSubCategoryArray: any = [];
  AllCategoryArray: any = [];
  categorySearch: any = [];
  subCategorySearch: any = [];
  brandSearch: any = [];
  productSearch: any = [];

  constructor(public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private inventoryService: InventoryService,
    private reportsService: ReportsService) {
  }


  ngOnInit() {
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.strSellerId = sessionStorage.getItem('sellerId').toString();

    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    this.categorySearch = this.loginService.seller_object.categories;
    this.getPriceListData();
    this.getVendorData();


    this.productSettings = {
      singleSelection: false,
      idField: 'ProductID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 1
    }

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  selectedVendorFromList(item) {
    this.vendorId = item.vendorId;
  }

  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      console.log('vendor data minimum purchase reports ', this.vendorData);
    });
  }



  onSubCategorySelectAll() {
    console.log('inside sub cat select all');
    let catchMappedSubCategory: any = [];
    this.purchaseReport.subCategoryId = 'ALL'.toString();
    console.log('ng model sub cat', this.purchaseReport.subCategoryId);

    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);
      this.multipleBrandArray = catchMappedSubCategory;
      this.finalProductNameArray = [];
      let uniqueBrands = this.createUniqueBrandName(catchMappedSubCategory);

      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
      this.brandSearch = this.anyArray;
      console.log('any array', this.anyArray);
    });
    this.loginService.seller_object.categories = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
    this.finalProductNameArray = this.productSearch.slice();
  }


  onCategoriesChange(event, category: any) {
    let orderedSubCategoriesData: any = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          orderedSubCategoriesData = this.sortArrayInAscendingOrder(data);

          this.multipleCategoriesArray = orderedSubCategoriesData;
          this.subCategorySearch = this.multipleCategoriesArray;

        });
        let eachBrandData: any = [];
        let mappedData: any = [];
        let uniqueBrandName: any = [];
        console.log('category select category id', category.id);
        this.purchaseService.getEachBrand(category.id, '0').subscribe(data => {
          eachBrandData = data;



          mappedData = this.mapObj(eachBrandData, this.dbData);

        });


      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }

  }

  onSubCategoriesChange(event, subCategory: any) {

    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {

          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);

          this.multipleBrandArray = this.catchMappedData;

          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.brandSearch = this.anyArray;
          this.multipleBrandArray = this.catchMappedData;


        });
      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }


  }

  onProductChange(event, product: any) {
    console.log('required id', product.BrandID);
    console.log('multiple brand array', this.multipleBrandArray);
    if (event.isUserInput) {
      if (event.source.selected) {
        this.purchaseReport.brandId = product.BrandID;
        console.log('ng model', this.purchaseReport.brandId);
        this.brandArray.push(product.ProductID);
        // if (this.finalBrandArray.length === 0) {
        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;
        console.log('final product array', this.finalBrandArray);


        this.finalProductNameArray = this.finalBrandArray;
        this.productSearch = this.finalProductNameArray;
        // this.productSearch = this.finalProductNameArray;

        this.loginService.seller_object.categories = this.categorySearch.slice();
        this.multipleCategoriesArray = this.subCategorySearch.slice();
        this.anyArray = this.brandSearch.slice();
        this.finalProductNameArray = this.productSearch.slice();
      }

    }
  }


  changeProduct(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        console.log(product);
        this.purchaseReport.productId = product.ProductID;
        console.log('ng model', this.purchaseReport.productId);
      }
    }
  }

  onProductSelectAll() {
    this.purchaseReport.productId = 'ALL';

    console.log('ng model product all', this.purchaseReport.productId);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }



  viewPurchaseReport(response) {

    this.dialog.open(DialogProductVendorWisePurchaseReportComponent, {
      height: '600px',
      width: '1400px',
      data: response
    });
  }

  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
    });
  }
  downloadCSV() {
    let requiredResponse: any = [];
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: ['ProductName', 'Brand', 'Varient', 'BuyingPrice', 'Discount', 'BrandWiseTotal', 'TotalOrder',
        'TotalQuantityOrder', 'TotalFinalPrice', 'TotalDiscountPrice', 'FinalPurchaseAmount']
    };

    const csvExporter = new ExportToCsv(options);
    requiredResponse = this.formatResponse(this.purchaseReportResponse);
    csvExporter.generateCsv(requiredResponse);

  }

  formatResponse(array) {
    let formattedResponse: any = [];
    for (let i = 0; i < array.length; i++) {
      let item = {
        ProductName: array[i].ProductName, Brand: array[i].Brand, Varient: array[i].Varient,
        BuyingPrice: array[i].BuyingPrice, Discount: array[i].Discount, BrandTotal: array[i].BrandTotal,
        TotalOrder: array[i].TotalOrder, TotalQuantityOrder: array[i].TotalQuantityOrder, TotalFinalPrice: array[i].TotalFinalPrice,
        TotalDiscountPrice: array[i].TotalDiscountPrice, FinalPurchaseAmount: array[i].FinalPurchaseAmount
      }
      formattedResponse.push(item);
    }
    return formattedResponse;
  }
  searchRecords() {

    if (this.purchaseReport.vendorId === null || this.purchaseReport.vendorId === undefined || this.purchaseReport.vendorId === '') {
      this.purchaseReport.vendorId = 'ALL';
    }
    else {
      this.purchaseReport.vendorId = this.purchaseReport.vendorId;
    }

    if (this.purchaseReport.categoryId === null || this.purchaseReport.categoryId === undefined || this.purchaseReport.categoryId === '') {
      this.purchaseReport.categoryId = ['ALL'].toString();
    }
    else {
      this.purchaseReport.categoryId = this.purchaseReport.categoryId.toString();
    }

    if (this.purchaseReport.subCategoryId === null || this.purchaseReport.subCategoryId === undefined || this.purchaseReport.subCategoryId === '') {
      this.purchaseReport.subCategoryId = ['ALL'].toString();
    }
    else {
      this.purchaseReport.subCategoryId = this.purchaseReport.subCategoryId.toString();
    }

    if (this.purchaseReport.brandId === null || this.purchaseReport.brandId === undefined || this.purchaseReport.brandId === '') {
      this.purchaseReport.brandId = ['ALL'].toString();
    }
    else {
      this.purchaseReport.brandId = this.purchaseReport.brandId.toString();
    }

    if (this.purchaseReport.productId === null || this.purchaseReport.productId === undefined || this.purchaseReport.productId === '') {
      this.purchaseReport.productId = ['ALL'].toString();
    }
    else {
      this.purchaseReport.productId = this.purchaseReport.productId.toString();
    }
    // this.productArray
    if (this.startDate === null || this.startDate === undefined) {
      this.purchaseReport.startDate = 'ALL';
    }
    else {
      let startingDate = this.convertDate(this.startDate);
      this.purchaseReport.startDate = startingDate;
    }

    if (this.endDate === null || this.endDate === undefined) {
      this.purchaseReport.endDate = 'ALL';
    }
    else {
      let endingDate = this.convertDate(this.endDate);
      this.purchaseReport.endDate = endingDate;
    }
    this.purchaseReport.sellerId = this.strSellerId;
    console.log(this.purchaseReport);
    // this.inventoryService.getPurchaseOrderInventoryData(this.purchaseReport).subscribe(data => {
    //   this.reportData = data;
    //   let uniquePurchaseOrder = _.uniqBy(this.reportData, 'ProductVarientId');
    //   this.reportData = [];
    //   this.reportData = uniquePurchaseOrder;
    //   this.dataSource = new MatTableDataSource(this.reportData);
    // });

    this.reportsService.getProductVendorWiseData(this.purchaseReport).subscribe(data => {
      console.log('1 got result', data);
      this.purchaseReportResponse = data;
      let uniquePurchaseOrder = _.uniqBy(this.purchaseReportResponse, 'ProductVarientId');
      console.log(' 2 got result', uniquePurchaseOrder);
      this.reportData = [];
      this.purchaseReportResponse = uniquePurchaseOrder;
      console.log('3 got result', this.purchaseReportResponse);
      this.dataSource = new MatTableDataSource(this.purchaseReportResponse);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      // this.dataSource = new MatTableDataSource(this.purchaseReportResponse);
    });

  }

  mapObj(apiData, ownDbData) {
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      apiData[i].Discount = 0;
      apiData[i].FinalPrice = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
        }
      }
    }
    return apiData;
  }

  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID, Id: array[i].Id }
        sortedArray.push(item);
      }
    }
    return sortedArray;
  }

  createUniqueProductName(array: any) {
    let uniqueProductNameArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      // if ((uniqueProductNameArray.findIndex(p => p.Name.trim() == array[i].Name.trim())) == -1) {
      if ((uniqueProductNameArray.findIndex(p => Number(p.BrandID) == Number(array[i].BrandID))) == -1) {
        // var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID, Id: array[i].Id }
        let item = { Name: array[i].Name, ProductID: array[i].ProductID, BrandID: array[i].BrandID }
        uniqueProductNameArray.push(item);
      }
    }
    return uniqueProductNameArray;
  }
  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.BrandName.localeCompare(b.BrandName);
    });
    return array
  }

  sortArrayInAscendingOrder(array) {
    array.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return array;
  }

  convertDate(receivedDate) {
    let date = new Date(receivedDate);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const stringDate = [day, month, year].join("/");
    let fullDate = stringDate;
    return fullDate
  }


}

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
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { PaymentService } from '../../payment/payment.service';

@Component({
  selector: 'app-product-vendor-wise-purchase-report',
  templateUrl: './product-vendor-wise-purchase-report.component.html',
  styleUrls: ['./product-vendor-wise-purchase-report.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class ProductVendorWisePurchaseReportComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'totalOrders',
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



  particularCategory;
  strcategoryIdArray: any = [];
  strsubCategoryIdArray: any = [];
  numCategoryIdArray: any = [];
  strBrandIdArray: any = [];
  particularVendor: any = [];

  numSubcategoryIdArray: any = [];
  numBrandIdArray: any = [];
  particularCategoryArray: any = [];

  categoryOriginalArray: any = [];
  isVendorSelected: boolean = false;
  maxDate: any;
  latestPaymentData: any = [];
  role: string;

  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private inventoryService: InventoryService,
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private subheader: SubheaderService,
    public paymentService: PaymentService,
    public sharedService: SharedService,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.maxDate = new Date();
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.role = sessionStorage.getItem('role');

    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    this.categoryOriginalArray = this.loginService.seller_object.categories;
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

    };
    const csvExporter = new ExportToCsv(options);

    setTimeout(() => {
      this.subheader.setTitle('Purchase / Product Vendor Wise Purchase Report');
      this.subheader.setBreadcrumbs([{
        title: 'Product Vendor Wise Purchase Report',
        linkText: 'Product Vendor Wise Purchase Report',
        linkPath: '/purchase/productVendortWisePurchaseReport'
      }]);
    }, 1);
    if (this.role == 'Seller') {
      this.getLatestPaymentTransaction();
    } else {
      return;
    }
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  selectedVendorFromList(item) {
    this.isVendorSelected = true;
    this.purchaseReport.categoryId = '';
    this.loginService.seller_object.categories = this.categoryOriginalArray;
    this.vendorId = item.vendorId;
    this.reportsService.selectedVendorObj = item;
    this.vendorData.filter(item => {
      if (Number(item.vendorId) === Number(this.vendorId)) {
        this.particularVendor = item;
      }
    });

    this.dataSource = [];
    this.strcategoryIdArray = this.particularVendor.category;
    this.numCategoryIdArray = this.strcategoryIdArray.split(',').map(Number);


    this.strsubCategoryIdArray = this.particularVendor.subCategory;
    this.numSubcategoryIdArray = this.strsubCategoryIdArray.split(',').map(Number);


    this.strBrandIdArray = this.particularVendor.brand;
    this.numBrandIdArray = this.strBrandIdArray.split(',').map(Number);

    let particularCategory: any = [];
    this.particularCategoryArray = [];
    this.loginService.seller_object.categories.filter(item => {
      if (this.numCategoryIdArray.includes(Number(item.id))) {
        particularCategory = item;
        this.particularCategoryArray.push(particularCategory);
      }
    });
    this.particularCategoryArray = _.uniqBy(this.particularCategoryArray, 'id');


    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = _.uniqBy(this.particularCategoryArray, 'id');
    this.categorySearch = this.particularCategoryArray;
    if (this.numCategoryIdArray[0] == 0) {
      this.loginService.seller_object.categories = [];
    }
    this.particularCategoryArray = this.categorySearch.slice();

    this.multipleCategoriesArray = [];
    this.anyArray = [];
    this.finalProductNameArray = [];

    this.purchaseReport.subCategoryId = '';
    this.purchaseReport.categoryId = '';
    this.purchaseReport.brandId = '';
    this.purchaseReport.productId = '';
  }

  getVendorData() {
    this.spinner.show();
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }



  onSubCategorySelectAll() {

    let catchMappedSubCategory: any = [];
    this.purchaseReport.subCategoryId = 'ALL'.toString();

    this.spinner.show();
    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);
      this.multipleBrandArray = catchMappedSubCategory;
      this.finalProductNameArray = [];
      let uniqueBrands = this.createUniqueBrandName(catchMappedSubCategory);

      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
      this.brandSearch = this.anyArray;

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
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
        this.spinner.show();
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          orderedSubCategoriesData = this.sortArrayInAscendingOrder(data);

          if (this.isVendorSelected) {
            let particularSubCategoryArray: any = [];
            orderedSubCategoriesData.filter(item => {
              if (this.numSubcategoryIdArray.includes(Number(item.id))) {

                particularSubCategoryArray.push(item);
              }
            });

            this.multipleCategoriesArray = particularSubCategoryArray;
          }
          else {
            this.multipleCategoriesArray = orderedSubCategoriesData;
          }


          this.subCategorySearch = this.multipleCategoriesArray;

          this.anyArray = [];
          this.finalProductNameArray = [];
          this.purchaseReport.brandId = '';
          this.purchaseReport.productId = '';
          this.purchaseReport.subCategoryId = '';

          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          });
        let eachBrandData: any = [];
        let mappedData: any = [];
        let uniqueBrandName: any = [];

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
    let filteredBrandDataArray: any = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.spinner.show();

        this.purchaseService.getMappedUnMappedProducts(subCategory.parentid, subCategory.id).subscribe(data => {
          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
          this.multipleBrandArray = this.catchMappedData;

          if (this.isVendorSelected) {
            this.catchMappedData.filter(data => {

              if (this.numBrandIdArray.includes(Number(data.BrandID))) {
                filteredBrandDataArray.push(data);
              }
            });


            this.uniqueBrandNamesArray = this.createUniqueBrandName(filteredBrandDataArray);
            this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);

            this.brandSearch = this.anyArray;
            this.multipleBrandArray = this.catchMappedData;
          }
          else {
            this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
            this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
            this.brandSearch = this.anyArray;
            this.multipleBrandArray = this.catchMappedData;
          }


          this.spinner.hide();
          this.finalProductNameArray = [];
          this.purchaseReport.brandId = '';
          this.purchaseReport.productId = '';

        }, err => {
          this.spinner.hide();
        });
      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }


  }

  onProductChange(event, product: any) {

    if (event.isUserInput) {
      if (event.source.selected) {
        this.purchaseReport.brandId = product.BrandID;

        this.brandArray.push(product.ProductID);

        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;



        this.finalProductNameArray = this.finalBrandArray;
        this.productSearch = this.finalProductNameArray;

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

        this.purchaseReport.productId = product.ProductID;

      }
    }
  }

  onProductSelectAll() {
    this.purchaseReport.productId = 'ALL';
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }



  viewPurchaseReport(response) {

    this.dialog.open(DialogProductVendorWisePurchaseReportComponent, {
      height: '650px',
      width: '1500px',
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
      // this.purchaseReport.vendorId = 'ALL';
      this.toastr.error('Kindly Select Vendor');
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

    if (this.startDate === null || this.startDate === undefined) {
      this.purchaseReport.startDate = 'ALL';
    }
    else {
      let startingDate = this.valueChangedDate(this.startDate);
      this.purchaseReport.startDate = startingDate;
    }

    if (this.endDate === null || this.endDate === undefined) {
      this.purchaseReport.endDate = 'ALL';
    }
    else {
      let endingDate = this.valueChangedToDate(this.endDate);
      this.purchaseReport.endDate = endingDate;
    }
    this.purchaseReport.sellerId = this.strSellerId;

    this.reportsService.brandWiseRequestObject = this.purchaseReport;
    this.spinner.show();
    this.reportsService.getProductVendorWiseData(this.purchaseReport).subscribe(data => {

      this.purchaseReportResponse = data;
      let uniquePurchaseOrder = _.uniqBy(this.purchaseReportResponse, 'ProductVarientId');

      this.reportData = [];
      this.purchaseReportResponse = uniquePurchaseOrder;

      this.dataSource = new MatTableDataSource(this.purchaseReportResponse);
      setTimeout(() => this.dataSource.paginator = this.paginator);

      this.spinner.hide();

      this.isVendorSelected = false;

    },
      err => {
        this.spinner.hide();
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

      if ((uniqueProductNameArray.findIndex(p => Number(p.BrandID) == Number(array[i].BrandID))) == -1) {

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

  valueChangedDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate()}`.padStart(2, "0")
    let stringDate = [year, month, day].join("/");
    return stringDate;
  }

  valueChangedToDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate() + 1}`.padStart(2, "0")
    let stringDate = '';
    if (day == '32') {
      stringDate = [year, month, '31'].join("/") + ' ' + '23:59:59.999';
    }
    else {
      stringDate = [year, month, day].join("/");
    }
    return stringDate;
  }


  getLatestPaymentTransaction() {
    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.latestPaymentData = res;
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.latestPaymentData));

      var expiryDate = new Date(this.latestPaymentData[0].ExpiryDatee);
      var currentDate = new Date();

      if (expiryDate > currentDate) {

        this.spinner.hide();
        return;
      } else {

        this.sellerStatusChechpoint(this.latestPaymentData[0].PaymenId);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  sellerStatusChechpoint(PaymenId) {
    this.spinner.show();
    this.paymentService.updateSellerStatusCheckpoint(PaymenId).subscribe(res => {

      this.emitterService.isPaymentOrStatusChange.emit(true);
      this.router.navigate(['/payment/subscription']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
}

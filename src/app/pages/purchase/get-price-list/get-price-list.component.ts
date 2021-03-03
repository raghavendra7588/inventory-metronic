
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { customPriceList, CustomProductList, PriceList, PurchaseOrderItem } from '../purchase.model';
import { PurchaseService } from '../purchase.service';


@Component({
  selector: 'app-get-price-list',
  templateUrl: './get-price-list.component.html',
  styleUrls: ['./get-price-list.component.scss']
})
export class GetPriceListComponent implements OnInit {

  categoryId: any;
  priceListData: any = [];
  sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];
  categoryListData: any;
  dataSource: any;
  isDataLoaded: boolean = false;
  purchaseOrderItem: PurchaseOrderItem = new PurchaseOrderItem();
  priceList: PriceList = new PriceList();
  customPriceList: customPriceList = new customPriceList();
  customProductList: CustomProductList = new CustomProductList();
  @ViewChild('select') select: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  displayedColumns: string[] = ['select', 'productId', 'brandName', 'productName', 'quantity', 'actualPrice', 'discount', 'finalPrice', 'availableQuantity'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  datePicker: any;
  objSeller: any;
  sellerName: string;
  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];
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
  categoryList: any;
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
  isMultipleAmount: boolean = true;
  checkFinalPrice: boolean = true;
  selectedBrandId: number;
  anyArray: any = [];
  uniqueBrandNamesArray = [];
  allSelected = false;
  allBrandSelected: boolean = false;

  @ViewChild('check') check: MatCheckbox;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  totalAmount: number = 0;
  @Output() purchaseOrderListData = new EventEmitter<any[]>();
  finalPurchaseOrderArray: any = [];
  uniquePurchaseOrderItemArray: any = [];
  isAllPurchaseOrder: any = [];
  isProductSelected: boolean = false;
  receivedVendorId: number;
  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};
  particularCategoryArray: any = [];
  particularVendor: any = [];
  vendorData: any = [];
  selectedsubCategory: any = [];
  sortedCategory: any = [];
  numSubcategoryIdArray: any = [];
  numBrandIdArray: any = [];
  strSellerId: string;

  AllSubCategoryArray: any = [];
  AllCategoryArray: any = [];
  categorySearch: any = [];
  subCategorySearch: any = [];
  brandSearch: any = [];
  subCategoryId: any;
  isActive: boolean = true;
  providedInputAmount: number = 0;
  inputQuantityArray: any = [];
  brands: any;
  tempFinalPurchaseOrderArray: any = [];

  constructor(
    public purchaseService: PurchaseService,
    public loginService: LoginService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public emitterService: EmitterService,
    private dialogRef: MatDialogRef<GetPriceListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService) {

    this.isDataLoaded = false;
    this.isProductSelected = false;
    this.receivedVendorId = data;
    console.log('received vendor id', this.receivedVendorId);

    console.log('this.purchaseService.selectedVendorIdForPurchaseOrder', this.purchaseService.selectedVendorIdForPurchaseOrder);
  }

  ngOnInit(): void {


    this.dataSource = new MatTableDataSource();
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerId = sessionStorage.getItem('sellerId');
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));

    this.getPriceListData();
    this.getBrandsMasterData();
    this.filterCategoryList();

  }
  filterCategoryList() {

    let particularCategory;
    let strcategoryIdArray: any = [];
    let strsubCategoryIdArray: any = [];
    let numCategoryIdArray: any = [];
    let strBrandIdArray: any = [];

    console.log('get all vendor data in get price list', this.purchaseService.allvendorData);
    this.purchaseService.allvendorData.filter(item => {
      if (Number(item.vendorId) === Number(this.receivedVendorId)) {
        this.particularVendor = item;
      }
    });
    console.log('particular vendor', this.particularVendor);
    strcategoryIdArray = this.particularVendor.category;
    numCategoryIdArray = strcategoryIdArray.split(',').map(Number);
    console.log('int category array', numCategoryIdArray);
    strsubCategoryIdArray = this.particularVendor.subCategory;
    this.numSubcategoryIdArray = strsubCategoryIdArray.split(',').map(Number);
    console.log('int sub category array', this.numSubcategoryIdArray);

    strBrandIdArray = this.particularVendor.brand;
    this.numBrandIdArray = strBrandIdArray.split(',').map(Number);

    console.log('int brand array', this.numBrandIdArray);
    this.loginService.seller_object.categories.filter(item => {

      if (numCategoryIdArray.includes(Number(item.id))) {

        particularCategory = item;
        this.particularCategoryArray.push(particularCategory);
      }
    });

    console.log('particular category array', this.particularCategoryArray);
    if (this.particularCategoryArray.length === 1 || this.particularCategoryArray.length === 0) {
      console.log('less than one', this.particularCategoryArray[0].id);
      this.categoryList = this.particularCategoryArray[0].id;
    }
    this.categorySearch = this.particularCategoryArray;
  }

  filterSubCategoryList() {

  }


  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      this.purchaseService.allvendorData = data;
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isAllSelected() {

    const numSelected = this.selection.selected.length;
    this.updateAllRecordsCount = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.updateAllRecordsCount = 0;
    }
    else {
      this.dataSource.data.forEach((row) => {
        this.selection.select(row);
      });
    }
  }


  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
  }



  updateAll() {
    this.checkFinalPrice = true;
    // if (this.updateAllRecordsCount != this.providedInputAmount) {
    //   this.toastr.error('Kindly Select Required CheckBoxes');
    //   return;
    // }
    this.selection.selected.forEach((element) => {
      if (this.checkFinalPrice === false) {
        return;
      }

      this.checkFinalPrice = this.checkItemFinalPrice(element);
      if (!this.checkFinalPrice) {
        this.toastr.error('Please Check Purchase Quantity');
      }
    });
    if (this.checkFinalPrice) {
      this.selection.selected.forEach((element) => {
        this.multipleEntriesArray.push(element);
        this.uniquePurchaseOrderItemArray = this.uniqueEntries(this.multipleEntriesArray, element);
        this.isActive = false;
      });
      this.postMultipleInsertion(this.uniquePurchaseOrderItemArray);
    }
  }
  uniqueEntries(arr, obj) {
    let isExist = arr.some(o => o.ProductVarientId === obj.ProductVarientId && o.Id === obj.Id);
    if (!isExist)
      arr.push(obj);
    return arr;
  }
  getBrandsMasterData() {
    setTimeout(() => {
      this.purchaseService.getEveryBrand().subscribe(data => {
        this.masterBrandData = data;
      },
        err => {
          this.toastr.error('An Error Occured !!');
        });
    }, 400);
  }



  onCategoryDeSelect(event) {

    let remainingCategoriesArray = this.multipleCategoriesArray.filter(function (item) {
      return Number(item.parentid) !== Number(event.id);
    });
    this.multipleCategoriesArray = [];
    this.multipleCategoriesArray = remainingCategoriesArray;

    if (this.multipleCategoriesArray.length === 0) {
      this.multipleCategoriesArray = [];
      this.anyArray = [];
      this.dataSource = [];
    }
  }


  onCategorySelectAll() {

    let catchMappedCategory: any = [];
    let filteredCategoryData: any = [];
    let filteredBrandData: any = [];
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.AllCategoryArray = data;
      this.multipleCategoriesArray = [];

      catchMappedCategory = this.mapObj(this.AllCategoryArray, this.dbData);

      this.dataSource = [];

      catchMappedCategory.filter(data => {
        if (this.numSubcategoryIdArray.includes(Number(data.SubCategoryID))) {
          filteredCategoryData.push(data);
        }
      });
      console.log('filteredCategoryData', filteredCategoryData);

      this.subCategorySearch = filteredCategoryData;

      catchMappedCategory.filter(data => {

        if (this.numBrandIdArray.includes(Number(data.BrandID))) {
          filteredBrandData.push(data);
        }
      });

      this.dataSource = new MatTableDataSource(filteredBrandData);
      this.dataSource.paginator = this.paginator;

      let uniqueBrandName = this.createUniqueBrandName(filteredBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);

      this.brandSearch = this.anyArray;

      console.log('any array in cat', this.anyArray);
    },
      err => {
        this.toastr.error('An Error Occured !!');
        this.spinner.hide();
      });
    this.particularCategoryArray = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
  }


  onSubCategorySelectAll() {

    let catchMappedSubCategory: any = [];
    let filteredSubCategoryData: any = [];
    let filteredBrandData: any = [];

    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);


      catchMappedSubCategory.filter(data => {
        if (this.numSubcategoryIdArray.includes(Number(data.SubCategoryID))) {
          filteredSubCategoryData.push(data);
        }
      });

      console.log('filteredSubCategoryData', filteredSubCategoryData);
      catchMappedSubCategory.filter(data => {
        if (this.numBrandIdArray.includes(Number(data.BrandID))) {
          filteredBrandData.push(data);
        }
      });
      console.log('filteredBrandData', filteredBrandData);

      this.dataSource = new MatTableDataSource(filteredBrandData);
      this.dataSource.paginator = this.paginator;

      let uniqueBrands = this.createUniqueBrandName(filteredBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrands);

      this.brandSearch = this.anyArray;
      console.log('any array', this.anyArray);
    },
      err => {
        this.toastr.error('An Error Occured !!');
        this.spinner.hide();
      });
    this.particularCategoryArray = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
  }

  onBrandSelectAll() {
    let mappedBrandData: any = [];
    let brandData: any = [];
    let uniqueBrandNameData: any = [];

    this.purchaseService.getAllBrand(this.categoryId, this.subCategoryId).subscribe(data => {

      brandData = data;

      mappedBrandData = this.mapObj(brandData, this.dbData);

      this.dataSource = new MatTableDataSource(mappedBrandData);
      this.dataSource.paginator = this.paginator;
      uniqueBrandNameData = this.createUniqueBrandName(mappedBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandNameData);

      this.brandSearch = this.anyArray;

    },
      err => {
        this.toastr.error('An Error Occured !!');
        this.spinner.hide();
      });
    this.particularCategoryArray = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
  }





  onCategoriesChange(event, category: any) {

    console.log('current category id is', this.categoryList);
    this.spinner.show();
    if (this.receivedVendorId > 0) {
      event.isUserInput = true;
    }
    if (event.isUserInput) {
      let catchMappedCategoryData: any = [];
      if (event.source.selected) {
        this.brands = '';
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {

          this.multipleCategoriesArray = data;
          this.subCategorySearch = this.multipleCategoriesArray;
          this.sortedCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);


          let particularSubCategoryArray: any = [];

          this.sortedCategory.filter(item => {
            if (this.numSubcategoryIdArray.includes(Number(item.id))) {
              particularSubCategoryArray.push(item);
            }
            this.multipleCategoriesArray = particularSubCategoryArray;
            this.subCategorySearch = this.multipleCategoriesArray;
          });
          this.spinner.hide();
        },
          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          });

        this.particularCategoryArray = this.categorySearch.slice();
        this.multipleCategoriesArray = this.subCategorySearch.slice();

      }

    }

    if (!event.source.selected) {
      let newCategoriesArr = this.multipleCategoriesArray.filter(function (item) {
        return Number(item.parentid) !== Number(category.id);
      });
      this.multipleCategoriesArray = newCategoriesArr;
      const index = this.categoriesArray.indexOf(category.id);
      if (index > -1) {
        this.categoriesArray.splice(index, 1);
      }
    }
  }

  onSubCategoriesChange(event, subCategory: any) {
    let filteredBrandDataArray: any = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.spinner.show();
        // this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
        this.purchaseService.getMappedUnMappedProducts(subCategory.parentid, subCategory.id).subscribe(data => {
          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
          this.multipleBrandArray = this.catchMappedData;
          console.log('sub this.catchMappedData', this.catchMappedData);


          this.catchMappedData.filter(data => {

            if (this.numBrandIdArray.includes(Number(data.BrandID))) {
              filteredBrandDataArray.push(data);
            }
          });
          console.log('filteredBrandDataArray **', filteredBrandDataArray);
          this.uniqueBrandNamesArray = this.createUniqueBrandName(filteredBrandDataArray);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.brandSearch = this.anyArray;
          this.multipleBrandArray = this.catchMappedData;
          console.log('this.receivedVendorId &', this.receivedVendorId);
          let onlyVendorSpecificProducts = [];
          //  filteredBrandDataArray.filter(function (item) {
          //       return Number(item.OutofStockMsg) == Number(this.receivedVendorId);
          //     });
          filteredBrandDataArray.filter(data => {

            if (Number(data.OutofStockMsg) == Number(this.receivedVendorId)) {
              onlyVendorSpecificProducts.push(data);
            }
          });
          console.log('onlyVendorSpecificProducts', onlyVendorSpecificProducts);
          this.dataSource = new MatTableDataSource(onlyVendorSpecificProducts);
          this.dataSource.paginator = this.paginator;

          this.particularCategoryArray = this.categorySearch.slice();
          this.multipleCategoriesArray = this.subCategorySearch.slice();
          this.anyArray = this.brandSearch.slice();
          this.spinner.hide();
        },
          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          });
      }
    }
    if (!event.source.selected) {
      let newArr = [];
      newArr = this.anyArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id;
      });
      this.anyArray = [];
      this.anyArray = newArr;
      let unSelectedSubCategoryArray = this.finalBrandArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id
      });
      this.finalBrandArray = unSelectedSubCategoryArray;
      this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
      this.dataSource.paginator = this.paginator;
    }

  }

  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.dataSource = [];
        this.brandArray.push(product.ProductID);
        this.spinner.show();

        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;


        this.dataSource = [];
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;

        this.particularCategoryArray = this.categorySearch.slice();
        this.multipleCategoriesArray = this.subCategorySearch.slice();

        this.spinner.hide();
      }
      if (!event.source.selected) {
        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product.BrandName;
        });
        this.finalBrandArray = tempArr;
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
      console.log('our own data', this.dbData);
    },
      err => {
        this.toastr.error('An Error Occured !!');
        this.spinner.hide();
      });
  }

  mapObj(apiData, ownDbData) {
    let exisitingRecords: any = [];
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      apiData[i].Discount = 0;
      apiData[i].FinalPrice = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId && Number(apiData[i].Id) === Number(ownDbData[j].ReferenceId)) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
          if (ownDbData[j].VendorId == undefined || ownDbData[j].VendorId == null) {
            apiData[i].IsActive = 0;
          } else {
            apiData[i].IsActive = ownDbData[j].VendorId;
          }

          exisitingRecords.push(apiData[i]);
        }
      }
    }
    return exisitingRecords;
  }

  postMultipleInsertion(elements) {
    elements.forEach(element => {
      this.customPriceList = new customPriceList();
      this.customPriceList.priceListId = element.priceListId;
      this.customPriceList.sellerId = element.SellerId;
      this.customPriceList.productId = element.ProductID;
      this.customPriceList.subCategoryId = element.SubCategoryID;
      this.customPriceList.brandId = element.BrandID;
      this.customPriceList.buyingPrice = element.ProductPrice;
      this.customPriceList.finalPrice = element.FinalPrice;
      this.customPriceList.ReferenceId = element.Id;
      this.customPriceList.discount = element.Discount;
      this.customPriceList.availableQuantity = element.AvailableQuantity;
      this.customPriceList.quantity = element.Quantity;
      this.customPriceList.ProductVarientId = element.ProductVarientId;
      this.customPriceList.BrandName = element.BrandName;
      this.customPriceList.Name = element.Name;
      this.customPriceList.CategoryId = Number(element.CategoryID);

      console.log('customPriceList list', this.customPriceList);
      this.isMultipleAmount = true;

      this.customPriceList.finalPrice = Number(element.FinalPrice) * Number(element.AvailableQuantity);
      this.multipleEntries.push(this.customPriceList);

    });
    this.toastr.success('price list saved');
    this.updateAllRecordsCount = 0;
    this.updateAllArray = [];
    this.selection.clear();
    let mulitpleFinalPurchaseOrderArray: any = [];
    let concatPurchaseOrderProducts: any = [];
    this.finalPurchaseOrderArray = this.multipleEntries;

    this.multipleEntriesArray = [];
    this.multipleEntries = [];

    if (this.tempFinalPurchaseOrderArray.length === 0) {
      this.tempFinalPurchaseOrderArray = this.finalPurchaseOrderArray;
      console.log('this.finalPurchaseOrderArray single ', this.finalPurchaseOrderArray);
    }
    else {
      mulitpleFinalPurchaseOrderArray = this.finalPurchaseOrderArray;
      concatPurchaseOrderProducts = [...this.tempFinalPurchaseOrderArray, ...mulitpleFinalPurchaseOrderArray];
      this.finalPurchaseOrderArray = concatPurchaseOrderProducts;
      this.tempFinalPurchaseOrderArray = this.finalPurchaseOrderArray;
      console.log('this.finalPurchaseOrderArray multiple', this.finalPurchaseOrderArray);
    }


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


  checkItemFinalPrice(element) {
    let prevFinalPrice = 0;
    let isRecordValid: boolean = true;
    prevFinalPrice = element.FinalPrice;
    let purchasedQuantity = element.AvailableQuantity;

    if (purchasedQuantity < 1 || (Number(element.ProductPrice) < 1) || (Number(element.FinalPrice) < 1)) {
      isRecordValid = false;
    } else {
      if ((Number(element.ProductPrice) - Number(element.Discount) === Number(element.FinalPrice)) || (Number(element.ProductPrice) - Number(element.Discount) === (Number(element.FinalPrice)) / element.AvailableQuantity)) {
        isRecordValid = true;
      }
      else {
        isRecordValid = false;
      }
    }
    return isRecordValid;
  }


  sendPurchaseOrder() {
    this.emitterService.sendPurchaseOrder.emit(this.finalPurchaseOrderArray);
    this.dialogRef.close();
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

  calculateProvidedQuantity(providedInputQuantity, productData) {
    console.log('eleement', productData);
    if (Number(providedInputQuantity) > 0) {

      if (this.inputQuantityArray.includes(productData.Id)) {
        console.log("value exists");
        console.log('providedInputAmount', this.providedInputAmount);
        console.log('inputQuantityArray', this.inputQuantityArray);
        return;
      }

      else {
        console.log("does not exist");
        this.inputQuantityArray.push(productData.Id);
        this.providedInputAmount++;
        console.log('providedInputAmount', this.providedInputAmount);
        console.log('inputQuantityArray', this.inputQuantityArray);
      }


    }
    else if ((Number(providedInputQuantity) == 0)) {
      if (this.inputQuantityArray.includes(productData.Id)) {
        console.log("made to 0 ");
        this.providedInputAmount--;
        this.inputQuantityArray = this.inputQuantityArray.filter(item => item !== productData.Id)
        console.log('providedInputAmount', this.providedInputAmount);
        console.log('inputQuantityArray', this.inputQuantityArray);
        return;
      }

    }
    else {
      console.log('providedInputAmount', this.providedInputAmount);
      console.log('inputQuantityArray', this.inputQuantityArray);
      return;
    }
  }

  ngOnDestroy() {
    this.isDataLoaded = false;
  }

}

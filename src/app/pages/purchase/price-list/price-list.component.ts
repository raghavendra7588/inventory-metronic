import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PriceList } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'brandName', 'productName', 'quantity', 'actualPrice', 'discount', 'finalPrice', 'save'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  datePicker: any;
  objSeller: any;
  sellerName: string;
  sellerId: any;

  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];

  selectedCategory: any = [];
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
  selectedSubCategory: any = [];
  allSelected = false;
  allBrandSelected: boolean = false;

  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  categoryId: string;
  subCategoryId: string;
  AllSubCategoryArray: any = [];
  AllCategoryArray: any = [];
  categorySearch: any = [];
  subCategorySearch: any = [];
  brandSearch: any = [];

  providedInputAmount: number = 0;
  inputQuantityArray: any = [];

  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));

    let data = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = data;
    this.categorySearch = this.loginService.seller_object.categories;

    this.getPriceListData();
    this.getBrandsMasterData();

  }

  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
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

  logSelection() {
    this.isPriceValid = true;
    this.isMultipleAmount = true;

    if (this.updateAllRecordsCount != this.providedInputAmount) {
      this.toastr.error('Kindly Select Required CheckBoxes');
      return;
    }

    this.selection.selected.forEach((element) => {
      this.updateAllArray.push(element);
      this.multipleEntriesArray.push(element);
    });
    this.postMultipleInsertion(this.multipleEntriesArray);

    this.updateAllRecordsCount = this.updateAllArray.length;
    this.multipleEntriesArray = [];
    this.updateAllArray = [];
    this.updateAllRecordsCount = 0;
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

  onCategorySelectAll() {
    console.log('inside cat seelct all');
    let catchMappedCategory: any = [];
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.AllCategoryArray = data;
      this.multipleCategoriesArray = [];
      catchMappedCategory = this.mapObj(this.AllCategoryArray, this.dbData);
      this.dataSource = [];
      this.dataSource = new MatTableDataSource(catchMappedCategory);
      this.dataSource.paginator = this.paginator;

      let uniqueBrandName = this.createUniqueBrandName(this.AllCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
      console.log(this.anyArray);
      this.brandSearch = this.anyArray;
      console.log('any array in cat', this.anyArray);
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
    },
      err => {
        this.toastr.error('An Error Occured !!');
        this.spinner.hide();
      });

  }


  onSubCategorySelectAll() {
    console.log('inside sub cat select all');
    let catchMappedSubCategory: any = [];
    console.log('cat id', this.categoryId.toString());
    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);

      this.dataSource = new MatTableDataSource(catchMappedSubCategory);
      this.dataSource.paginator = this.paginator;

      let uniqueBrands = this.createUniqueBrandName(this.AllSubCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
      this.brandSearch = this.anyArray;

      console.log('any array', this.anyArray);
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
    }
      ,
      err => {
        this.toastr.error('Backend Server Seems to be Down !!');
        this.spinner.hide();
      });

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
      console.log(this.anyArray);
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
    },
      err => {
        this.toastr.error('An Error Occured !!');
        this.spinner.hide();
      });
  }

  onCategoriesChange(event, category: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.spinner.show();
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          this.multipleCategoriesArray = data;
          this.subCategorySearch = this.multipleCategoriesArray;

        },
          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          }
        );
        let eachBrandData: any = [];
        let mappedData: any = [];
        let uniqueBrandName: any = [];
        console.log('category select category id', category.id);
        this.purchaseService.getEachBrand(category.id, '0').subscribe(data => {
          eachBrandData = data;
          mappedData = this.mapObj(eachBrandData, this.dbData);
          this.dataSource = new MatTableDataSource(mappedData);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        },
          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          }
        );


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
    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.spinner.show();
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
          this.multipleBrandArray = this.catchMappedData;

          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          console.log(this.anyArray);
          this.multipleBrandArray = this.catchMappedData;
          this.brandSearch = this.anyArray;
          this.dataSource = new MatTableDataSource(this.catchMappedData);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        }
          ,
          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          });
        this.anyArray = this.brandSearch.slice();
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
        this.spinner.show();
        this.dataSource = [];
        this.brandArray.push(product.ProductID);

        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;


        this.dataSource = [];
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;
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

  editPriceList(element) {
    if (element.priceListId) {

      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;
      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;
      this.priceList.ReferenceId = element.Id;
      this.priceList.discount = element.Discount;
      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      this.priceList.CategoryId = Number(element.CategoryID);
      console.log('price list', this.priceList);

      this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
        this.toastr.success('Price List Updated');
      },
        err => {
          this.toastr.error('An Error Occured !!');
          this.spinner.hide();
        });
    }
    else {

      this.priceList.priceListId = element.priceListId;
      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;

      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;

      this.priceList.ReferenceId = element.Id;

      this.priceList.discount = element.Discount;

      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      this.priceList.CategoryId = Number(element.CategoryID);
      console.log('price list', this.priceList);

      let isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
      if (isPriceValid) {
        this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
          this.toastr.success('Price List Updated');
          this.priceList.buyingPrice = 0;
          this.priceList.discount = 0;
          this.priceList.finalPrice = 0;
        },

          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          });
      }
      else {
        this.toastr.error('Please Check Buying Price, Discount and Final Price');
      }
    }
  }

  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
    },
      err => {
        this.toastr.error('An Error Occured !!');
        // this.spinner.hide();
      });
  }


  postMultipleInsertion(elements) {

    elements.forEach(element => {
      console.log('single One', element)
      this.priceList = new PriceList();
      this.priceList.priceListId = element.priceListId;
      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;

      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;

      this.priceList.ReferenceId = element.Id;

      this.priceList.discount = element.Discount;
      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      this.priceList.CategoryId = Number(element.CategoryID);
      console.log('price list', this.priceList);

      this.isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
      if (this.isPriceValid) {
        this.multipleEntries.push(this.priceList);
        if (!this.isMultipleAmount) {
          return;
        }
        else {
          this.isMultipleAmount = true;
        }
      }
      else {
        this.isMultipleAmount = false;
        this.toastr.error('Please Check Buying Price, Discount and Final Price');
        return;
      }

    });
    if (this.isMultipleAmount) {
      this.selection.clear();
      this.updateAllRecordsCount = 0;
      this.purchaseService.saveMultiplePriceList(this.multipleEntries).subscribe(data => {
        this.selection.clear();
        this.updateAllRecordsCount = 0;
        this.priceList = new PriceList();
        this.priceList.buyingPrice = 0;
        this.priceList.discount = 0;
        this.priceList.finalPrice = 0;
        this.updateAllArray = [];
        this.multipleEntriesArray = [];
        this.toastr.success('Price List Saved');
        this.updateAllRecordsCount = 0;
      },
        err => {
          this.toastr.error('An Error Occured !!');
          this.spinner.hide();
        });
      this.updateAllRecordsCount = 0;
    }
    else {
      this.toastr.error('Please Check Buying Price, Discount and Final Price');
      this.multipleEntriesArray = [];
    }
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
    console.log('inside funcn *', array);
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
}

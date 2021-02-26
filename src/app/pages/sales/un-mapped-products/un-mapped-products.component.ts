import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SaveUnMappedProducts, UnmappedProducts } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-un-mapped-products',
  templateUrl: './un-mapped-products.component.html',
  styleUrls: ['./un-mapped-products.component.scss']
})
export class UnMappedProductsComponent implements OnInit {

  displayedColumns = ['select', 'id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'availableQuantity', 'save'];
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
  unmappedProducts: UnmappedProducts = new UnmappedProducts();
  saveUnMappedProducts: SaveUnMappedProducts = new SaveUnMappedProducts

  updateAllArray: any = [];
  updateAllRecordsCount: number = 0;
  multipleEntries = [];
  multipleEntriesArray: any = [];
  isPriceValid: any;
  isMultipleAmount: boolean;


  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<any>(true, []);

  providedInputAmount: number = 0;
  inputQuantityArray: any = [];
  counter: number = 1;


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
    // if (this.role == 'Admin') {
    currentRole = 'Seller';
    // }
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
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.sellerData = res.id;
    this.selectedSellerID = res.id;
    console.log('sellerData', this.sellerData);

    let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

    this.salesService.getUnmappedProductData(unmapppedData).subscribe(res => {
      this.unMappedProductData = res;
      console.log('unMappedProductData', this.unMappedProductData);
      this.dataSource = new MatTableDataSource(this.unMappedProductData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    },
      err => {
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
    this.salesService.getUnmappedProductData(req).subscribe(res => {
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
    this.salesService.getUnmappedProductData(req).subscribe(res => {
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


  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
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
    this.counter = 1;
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

  postMultipleInsertion(elements) {

    elements.forEach(element => {
      console.log('single One', element);
      this.saveUnMappedProducts = new SaveUnMappedProducts();
      this.saveUnMappedProducts.AvailableQuantity = element.AvailableQuantity;
      this.saveUnMappedProducts.BrandID = element.BrandID;
      this.saveUnMappedProducts.BrandName = element.BrandName;
      this.saveUnMappedProducts.Discount = element.Discount;
      this.saveUnMappedProducts.FinalPrice = element.FinalPrice;
      this.saveUnMappedProducts.Id = element.Id;
      this.saveUnMappedProducts.IsActive = element.IsActive;
      this.saveUnMappedProducts.MRP = element.MRP;
      this.saveUnMappedProducts.Name = element.Name;
      this.saveUnMappedProducts.ProductID = element.ProductID;
      this.saveUnMappedProducts.ProductPrice = element.ProductPrice;
      this.saveUnMappedProducts.ProductVarientId = element.ProductVarientId;
      this.saveUnMappedProducts.Quantity = element.Quantity;
      this.saveUnMappedProducts.SellerId = element.SellerId;
      this.saveUnMappedProducts.SubCategoryID = element.SubCategoryID;
      this.saveUnMappedProducts.userid = this.strSellerID;

      let isPriceValid = (Number(this.saveUnMappedProducts.ProductPrice) - Number(this.saveUnMappedProducts.Discount)) === Number(this.saveUnMappedProducts.FinalPrice);
      if (isPriceValid) {
        // this.multipleEntries.push(this.saveUnMappedProducts);
        this.spinner.show(undefined,
          {
            type: "square-jelly-box",
            size: "medium",
            color: 'white'
          }
        );
        this.selection.clear();
        this.updateAllRecordsCount = 0;

        this.salesService.saveUnmappedProducts(this.saveUnMappedProducts).subscribe(data => {
          this.selection.clear();
          this.updateAllRecordsCount = 0;
          this.saveUnMappedProducts = new SaveUnMappedProducts();
          this.updateAllArray = [];
          this.multipleEntriesArray = [];
          if (this.counter == 1) {
            this.toastr.success('Added Into the List Successfully !!');
          }
          this.counter--;
          this.updateAllRecordsCount = 0;

          let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

          this.salesService.getUnmappedProductData(unmapppedData).subscribe(res => {
            this.unMappedProductData = res;
            console.log('unMappedProductData', this.unMappedProductData);
            this.dataSource = new MatTableDataSource(this.unMappedProductData);
            setTimeout(() => this.dataSource.paginator = this.paginator);
            this.spinner.hide();
          });
          this.spinner.hide();
        },
          err => {
            this.toastr.error('An Error Occured !!');
            this.spinner.hide();
          });
        this.updateAllRecordsCount = 0;
        if (!this.isMultipleAmount) {
          return;
        }
        else {
          this.isMultipleAmount = true;
        }
      }
      else {
        this.isMultipleAmount = false;
        this.toastr.error('Please Check Product Price, Discount and Final Price');
        return;
      }

    });


  }

  saveList(element) {
    console.log('save clicked', element);
    this.saveUnMappedProducts.AvailableQuantity = element.AvailableQuantity;
    this.saveUnMappedProducts.BrandID = element.BrandID;
    this.saveUnMappedProducts.BrandName = element.BrandName;
    this.saveUnMappedProducts.Discount = element.Discount;
    this.saveUnMappedProducts.FinalPrice = element.FinalPrice;
    this.saveUnMappedProducts.Id = element.Id;
    this.saveUnMappedProducts.IsActive = element.IsActive;
    this.saveUnMappedProducts.MRP = element.MRP;
    this.saveUnMappedProducts.Name = element.Name;
    this.saveUnMappedProducts.ProductID = element.ProductID;
    this.saveUnMappedProducts.ProductPrice = element.ProductPrice;
    this.saveUnMappedProducts.ProductVarientId = element.ProductVarientId;
    this.saveUnMappedProducts.Quantity = element.Quantity;
    this.saveUnMappedProducts.SellerId = element.SellerId;
    this.saveUnMappedProducts.SubCategoryID = element.SubCategoryID;
    this.saveUnMappedProducts.userid = this.strSellerID;

    let toastrMsg = this.saveUnMappedProducts.Name + ' ' + this.saveUnMappedProducts.Quantity + ' ' + 'Added Into Your List';
    let isPriceValid = (Number(this.saveUnMappedProducts.ProductPrice) - Number(this.saveUnMappedProducts.Discount)) === Number(this.saveUnMappedProducts.FinalPrice);
    if (isPriceValid) {
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
      console.log('unmapped', this.saveUnMappedProducts);
      this.salesService.saveUnmappedProducts(this.saveUnMappedProducts).subscribe(data => {
        this.toastr.success(toastrMsg);
        let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

        this.salesService.getUnmappedProductData(unmapppedData).subscribe(res => {
          this.unMappedProductData = res;
          console.log('unMappedProductData', this.unMappedProductData);
          this.dataSource = new MatTableDataSource(this.unMappedProductData);
          setTimeout(() => this.dataSource.paginator = this.paginator);
          this.spinner.hide();
        });
        this.spinner.hide();
      },
        err => {
          this.toastr.error('An Error Occured !!');
          this.spinner.hide();
        });
    }

    else {
      this.toastr.error('Please Check Product Price, Discount and Final Price');
      return;
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

  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.BrandName.localeCompare(b.BrandName);
    });
    return array
  }

}

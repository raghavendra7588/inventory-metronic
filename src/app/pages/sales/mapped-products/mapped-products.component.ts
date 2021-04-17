import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SaveMappedProducts, SaveUnMappedProducts, UnmappedProducts } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-mapped-products',
  templateUrl: './mapped-products.component.html',
  styleUrls: ['./mapped-products.component.scss']
})
export class MappedProductsComponent implements OnInit {

  displayedColumns = ['select', 'id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'availableQuantity', 'save', 'delete'];
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

  unMappedProductData: any = [];
  unmappedProducts: UnmappedProducts = new UnmappedProducts();
  saveUnMappedProducts: SaveMappedProducts = new SaveMappedProducts;

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

  selectedSellerID: string;


  selectedCategoryId: string;
  selectedSubCategoyId: string;
  counter: number = 1;

  modalRef: BsModalRef;
  message: string;

  deleteModalRef: BsModalRef;
  particularProduct: any;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private modalService: BsModalService
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

      if (this.role == 'Seller') {

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


  onSellerChange(event, res) {
 
    this.categoriesData = res.categories;

    this.sellerData = res.id;
    this.selectedSellerID = res.id;

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
     
      this.dataSource = new MatTableDataSource(this.unMappedProductData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  filterSellerData(arr) {
    let particularSellerArr = [];
    arr.filter(item => {
      if (Number(item.id) == Number(this.strSellerID)) {
        particularSellerArr.push(item);
      }
    });

    this.sellerData = particularSellerArr;
  }

  selectedCategoryFromList(res) {
  
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
     
      this.dataSource = new MatTableDataSource(mappedProductData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, res => {
      this.spinner.hide();
    });
  }




  selectedSubCategoryFromList(res) {

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

      this.saveUnMappedProducts = new SaveMappedProducts();
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
      this.saveUnMappedProducts.OutofStockFlag = false;
      this.saveUnMappedProducts.OutofStockMsg = 'This product is currently out of stock. Please check later.';
      this.saveUnMappedProducts.userid = this.strSellerID;
      this.saveUnMappedProducts.CategoryID = Number(element.CategoryID);
      
      let isPriceValid = (Number(this.saveUnMappedProducts.ProductPrice) - Number(this.saveUnMappedProducts.Discount)) === Number(this.saveUnMappedProducts.FinalPrice);
      if (isPriceValid) {
        
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
          this.saveUnMappedProducts = new SaveMappedProducts();
          this.updateAllArray = [];
          this.multipleEntriesArray = [];
          if (this.counter == 1) {
            this.toastr.success('Completed Successfully !!');
          }
          this.counter--;
          this.updateAllRecordsCount = 0;

          let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };
          this.saveUnMappedProducts = new SaveMappedProducts();
          this.salesService.getMappedProducts(unmapppedData).subscribe(res => {
            this.unMappedProductData = res;

            this.spinner.hide();


            this.dataSource = new MatTableDataSource(this.unMappedProductData);
            setTimeout(() => this.dataSource.paginator = this.paginator);

          }, err => {
            this.spinner.hide();
          });

        },
          err => {
            this.toastr.error('Please Check Your API is Running Or Not!');
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
    this.saveUnMappedProducts.OutofStockFlag = false;
    this.saveUnMappedProducts.OutofStockMsg = 'This product is currently out of stock. Please check later.';
    this.saveUnMappedProducts.userid = this.strSellerID;
    this.saveUnMappedProducts.CategoryID = Number(element.CategoryID);

    let isPriceValid = (Number(this.saveUnMappedProducts.ProductPrice) - Number(this.saveUnMappedProducts.Discount)) === Number(this.saveUnMappedProducts.FinalPrice);
    if (isPriceValid) {
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
   
      this.salesService.saveUnmappedProducts(this.saveUnMappedProducts).subscribe(data => {
        this.toastr.success('Product Price, Discount and Final Price is Updated !!');
        let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };
        this.saveUnMappedProducts = new SaveMappedProducts();
        this.salesService.getMappedProducts(unmapppedData).subscribe(res => {
          this.unMappedProductData = res;
     
          this.dataSource = new MatTableDataSource(this.unMappedProductData);
          setTimeout(() => this.dataSource.paginator = this.paginator);
        });
        this.spinner.hide();
      },
        err => {
          this.toastr.error('Please Check Your API is Running Or Not!');
          this.spinner.hide();
        });
    }

    else {
      this.toastr.error('Please Check Product Price, Discount and Final Price');
      return;
    }


  }

  deleteProduct(element) {


    this.saveUnMappedProducts.AvailableQuantity = element.AvailableQuantity;
    this.saveUnMappedProducts.BrandID = element.BrandID;
    this.saveUnMappedProducts.BrandName = element.BrandName;
    this.saveUnMappedProducts.Discount = element.Discount;
    this.saveUnMappedProducts.FinalPrice = element.FinalPrice;
    this.saveUnMappedProducts.Id = element.Id;
    this.saveUnMappedProducts.IsActive = '0';
    this.saveUnMappedProducts.MRP = element.MRP;
    this.saveUnMappedProducts.Name = element.Name;
    this.saveUnMappedProducts.ProductID = element.ProductID;
    this.saveUnMappedProducts.ProductPrice = element.ProductPrice;
    this.saveUnMappedProducts.ProductVarientId = element.ProductVarientId;
    this.saveUnMappedProducts.Quantity = element.Quantity;
    this.saveUnMappedProducts.SellerId = element.SellerId;
    this.saveUnMappedProducts.SubCategoryID = element.SubCategoryID;
    this.saveUnMappedProducts.OutofStockFlag = false;
    this.saveUnMappedProducts.OutofStockMsg = 'This product is currently out of stock. Please check later.';
    this.saveUnMappedProducts.CategoryID = Number(element.CategoryID);

    this.saveUnMappedProducts.userid = this.strSellerID;
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let toastrMsg = this.saveUnMappedProducts.Name + ' ' + this.saveUnMappedProducts.Quantity + ' ' + 'Deleted From List';
    this.salesService.saveUnmappedProducts(this.saveUnMappedProducts).subscribe(data => {
      this.toastr.error(toastrMsg);
      this.saveUnMappedProducts = new SaveMappedProducts();
      let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

      this.salesService.getMappedProducts(unmapppedData).subscribe(res => {
        this.unMappedProductData = res;
    
        this.dataSource = new MatTableDataSource(this.unMappedProductData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.spinner.hide();
      });

    },
      err => {
        this.toastr.error('Please Check Your API is Running Or Not!');
        this.spinner.hide();
      });
  }




  logDeleteSelection() {
    this.isPriceValid = true;
    this.isMultipleAmount = true;
    this.counter = 1;
    this.selection.selected.forEach((element) => {
      this.updateAllArray.push(element);
      this.multipleEntriesArray.push(element);
    });
    this.postDeleteMultipleInsertion(this.multipleEntriesArray);

    this.updateAllRecordsCount = this.updateAllArray.length;
    this.multipleEntriesArray = [];
    this.updateAllArray = [];
    this.updateAllRecordsCount = 0;
  }

  postDeleteMultipleInsertion(elements) {

    elements.forEach(element => {

      this.saveUnMappedProducts = new SaveMappedProducts();
      this.saveUnMappedProducts.AvailableQuantity = element.AvailableQuantity;
      this.saveUnMappedProducts.BrandID = element.BrandID;
      this.saveUnMappedProducts.BrandName = element.BrandName;
      this.saveUnMappedProducts.Discount = element.Discount;
      this.saveUnMappedProducts.FinalPrice = element.FinalPrice;
      this.saveUnMappedProducts.Id = element.Id;
      this.saveUnMappedProducts.IsActive = '0';
      this.saveUnMappedProducts.MRP = element.MRP;
      this.saveUnMappedProducts.Name = element.Name;
      this.saveUnMappedProducts.ProductID = element.ProductID;
      this.saveUnMappedProducts.ProductPrice = element.ProductPrice;
      this.saveUnMappedProducts.ProductVarientId = element.ProductVarientId;
      this.saveUnMappedProducts.Quantity = element.Quantity;
      this.saveUnMappedProducts.SellerId = element.SellerId;
      this.saveUnMappedProducts.SubCategoryID = element.SubCategoryID;
      this.saveUnMappedProducts.OutofStockFlag = false;
      this.saveUnMappedProducts.OutofStockMsg = 'This product is currently out of stock. Please check later.';
      this.saveUnMappedProducts.userid = this.strSellerID;
      this.saveUnMappedProducts.IsActive = '0';
      this.saveUnMappedProducts.CategoryID = Number(element.CategoryID);

      let isPriceValid = (Number(this.saveUnMappedProducts.ProductPrice) - Number(this.saveUnMappedProducts.Discount)) === Number(this.saveUnMappedProducts.FinalPrice);
      if (isPriceValid) {
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
          this.saveUnMappedProducts = new SaveMappedProducts();
          this.updateAllArray = [];
          this.multipleEntriesArray = [];
          if (this.counter == 1) {
            this.toastr.error('Completed Successfully !!');
          }
          this.counter--;
          this.updateAllRecordsCount = 0;

          let unmapppedData = { SellerId: this.sellerData, CategoryId: '0', SubCategoryId: '0' };

          this.salesService.getMappedProducts(unmapppedData).subscribe(res => {
            this.unMappedProductData = res;
      
            this.dataSource = new MatTableDataSource(this.unMappedProductData);
            setTimeout(() => this.dataSource.paginator = this.paginator);
            this.spinner.hide();
          }, err => {
            this.spinner.hide();
          });

        },
          err => {
            this.toastr.error('Please Check Your API is Running Or Not!');
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


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.logDeleteSelection();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  openDeleteModal(template: TemplateRef<any>, product) {
    this.deleteModalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.particularProduct = product;
  }

  confirmDelete(): void {
    this.deleteProduct(this.particularProduct);
    this.deleteModalRef.hide();
  }

  declineDelete(): void {
    this.deleteModalRef.hide();
  }
}

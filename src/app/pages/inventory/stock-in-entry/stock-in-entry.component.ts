import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetPurchaseItemData, GetPurchaseReport } from '../../purchase/purchase.model';
import { PurchaseService } from '../../purchase/purchase.service';
import { StockIn } from '../inventory.model';
import { InventoryService } from '../inventory.service';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stock-in-entry',
  templateUrl: './stock-in-entry.component.html',
  styleUrls: ['./stock-in-entry.component.scss']
})
export class StockInEntryComponent implements OnInit {

  selection = new SelectionModel<any[]>(true, []);
  displayedColumns: string[] = ['select', 'subCategory', 'brand', 'product', 'varient', 'buyingPrice', 'quantityOrdered', 'quantityReceived', 'sellingPrice', 'Discount', 'barCode'];
  updateAllRecordsCount = 0;
  dataSource: any;
  vendorData: any = [];
  vendorId: number;
  strSellerId: string;
  numSellerId: number;
  customObj: any = [];
  dbData: any = [];
  getPurchaseReport: GetPurchaseReport = new GetPurchaseReport();
  getPurchaseItemData: GetPurchaseItemData = new GetPurchaseItemData();
  purchaseReportData: any = [];
  purchaseOrderItemData: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  checkFinalPrice: boolean = true;
  multipleEntriesArray: any = [];
  uniquePurchaseOrderItemArray: any = [];
  stockIn: StockIn = new StockIn();
  mulitpleEntriesArray: any = [];
  ownDbstockInItemsData: any = [];
  uniqueArray: any = [];
  multipleItemsArray: any = [];


  constructor(
    public dialog: MatDialog,
    public router: Router,
    public purchaseService: PurchaseService,
    public toastr: ToastrService,
    public inventoryService: InventoryService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.strSellerId = sessionStorage.getItem('sellerId');
    this.numSellerId = Number(sessionStorage.getItem('sellerId'));
    this.getPurchaseReport.sellerId = sessionStorage.getItem('sellerId');
    this.getPurchaseItemData.sellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();
    this.getAllStockInData();
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
    this.selection.selected.forEach((element) => {
      // console.log('selected', element);
      if (this.checkFinalPrice === false) {
        return;
      }

      this.checkFinalPrice = this.checkItemFinalPrice(element);
      // console.log('true or fasle', this.checkFinalPrice);
      if (!this.checkFinalPrice) {
        this.toastr.error('Please Check Quantity');
      }
    });
    if (this.checkFinalPrice) {
      this.selection.selected.forEach((element) => {
        this.multipleItemsArray.push(element);
        this.uniquePurchaseOrderItemArray = this.uniqueEntries(this.multipleItemsArray, element);
        this.uniqueArray = _.uniqBy(this.uniquePurchaseOrderItemArray, 'ReferenceId');

      });

      this.postMultipleInsertion(this.uniqueArray);
    }
  }
  uniqueEntries(arr, obj) {
    let isExist = arr.some(o => o.PurchaseOrderItemId === obj.PurchaseOrderItemId && o.ReferenceId === obj.ReferenceId);
    if (!isExist)
      arr.push(obj);
    return arr;
  }


  checkItemFinalPrice(element) {
    // let prevFinalPrice = 0;
    let isRecordValid: boolean = true;
    let QuantityOrdered = Number(element.PurchaseQuantity);
    // let QuantityReceived = Number(element.FinalPrice);
    let QuantityReceived = Number(element.QuantityReceived)

    // console.log('ordered', QuantityOrdered, 'received', QuantityReceived);
    if (QuantityReceived > QuantityOrdered) {
      isRecordValid = false;
    } else {
      if ((Number(QuantityReceived)) === 0) {
        isRecordValid = false;
      }
      else {
        isRecordValid = true;
      }
    }
    return isRecordValid;
  }

  postMultipleInsertion(elements) {
    elements.forEach(element => {
      // console.log(element);
      this.stockIn = new StockIn();
      // console.log('mulitple entries', element);
      if (element.StockInItemId === 0) {
        // console.log('got stockINNNN IDDD', element.StockInItemId);
        this.stockIn.stockInItemId = element.StockInItemId;
      }
      else {
        this.stockIn.stockInItemId = element.StockInItemId;
      }

      this.stockIn.PurchaseOrderId = element.PurchaseOrderId;
      this.stockIn.PurchaseOrderItemId = element.PurchaseOrderItemId;
      this.stockIn.ProductVarientId = element.ProductVarientId;

      this.stockIn.ReferenceId = element.ReferenceId;
      this.stockIn.QuantityReceived = Number(element.QuantityReceived);
      this.stockIn.Discount = Number(element.Discount);
      this.stockIn.QuantityOrdered = Number(element.PurchaseQuantity);
      this.stockIn.SellingPrice = Number(element.SellingPrice);
      this.stockIn.BarCode = element.Barcode;
      this.stockIn.sellerId = Number(sessionStorage.getItem('sellerId'));
      this.mulitpleEntriesArray.push(this.stockIn);
    });

    console.log('stocking  ********', this.mulitpleEntriesArray);
    this.spinner.show();
    this.inventoryService.postStockInItem(this.mulitpleEntriesArray).subscribe(data => {
      // console.log('saved ', data);
      this.toastr.success('Items saved');
      this.updateAllRecordsCount = 0;
      this.mulitpleEntriesArray = [];
      this.uniqueArray = [];
      this.multipleItemsArray = [];
      this.uniquePurchaseOrderItemArray = [];
      this.selection.clear();
      this.router.navigate(['/dashboard']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

    // this.updateAllRecordsCount = 0;
    // this.updateAllArray = [];

    // this.finalPurchaseOrderArray = this.multipleEntries;
    // this.multipleEntriesArray = [];
    // this.multipleEntries = [];
  }










  selectedVendorFromList(item) {
    // console.log(item);
    this.getPurchaseReport.vendorId = Number(item.vendorId);
    this.getPurchaseItemData.vendorId = Number(item.vendorId);
    this.purchaseReportData = [];
    this.dataSource = [];
    this.purchaseOrderItemData = [];
    this.purchaseService.getAllPurchaseOrderData(this.getPurchaseReport).subscribe(data => {
      this.purchaseReportData = data;
      // console.log(data);
    })
  }

  SearchRecords() {
    this.purchaseService.getAllPurchaseOrderItemData(this.getPurchaseItemData).subscribe(data => {
      // console.log('********', data);
      this.purchaseOrderItemData = data;

      // let customizedPurchaseOrderItemResponse = this.mapObj(this.purchaseOrderItemData, this.ownDbstockInItemsData);

      // let customizedPurchaseOrderItemResponse = this.customPurchaseOrderItemResponse(this.purchaseOrderItemData);
      // let customizedPurchaseOrderItemResponse = this.mapObj(this.purchaseOrderItemData, this.ownDbstockInItemsData);

      let uniqueStockInItems = _.uniqBy(this.purchaseOrderItemData, 'ReferenceId');
      // console.log('always unique', uniqueStockInItems);
      this.purchaseOrderItemData = uniqueStockInItems;
      // console.log('always unique', this.purchaseOrderItemData);
      this.dataSource = new MatTableDataSource(this.purchaseOrderItemData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })


  }
  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      this.purchaseService.allvendorData = data;
    });
  }

  editItem(response: any) {
    // console.log(response);
  }
  selectedOrderNumberList(response: any) {
    // console.log(response);
    this.getPurchaseItemData.orderNo = response.OrderNo;
    this.getPurchaseItemData.purchaseOrderId = response.PurchaseOrderId;
  }

  mapObj(apiData, ownDbData) {
    // console.log('api data', apiData);
    // console.log('own data ', ownDbData);
    for (let i = 0; i < apiData.length; i++) {

      apiData[i].CreatedAt = 'NULL';
      apiData[i].BuyingPrice = 0;
      apiData[i].FinalPrice = 0;

      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].PurchaseOrderItemId === ownDbData[j].PurchaseOrderItemId && apiData[i].ReferenceId === ownDbData[j].ReferenceId) {
          // console.log('inside ');
          apiData[i].FinalPrice = ownDbData[j].QuantityReceived;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].BuyingPrice = ownDbData[j].SellingPrice;
          apiData[i].CreatedAt = ownDbData[j].BarCode;
        }
      }
    }
    console.log('returned apiData', apiData);
    return apiData;
  }


  customPurchaseOrderItemResponse(array) {
    for (let i = 0; i < array.length; i++) {

      // quantity received
      if (array[i].QuantityReceived || array[i].QuantityReceived === null || array[i].QuantityReceived === 0 || array[i].QuantityReceived === undefined) {
        array[i].FinalPrice = array[i].QuantityReceived;
      }
      else {
        array[i].FinalPrice = 0;
      }

      // discount
      if (array[i].stockInDiscount || array[i].stockInDiscount === null || array[i].stockInDiscount === 0 || array[i].stockInDiscount === undefined) {
        array[i].Discount = array[i].stockInDiscount;
      }
      else {
        array[i].Discount = array[i].Discount;
      }

      //selling price
      if (array[i].SellingPrice || array[i].SellingPrice === null || array[i].SellingPrice === 0 || array[i].SellingPrice === undefined) {
        array[i].BuyingPrice = array[i].SellingPrice;
      }
      else {
        array[i].BuyingPrice = 0;
      }
      //barcode
      if (array[i].BarCode || array[i].BarCode === null || array[i].BarCode === 0 || array[i].BarCode === undefined) {
        array[i].CreatedAt = array[i].BarCode;
      }
      else {
        array[i].CreatedAt = 'NULL';
      }



      //null or 0 normal else stockInDisc
    }
    return array;
  }

  getAllStockInData() {
    this.inventoryService.getStockInItem(this.numSellerId).subscribe(data => {
      console.log('stock in data', data);
      this.ownDbstockInItemsData = data;
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}

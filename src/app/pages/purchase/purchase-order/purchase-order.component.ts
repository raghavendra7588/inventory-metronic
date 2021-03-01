import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PurchaseOrder, PurchaseOrderData, PurchaseOrderItem } from '../purchase.model';
import { PurchaseService } from '../purchase.service';
import * as _ from 'lodash';
import { GetPriceListComponent } from '../get-price-list/get-price-list.component';
import { DialogPurchaseOrderPrintComponent } from '../dialog-purchase-order-print/dialog-purchase-order-print.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {


  displayedColumns: string[] = ['ProductId', 'BrandName', 'ProductName', 'Quantity', 'BuyingPrice',
    'Discount', 'AvailableQuantity', 'TotalDiscount', 'FinalPrice'];
  dataSource: any;

  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  purchaseOrderData: PurchaseOrderData = new PurchaseOrderData();
  purchaseOrderItem: PurchaseOrderItem = new PurchaseOrderItem();
  purchaseOrderForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  vendorData: any = [];
  addressData: any = [];
  CreditLimitPerOrder: any;
  priceListData: any = [];
  sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];
  selectedVendor: any;
  minDate: Date;
  receivedPurchaseOrder: any = [];
  purchaseOrderListData: any = [];
  multiplePurchaseOrderData: any = [];
  billingId: any;
  shippingId: any;
  vendorId: any;
  grandTotal: any = 0;
  purchaseOrderResponse: any;
  paymentTerm: any = [];
  strSellerId: string;
  calculatedDiscount: number;
  calculatedFinalPrice: number;
  isButtonDisabled: boolean = false;

  constructor(
    public dialog: MatDialog,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public router: Router,
    private spinner: NgxSpinnerService) {
    this.emitterService.sendPurchaseOrder.subscribe(value => {
      if (value) {
        this.receivedPurchaseOrder = [...this.receivedPurchaseOrder, ...value].reverse();
        this.purchaseOrder.itemValue = this.receivedPurchaseOrder.length;
        this.purchaseOrder.items = this.receivedPurchaseOrder;
        let uniqueReceivedPurchaseOrder = _.uniqBy(this.receivedPurchaseOrder, 'ReferenceId');
        this.receivedPurchaseOrder = uniqueReceivedPurchaseOrder;
        this.calculateGrandTotal(this.receivedPurchaseOrder);
        let sortedRecivedPurchaseOrder = this.receivedPurchaseOrder.sort((a, b) => parseFloat(a.productId) - parseFloat(b.productId));
        this.receivedPurchaseOrder = [];
        this.receivedPurchaseOrder = sortedRecivedPurchaseOrder;
        this.dataSource = new MatTableDataSource(this.receivedPurchaseOrder);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }
    });


  }

  ngOnInit() {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.purchaseOrder.orderDate = new Date();
    this.getVendorData();
    this.getAddressData();
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.priceListData = this.purchaseService.getAllPriceListData(this.sellerId);
    this.minDate = new Date();
    this.purchaseOrder.orderNo = (this.getRandomNumbers()).toString();
    this.paymentTerm = [
      { id: 0, title: 'Cash / Cheque' },
      { id: 1, title: 'Credit' },
      { id: 2, title: 'Online' }
    ];
  }
  getVendorData() {
    this.spinner.show();
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      this.purchaseService.allvendorData = data;
      console.log('all vendor data from Purchase Order', this.purchaseService.allvendorData);
      this.spinner.hide();
    });
  }

  openDialog() {
    this.dialog.open(GetPriceListComponent, {
      height: '600px',
      width: '1000px',
      data: this.vendorId,
      disableClose: true
    });
  }

  getRandomNumbers() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }


  selectedVendorFromList(item) {
    this.vendorId = item.vendorId;
    this.purchaseService.selectedVendorIdForPurchaseOrder = 0;
    this.purchaseService.selectedVendorIdForPurchaseOrder = Number(this.vendorId);
    this.purchaseOrder.email = item.email;
    this.purchaseOrder.gstNumber = item.gst;
    this.purchaseOrder.vendorName = item.name;
    this.CreditLimitPerOrder = item.creditLimit;
  }

  selectedBillingAddress(address) {
    this.billingId = address.id;
    document.getElementById("billingAddress").innerHTML = address.billing_address;
    this.purchaseOrder.billingAddress = address.billing_address;
    this.purchaseOrder.billingCity = address.billing_city;
    this.purchaseOrder.billingPhone = address.billing_phone;
  }

  selectedShippingAddress(address) {
    this.shippingId = address.id;
    document.getElementById("shippingAddress").innerHTML = address.billing_address;
    this.purchaseOrder.shippingAddress = address.shipping_address;
    this.purchaseOrder.shippingCity = address.shipping_city;
    this.purchaseOrder.shippingPhone = address.shipping_phone;
  }

  getAddressData() {
    this.spinner.show();
    this.purchaseService.getAddressData().subscribe(data => {
      this.addressData = data;
      this.spinner.hide();
    });
  }

  getPurchaseOrderList(data: any) {
    // console.log('I received purchase Order', data);
  }


  savePurchaseOrder() {
    this.isButtonDisabled = true;

    this.purchaseOrderData.SellerId = this.sellerId;
    this.purchaseOrderData.TaxAmount = '';
    this.purchaseOrderData.Taxable = '';
    this.purchaseOrderData.CESSAmount = '';
    this.purchaseOrderData.DocAmount = '';
    this.purchaseOrderData.AdvanceLedger = '';

    if (this.vendorId === null || this.vendorId === undefined || this.vendorId === '') {
      this.purchaseOrderData.VendorId = 'NULL';
      this.purchaseOrderData.VendorName = 'NULL';
    }
    else {
      this.purchaseOrderData.VendorId = this.vendorId;
      this.purchaseOrderData.VendorName = this.purchaseOrder.vendorName;
    }

    if (this.purchaseOrder.orderNo === null || this.purchaseOrder.orderNo === undefined) {
      this.purchaseOrderData.OrderNo = 'NULL';
    }
    else {
      this.purchaseOrderData.OrderNo = this.purchaseOrder.orderNo.toString();
    }


    if (this.purchaseOrder.orderDate === null || this.purchaseOrder.orderDate === undefined) {
      this.purchaseOrderData.OrderDate = 'NULL';
    }
    else {
      let orderDate = this.convertDate(this.purchaseOrder.orderDate);
      this.purchaseOrderData.OrderDate = orderDate;
    }

    if (this.purchaseOrder.deliveryDate === null || this.purchaseOrder.deliveryDate === undefined) {
      this.purchaseOrderData.DeliveryDate = 'NULL';
    }
    else {
      let deliveryDate = this.convertDate(this.purchaseOrder.deliveryDate);
      this.purchaseOrderData.DeliveryDate = deliveryDate;
    }

    if (this.purchaseOrder.referenceNo === null || this.purchaseOrder.referenceNo === undefined || this.purchaseOrder.referenceNo.toString() === '') {
      this.purchaseOrderData.ReferenceNo = 'NULL';
    }
    else {
      this.purchaseOrderData.ReferenceNo = this.purchaseOrder.referenceNo.toString();
    }

    if (this.billingId === null || this.billingId === undefined || this.billingId.toString() === '') {
      this.purchaseOrderData.BillingId = 'NULL';
    }
    else {
      this.purchaseOrderData.BillingId = this.billingId;
    }


    if (this.shippingId === null || this.shippingId === undefined || this.shippingId.toString() === '') {
      this.purchaseOrderData.ShippingId = 'NULL';
    }
    else {
      this.purchaseOrderData.ShippingId = this.shippingId;
    }


    if (this.purchaseOrder.remarks === null || this.purchaseOrder.remarks === undefined || this.purchaseOrder.remarks.toString() === '') {
      this.purchaseOrderData.Remarks = 'NULL';
    }
    else {
      this.purchaseOrderData.Remarks = this.purchaseOrder.remarks;
    }


    if (this.purchaseOrder.itemValue === null || this.purchaseOrder.itemValue === undefined) {
      this.purchaseOrderData.ItemValue = 'NULL';
    }
    else {
      this.purchaseOrderData.ItemValue = this.purchaseOrder.itemValue.toString();
    }


    if (this.purchaseOrder.taxAmount === null || this.purchaseOrder.taxAmount === undefined || this.purchaseOrder.taxAmount.toString() === '') {
      this.purchaseOrderData.TaxAmount = 'NULL';
    }
    else {
      this.purchaseOrderData.TaxAmount = this.purchaseOrder.taxAmount.toString();
    }

    if (this.purchaseOrder.taxable === null || this.purchaseOrder.taxable === undefined || this.purchaseOrder.taxable.toString() === '') {
      this.purchaseOrderData.Taxable = 'NULL';
    }
    else {
      this.purchaseOrderData.Taxable = this.purchaseOrder.taxable.toString();
    }

    if (this.purchaseOrder.cessAmount === null || this.purchaseOrder.cessAmount === undefined || this.purchaseOrder.cessAmount.toString() === '') {
      this.purchaseOrderData.CESSAmount = 'NULL';
    }
    else {
      this.purchaseOrderData.CESSAmount = this.purchaseOrder.cessAmount.toString();
    }

    if (this.purchaseOrder.docAmount === null || this.purchaseOrder.docAmount === undefined || this.purchaseOrder.docAmount.toString() === '') {
      this.purchaseOrderData.DocAmount = 'NULL';
    }
    else {
      this.purchaseOrderData.DocAmount = this.purchaseOrder.docAmount.toString();
    }

    if (this.purchaseOrder.advanceAmount === null || this.purchaseOrder.advanceAmount === undefined || this.purchaseOrder.advanceAmount.toString() === '') {
      this.purchaseOrderData.AdvanceAmount = 'NULL';
    }
    else {
      this.purchaseOrderData.AdvanceAmount = this.purchaseOrder.advanceAmount.toString();
    }

    if (this.purchaseOrder.advanceLedger === null || this.purchaseOrder.advanceLedger === undefined || this.purchaseOrder.advanceLedger.toString() === '') {
      this.purchaseOrderData.AdvanceLedger = 'NULL';
    }
    else {
      this.purchaseOrderData.AdvanceLedger = this.purchaseOrder.advanceLedger.toString();
    }

    if (this.purchaseOrder.BatchNumber === null || this.purchaseOrder.BatchNumber === undefined || this.purchaseOrder.BatchNumber.toString() === '') {
      this.purchaseOrderData.BatchNumber = 'NULL';
    }
    else {
      this.purchaseOrderData.BatchNumber = this.purchaseOrder.BatchNumber.toString();
    }

    if (this.purchaseOrder.paymentTerms === null || this.purchaseOrder.paymentTerms === undefined || this.purchaseOrder.paymentTerms.toString() === '') {
      this.purchaseOrderData.paymentTerms = 'NULL';
    }
    else {
      this.purchaseOrderData.paymentTerms = this.purchaseOrder.paymentTerms.toString();
    }
    let isQuantityValid = true;
    this.receivedPurchaseOrder.forEach(item => {
      if (Number(item.availableQuantity) == 0) {
        this.toastr.error('Quantity Can not Be Zero');
        isQuantityValid = false;
        return;
      }
    });

    if (!isQuantityValid) {
      return;
    }

    this.purchaseOrderData.items = this.receivedPurchaseOrder;




    if (this.purchaseOrder.paymentTerms === 'Credit') {
      if (this.grandTotal < this.CreditLimitPerOrder && this.purchaseOrder.paymentTerms === 'Credit') {
        this.purchaseService.savePurchaseOrderMaster(this.purchaseOrderData).subscribe(data => {
          this.toastr.success('Order Is Placed');

          this.purchaseOrderResponse = data;
          this.openPurchaseOrderPrintDialog();
          this.clearValues();
          this.dataSource = [];
          this.receivedPurchaseOrder = [];
        });
      }

      else {
        this.toastr.error('Kindly Check Credit Limit');
      }
    }
    else {
      this.purchaseService.savePurchaseOrderMaster(this.purchaseOrderData).subscribe(data => {
        this.toastr.success('Order Is Placed');
        this.purchaseOrderResponse = data;
        this.openPurchaseOrderPrintDialog();
        this.clearValues();
        this.dataSource = [];
        this.receivedPurchaseOrder = [];
      });

    }

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

  clearValues() {
    this.purchaseOrder.vendor = '';
    this.purchaseOrder.gstNumber = '';
    this.purchaseOrder.email = '';
    this.purchaseOrder.BatchNumber = '';
    this.purchaseOrder.orderNo = (this.getRandomNumbers()).toString();
    this.purchaseOrder.deliveryDate = undefined;
    this.purchaseOrder.referenceNo = 0;
    this.purchaseOrder.billingNameList = undefined;
    this.purchaseOrder.billingAddress = '';
    this.purchaseOrder.billingCity = '';
    this.purchaseOrder.billingPhone = '';
    this.purchaseOrder.shippingNameList = undefined;
    this.purchaseOrder.shippingAddress = '';
    this.purchaseOrder.shippingCity = '';
    this.purchaseOrder.shippingPhone = '';
    this.purchaseOrder.remarks = '';
    this.purchaseOrder.itemValue = 0;
    this.purchaseOrder.taxAmount = 0;
    this.purchaseOrder.taxable = 0;
    this.purchaseOrder.cessAmount = 0;
    this.purchaseOrder.docAmount = 0;
    this.purchaseOrder.advanceAmount = 0;
    this.purchaseOrder.advanceLedger = '';
    this.grandTotal = '';
    this.purchaseOrder.paymentTerms = '';
    this.receivedPurchaseOrder = [];
    this.dataSource = [];
  }

  openPurchaseOrderPrintDialog() {
    this.dialog.open(DialogPurchaseOrderPrintComponent, {
      disableClose: true,
      height: '180px',
      width: '400px',
      data: this.purchaseOrderResponse
    });
  }

  editQuantity(element) {
    let totalPrice = 0;
    totalPrice = ((element.buyingPrice - element.discount) * (Number(element.availableQuantity)));
    element.finalPrice = totalPrice;
    this.calculateGrandTotal(this.receivedPurchaseOrder);
  }
  calculateGrandTotal(array) {
    this.grandTotal = 0;
    array.forEach(item => {
      this.grandTotal += item.finalPrice;
    });
  }

  getFinalPrice() {
    let totalFinalPrice = 0;
    this.receivedPurchaseOrder.forEach(item => {
      totalFinalPrice += Number(item.finalPrice);
    });
    return totalFinalPrice;
  }

  getTotalDiscount() {
    let totalDiscount = 0;
    this.receivedPurchaseOrder.forEach(item => {
      totalDiscount = totalDiscount + Number(item.discount) * Number(item.availableQuantity);
    });
    return totalDiscount;
  }

  getTotalQuantity() {
    let totalPurchaseQuantity = 0;
    this.receivedPurchaseOrder.forEach(item => {
      totalPurchaseQuantity += Number(item.availableQuantity);
    });
    return totalPurchaseQuantity;
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}

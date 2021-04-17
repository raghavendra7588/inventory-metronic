import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from '../../inventory/inventory.service';
import { BrandWiseOrder } from '../reports.model';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-dialog-product-wise-purchase-report',
  templateUrl: './dialog-product-wise-purchase-report.component.html',
  styleUrls: ['./dialog-product-wise-purchase-report.component.scss']
})
export class DialogProductWisePurchaseReportComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  purchaseData: any = [];
  response: any = [];
  sellerName: string;
  productName: string;

  brandWiseOrder: BrandWiseOrder = new BrandWiseOrder();
  vendorName: string;

  constructor
    (
      @Inject(MAT_DIALOG_DATA) public data: any,
      public inventoryService: InventoryService,
      public reportsService: ReportsService
    ) {
    console.log('data', data);
    this.response = data;
    this.productName = data.ProductName;
    this.purchaseData.push(this.response);
    this.dataSource = new MatTableDataSource(this.purchaseData);
    setTimeout(() => this.dataSource.paginator = this.paginator);



    // this.vendorName = this.reportsService.selectedVendorObj.name;

    // this.brandWiseOrder.sellerId = this.reportsService.brandWiseRequestObject.sellerId.toString();
    // this.brandWiseOrder.vendorId = this.reportsService.brandWiseRequestObject.vendorId.toString();
    // this.brandWiseOrder.brandId = this.response.BrandID;

    // if (this.reportsService.brandWiseRequestObject.startDate === null || this.reportsService.brandWiseRequestObject.startDate === undefined) {
    //   this.brandWiseOrder.startDate = 'ALL';
    // }
    // else {
    //   this.brandWiseOrder.startDate = this.reportsService.brandWiseRequestObject.startDate;
    // }

    // if (this.reportsService.brandWiseRequestObject.endDate === null || this.reportsService.brandWiseRequestObject.endDate === undefined) {
    //   this.brandWiseOrder.endDate = 'ALL';
    // }
    // else {
    //   this.brandWiseOrder.endDate = this.reportsService.brandWiseRequestObject.endDate;
    // }

    // console.log('****    this.brandWiseOrder     *****', this.brandWiseOrder);

    // console.log('this.reportsService.brandWiseRequestObject = this.purchaseReport;', this.reportsService.brandWiseRequestObject);
    // console.log('this.reportsService.selectedVendorObj', this.reportsService.selectedVendorObj);
  }

  ngOnInit(): void {
    this.sellerName = sessionStorage.getItem('sellerName').toString();
  }

}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BrandWiseOrder } from '../reports.model';
import { ReportsService } from '../reports.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog-product-vendor-wise-purchase-report',
  templateUrl: './dialog-product-vendor-wise-purchase-report.component.html',
  styleUrls: ['./dialog-product-vendor-wise-purchase-report.component.scss']
})
export class DialogProductVendorWisePurchaseReportComponent implements OnInit {



  displayedColumns: string[] = ['orderNo', 'orderDate', 'BrandName', 'productName', 
    'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount', 'OrderSum'];

  dataSource: any;
  response: any = [];
  purchaseReportArray: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  brandWiseOrder: BrandWiseOrder = new BrandWiseOrder();
  vendorName: string;
  productCalculationResponse: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public reportsService: ReportsService
  ) {
 
    this.response = data;
    this.purchaseReportArray.push(this.response);
    this.dataSource = new MatTableDataSource(this.purchaseReportArray);
    setTimeout(() => this.dataSource.paginator = this.paginator);



    this.vendorName = this.reportsService.selectedVendorObj.name;

    this.brandWiseOrder.sellerId = this.reportsService.brandWiseRequestObject.sellerId.toString();
    this.brandWiseOrder.vendorId = this.reportsService.brandWiseRequestObject.vendorId.toString();
    this.brandWiseOrder.brandId = this.response.BrandID.toString();
    this.brandWiseOrder.productId = this.response.ProductId.toString();

    if (this.reportsService.brandWiseRequestObject.startDate === null || this.reportsService.brandWiseRequestObject.startDate === undefined) {
      this.brandWiseOrder.startDate = 'ALL';
    }
    else {
      this.brandWiseOrder.startDate = this.reportsService.brandWiseRequestObject.startDate;
    }

    if (this.reportsService.brandWiseRequestObject.endDate === null || this.reportsService.brandWiseRequestObject.endDate === undefined) {
      this.brandWiseOrder.endDate = 'ALL';
    }
    else {
      this.brandWiseOrder.endDate = this.reportsService.brandWiseRequestObject.endDate;
    }



    this.reportsService.postProductVendorOrderWisePurchaseReport(this.brandWiseOrder).subscribe(res => {
     
      this.productCalculationResponse = res;

      let uniqueRecords = _.uniqBy(this.productCalculationResponse, 'OrderNo');
     
      this.productCalculationResponse = uniqueRecords
      this.dataSource = new MatTableDataSource(this.productCalculationResponse);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  ngOnInit(): void {
  }

}

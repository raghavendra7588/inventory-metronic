import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-product-vendor-wise-purchase-report',
  templateUrl: './dialog-product-vendor-wise-purchase-report.component.html',
  styleUrls: ['./dialog-product-vendor-wise-purchase-report.component.scss']
})
export class DialogProductVendorWisePurchaseReportComponent implements OnInit {


  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'BrandWiseTotal', 'totalOrders',
    'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount'];
    
  dataSource: any;
  response: any = [];
  purchaseReportArray: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('received data', data);
    this.response = data;
    this.purchaseReportArray.push(this.response);
    this.dataSource = new MatTableDataSource(this.purchaseReportArray);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  ngOnInit(): void {
  }

}

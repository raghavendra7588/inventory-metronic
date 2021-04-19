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

    this.response = data;
    this.productName = data.ProductName;
    this.purchaseData.push(this.response);
    this.dataSource = new MatTableDataSource(this.purchaseData);
    setTimeout(() => this.dataSource.paginator = this.paginator);

  }

  ngOnInit(): void {
    this.sellerName = sessionStorage.getItem('sellerName').toString();
  }

}

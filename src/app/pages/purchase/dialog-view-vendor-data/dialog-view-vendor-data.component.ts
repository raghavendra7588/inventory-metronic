import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendorView } from '../purchase.model';
import { PurchaseService } from '../purchase.service';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dialog-view-vendor-data',
  templateUrl: './dialog-view-vendor-data.component.html',
  styleUrls: ['./dialog-view-vendor-data.component.scss']
})

export class DialogViewVendorDataComponent implements OnInit {
  particularVendor: any = [];
  sellerId: number;
  vendorId: number;
  priceListData: any = [];
  vendorView: VendorView = new VendorView();
  vendorViewData: any = [];
  vendorName: string;

  displayedColumns: string[] = ['productId', 'category', 'subCategory', 'brandName', 'productName', 'varient'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public purchaseService: PurchaseService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<DialogViewVendorDataComponent>,) {

    this.particularVendor = data;
    this.vendorId = Number(this.particularVendor.vendorId);
    console.log('i received ', this.vendorId);
    this.vendorView.vendorId = Number(this.particularVendor.vendorId);
    this.vendorName = this.particularVendor.name;

  }

  ngOnInit(): void {
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.vendorView.sellerId = Number(this.sellerId);
    this.getPriceListData();
    this.getVendorViewData();
  }


  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.priceListData = data;
    });
  }

  getVendorViewData() {
    this.spinner.show();
    this.purchaseService.getAllVendorViewData(this.vendorView).subscribe(data => {
      console.log('got data ', data);
      this.vendorViewData = data;
      let uniqueVendorViewData = _.uniqBy(this.vendorViewData, 'ProductVarientId');
      this.vendorViewData = [];
      this.vendorViewData = uniqueVendorViewData;
 
      console.log('vendorViewData', this.vendorViewData);
      this.dataSource = new MatTableDataSource(this.vendorViewData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    },
      err => {
        setTimeout(() => {
          this.spinner.hide();
          this.dialogRef.close();
        }, 6000);
      });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}

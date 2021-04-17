import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogContentVendorComponent } from '../dialog-content-vendor/dialog-content-vendor.component';

import { DialogViewVendorDataComponent } from '../dialog-view-vendor-data/dialog-view-vendor-data.component';
import { PurchaseService } from '../purchase.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'registrationDate', 'bankName', 'action', 'view'];

  dataSource: any;
  newRecordSubscription: Subscription;
  sellerId: any;
  strSellerId: string;
  vendorDetails: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public loginService: LoginService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.sellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();

    this.newRecordSubscription = this.emitterService.isVendorMasterUpdated.subscribe(value => {
      if (value) {
        this.getVendorData();
      }
    });
    this.getEveryBrandData();
  }


  openDialog() {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '800px',
    });
  }


  getVendorData() {

    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorDetails = data;
      this.dataSource = new MatTableDataSource(this.vendorDetails);
      this.dataSource.paginator = this.paginator;
    },
      err => {
        this.toastr.error('Please Check Your API is Running Or Not!');
       
      });
  }


  editEmployee(vendor) {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '800px',
      data: vendor
    });
  }


  getEveryBrandData() {
    this.purchaseService.getEveryBrand().subscribe(data => {
      this.purchaseService.allBrandData = data;
    });
  }

  viewVendorDetails(element) {

    this.dialog.open(DialogViewVendorDataComponent, {
      height: '600px',
      width: '1000px',
      data: element
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}

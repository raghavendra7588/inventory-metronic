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
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { PaymentService } from '../../payment/payment.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

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
  latestPaymentData: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  role: string;
  constructor(
    public dialog: MatDialog,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public loginService: LoginService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private subheader: SubheaderService,
    public paymentService: PaymentService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.sellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();
    this.role = sessionStorage.getItem('role');
    this.newRecordSubscription = this.emitterService.isVendorMasterUpdated.subscribe(value => {
      if (value) {
        this.getVendorData();
      }
    });
    this.getEveryBrandData();

    setTimeout(() => {
      this.subheader.setTitle('Purchase / Vendor');
      this.subheader.setBreadcrumbs([{
        title: 'Vendor',
        linkText: 'Vendor',
        linkPath: '/purchase/vendor'
      }]);
    }, 1);

    if (this.role == 'Seller') {
      this.getLatestPaymentTransaction();
    } else {
      return;
    }
  }


  openDialog() {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '1200px',
    });
  }


  getVendorData() {
    this.spinner.show();
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorDetails = data;
      this.dataSource = new MatTableDataSource(this.vendorDetails);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    },
      err => {
        this.toastr.error('Please Check Your API is Running Or Not!');
        this.spinner.hide();
      });
  }


  editEmployee(vendor) {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '1200px',
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
      width: '1200px',
      data: element
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }



  getLatestPaymentTransaction() {
    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.latestPaymentData = res;
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.latestPaymentData));


      var expiryDate = new Date(this.latestPaymentData[0].ExpiryDatee);
      var currentDate = new Date();

      if (expiryDate > currentDate) {

        this.spinner.hide();
        return;
      } else {

        this.sellerStatusChechpoint(this.latestPaymentData[0].PaymenId);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  sellerStatusChechpoint(PaymenId) {
    this.spinner.show();
    this.paymentService.updateSellerStatusCheckpoint(PaymenId).subscribe(res => {

      this.emitterService.isPaymentOrStatusChange.emit(true);
      this.router.navigate(['/payment/subscription']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
}

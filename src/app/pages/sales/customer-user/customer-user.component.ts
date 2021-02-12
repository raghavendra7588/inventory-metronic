import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogUpdateMobileNumberComponent } from '../dialog-update-mobile-number/dialog-update-mobile-number.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-customer-user',
  templateUrl: './customer-user.component.html',
  styleUrls: ['./customer-user.component.scss']
})
export class CustomerUserComponent implements OnInit {

  displayedColumns = ['totalSeller', 'totalOrder', 'totalAmount', 'name', 'email', 'mobile', 'pinCode', 'state', 'city', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];
  userRole: string;
  userId: string;

  constructor(
    private salesService: SalesService,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('sellerId');
    this.getCustomerUser();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getCustomerUser();
      }
    });
  }

  getCustomerUser() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    let role = 'Customer';

    if (this.userRole == 'Admin') {

      this.salesService.getAllCustomerUsersByAdmin(role).subscribe(res => {
        console.log('Customer user', res);
        this.adminUsers = res;
        this.dataSource = new MatTableDataSource(this.adminUsers);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }
    else {
      this.salesService.getAllCustomerUsers(role, this.userId).subscribe(res => {
        console.log('Customer user', res);
        this.adminUsers = res;
        this.dataSource = new MatTableDataSource(this.adminUsers);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });

    }

    // this.salesService.getAllCustomerUsers(role, this.userId).subscribe(res => {
    //   console.log('Customer user', res);
    //   this.adminUsers = res;
    //   this.dataSource = new MatTableDataSource(this.adminUsers);
    //   setTimeout(() => this.dataSource.paginator = this.paginator);
    //   this.spinner.hide();
    // }, err => {
    //   this.spinner.hide();
    // });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  openUpdateMobileDialog(user) {
    this.dialog.open(DialogUpdateMobileNumberComponent, {
      height: '240px',
      width: '600px',
      data: user,
      disableClose: true
    });

  }

  openDialog() {
    this.salesService.currentTab = 'Add New Customer';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      disableClose: true
    });
  }


  editUser(user) {
    this.salesService.currentTab = 'Edit New Customer';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      data: user,
      disableClose: true
    });
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogUpdateMobileNumberComponent } from '../dialog-update-mobile-number/dialog-update-mobile-number.component';
import { DialogViewUserComponent } from '../dialog-view-user/dialog-view-user.component';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-customer-user',
  templateUrl: './customer-user.component.html',
  styleUrls: ['./customer-user.component.scss']
})
export class CustomerUserComponent implements OnInit {

 
  displayedColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];
  userRole: string;
  userId: string;
  role: string;
  isDataLoaded: boolean = false;


  constructor(
    private salesService: SalesService,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    public dialog: MatDialog
  ) {
    this.userRole = sessionStorage.getItem('role');
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('sellerId');
    
    if (this.role == 'Admin') {
      this.displayedColumns = ['totalSeller', 'totalOrder', 'totalAmount', 'name', 'email', 'mobile', 'pinCode', 'state', 'city', 'edit'];
    }
    else {
      this.displayedColumns = ['name', 'email', 'mobile', 'pinCode', 'state', 'city', 'edit'];
    }
  }

  ngOnInit(): void {



    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getCustomerUser();
      }
    });


    this.getCustomerUser();
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

        this.adminUsers = res;
        this.dataSource = new MatTableDataSource(this.adminUsers);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.isDataLoaded = true;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }
    else {
      this.salesService.getAllCustomerUsers(role, this.userId).subscribe(res => {
   
        this.adminUsers = res;
        this.dataSource = new MatTableDataSource(this.adminUsers);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.isDataLoaded = true;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });

    }


  }


  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {

    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
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

  viewUser(user) {

    this.salesService.currentTab = 'View Customer';
    this.dialog.open(DialogViewUserComponent, {
      height: '380px',
      width: '600px',
      data: user,
      disableClose: true
    });

  }


  downloadTheReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Customer Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };

    const csvExporter = new ExportToCsv(options);
    if (this.isDataLoaded) {
      let requiredResponse = this.formatResponse(this.adminUsers);
      csvExporter.generateCsv(requiredResponse);
    }

  }

  formatResponse(array) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < array.length; i++) {

      let item = {
        Number: j,
        id: array[i].id,
        name: array[i].name,
        emailid: array[i].emailid,
        mobilenumber: array[i].mobilenumber,
        pincode: array[i].pincode,
        city: array[i].city,
        state: array[i].state,
        vendorcode: array[i].vendorcode,
        TotalAmount: array[i].TotalAmount,
        TotalOrder: array[i].TotalOrder,

        TotalSeller: array[i].TotalSeller
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }
}
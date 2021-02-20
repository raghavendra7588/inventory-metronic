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
import { DialogSellerMappingComponent } from '../dialog-seller-mapping/dialog-seller-mapping.component';

@Component({
  selector: 'app-back-office-user',
  templateUrl: './back-office-user.component.html',
  styleUrls: ['./back-office-user.component.scss']
})
export class BackOfficeUserComponent implements OnInit {

  displayedColumns: any;
  // displayedColumns = ['id', 'name', 'email', 'mobile', 'pin', 'state', 'city', 'mapping', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];
  role: string;
  isDataLoaded: boolean = false;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }



  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.getBackOfficeUser();
    this.role = sessionStorage.getItem('role');
    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getBackOfficeUser();
      }
    },
      err => {
        this.spinner.hide();
      });


    if (this.role == 'Admin') {
      this.displayedColumns = ['id', 'name', 'email', 'mobile', 'pin', 'state', 'city', 'mapping', 'edit'];
    }
    else {
      this.displayedColumns = ['id', 'name', 'email', 'mobile', 'pin', 'state', 'city', 'edit'];
    }
  }

  getBackOfficeUser() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    let role = 'backoffice';
    this.salesService.getAllBackOfficeUsers(role).subscribe(res => {
      console.log('backoffice user', res);
      this.adminUsers = res;
      this.dataSource = new MatTableDataSource(this.adminUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.isDataLoaded = true;
      this.spinner.hide();
    });
  }
  setDataSourceAttributes() {
    // this.dataSource.paginator = this.paginator;
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editSellerUser(user) {

    this.salesService.currentTab = 'Edit Back Office';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      data: user,
      disableClose: true
    });
  }

  openDialog() {
    this.salesService.currentTab = 'Add New Back Office';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      disableClose: true
    });
  }

  openUpdateMobileDialog(user) {
    this.dialog.open(DialogUpdateMobileNumberComponent, {
      height: '240px',
      width: '600px',
      data: user,
      disableClose: true
    });
  }

  viewUser(user) {

    this.salesService.currentTab = 'View Back Office';
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


  openMappingDialog(res) {
    this.salesService.currentTab = 'Sub Category Mapping';
    this.dialog.open(DialogSellerMappingComponent, {
      height: '450px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }
}

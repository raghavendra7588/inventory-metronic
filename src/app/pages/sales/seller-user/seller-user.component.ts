import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCategoriesMappingComponent } from '../dialog-categories-mapping/dialog-categories-mapping.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogUpdateMobileNumberComponent } from '../dialog-update-mobile-number/dialog-update-mobile-number.component';
import { SalesService } from '../sales.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DialogSellerMappingComponent } from '../dialog-seller-mapping/dialog-seller-mapping.component';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogViewUserComponent } from '../dialog-view-user/dialog-view-user.component';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-seller-user',
  templateUrl: './seller-user.component.html',
  styleUrls: ['./seller-user.component.scss']
})
export class SellerUserComponent implements OnInit {

  // displayedColumns = ['vendorCode', 'totalCustomer', 'totalProduct', 'totalOrder', 'name', 'email', 'mobile', 'categories', 'mapping', 'edit'];
  displayedColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  dataSource: any;
  adminUsers: any = [];
  role: string;
  isAdmin: boolean = false;
  isDataLoaded: boolean = false;



  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
    this.role = sessionStorage.getItem('role');

    if (this.role == 'Admin') {
      this.isAdmin = true;
      console.log('this.isAdmin', this.isAdmin);
      console.log('role', this.role);
      this.displayedColumns = ['vendorCode', 'totalCustomer', 'totalProduct', 'totalOrder', 'name', 'email', 'mobile', 'categories', 'mapping', 'edit'];
      this.getSellerUser();
    }
    else {
      this.displayedColumns = ['vendorCode', 'totalCustomer', 'totalProduct', 'totalOrder', 'name', 'email', 'mobile', 'categories', 'edit'];
      this.getSellerUser();
      this.isAdmin = false;
    }

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getSellerUser();
      }
    });
  }

  ngOnInit(): void {


  }
  setDataSourceAttributes() {
    // this.dataSource.paginator = this.paginator;
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }
  getSellerUser() {
    let role = 'Seller';
    this.spinner.show();
    this.salesService.getAllSellerUsers(role).subscribe(res => {
      console.log('Seller user', res);
      this.adminUsers = res;
      this.isDataLoaded = true;
      this.dataSource = new MatTableDataSource(this.adminUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      if (Array.isArray(this.dataSource) && this.dataSource.length) {
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editSellerUser(user) {
    console.log('user', user);
    this.salesService.currentTab = 'Edit New Seller';
    this.dialog.open(DialogEditUserComponent, {
      height: '370px',
      width: '1000px',
      data: user,
      disableClose: true
    });
  }


  openSellerUser() {

    this.salesService.currentTab = 'Add New Seller';
    this.dialog.open(DialogEditUserComponent, {
      height: '370px',
      width: '1000px',
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

  openCategoriesDialog(user) {
    this.dialog.open(DialogCategoriesMappingComponent, {
      height: '280px',
      width: '600px',
      data: user,
      disableClose: true
    });
  }



  one() {
    alert('1st clicked ');
  }

  two() {
    alert('2nd clicked ');
  }


  viewUser(user) {

    this.salesService.currentTab = 'View Seller';
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
      title: 'My Awesome CSV',
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
        address: array[i].address,
        pincode: array[i].pincode,


        city: array[i].city,
        state: array[i].state,
        vendorcode: array[i].vendorcode,
        TotalAmount: array[i].TotalAmount,



        TotalCustomer: array[i].TotalCustomer,
        TotalOrder: array[i].TotalOrder,
        TotalProductMapped: array[i].TotalProductMapped,
        TotalSeller: array[i].TotalSeller
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }


  openMappingDialog(res) {
    this.salesService.currentTab = 'Child Seller mapping';
    this.dialog.open(DialogSellerMappingComponent, {
      height: '450px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openSellerDialog(res) {
    this.salesService.currentTab = 'Seller Mapping';
    this.dialog.open(DialogSellerMappingComponent, {
      height: '450px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }
}

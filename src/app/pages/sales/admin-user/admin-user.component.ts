import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCategoriesMappingComponent } from '../dialog-categories-mapping/dialog-categories-mapping.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogUpdateMobileNumberComponent } from '../dialog-update-mobile-number/dialog-update-mobile-number.component';
import { SalesService } from '../sales.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EmitterService } from 'src/app/shared/emitter.service';
import { ExportToCsv } from 'export-to-csv';
import { SubheaderService } from 'src/app/_metronic/partials/layout';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  displayedColumns = ['name', 'emailID', 'mobile', 'pinCode', 'state', 'city', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];

  sellerName: string;
  isDataLoaded: boolean = false;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }



  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    private subheader: SubheaderService
  ) {
  }

  ngOnInit(): void {
    this.sellerName = sessionStorage.getItem('sellerName');
    this.getAdminUser();
    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getAdminUser();
      }
    });

    setTimeout(() => {
      this.subheader.setTitle('Sales / Admin');
      this.subheader.setBreadcrumbs([{
        title: 'Admin',
        linkText: 'Admin',
        linkPath: '/sales/admin'
      }]);
    }, 1);
  }

  getAdminUser() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    let role = 'Admin';
    this.salesService.getAllAdminUsers(role).subscribe(res => {
      
      this.adminUsers = res;
      this.dataSource = new MatTableDataSource(this.adminUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
    });
  }  
  setDataSourceAttributes() {
 
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editAdminUser(user) {
    this.salesService.currentTab = 'Edit Admin';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      data: user,
      disableClose: true
    });

  }

  openAdminDialog() {
    this.salesService.currentTab = 'Add New Admin';
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

  downloadTheReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: this.sellerName.toString(),
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
    for (let i = 0; i < array.length; i++) {
      let item = {
        name: array[i].name,
        emailid: array[i].emailid,
        mobilenumber: array[i].mobilenumber,
        pincode: array[i].pincode,
        state: array[i].state,
        city: array[i].city
      }
      formattedResponse.push(item);
    }
    return formattedResponse;
  }

}






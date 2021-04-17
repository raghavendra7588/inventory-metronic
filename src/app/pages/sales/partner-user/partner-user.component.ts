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
  selector: 'app-partner-user',
  templateUrl: './partner-user.component.html',
  styleUrls: ['./partner-user.component.scss']
})
export class PartnerUserComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  partnerUser: any = [];
  displayedColumns: any;
  role: string;
  isDataLoaded: boolean = false;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }


  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.getSellerUser();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getSellerUser();
      }
    }, err => {
      this.spinner.hide();
    });

    if (this.role == 'Admin') {
      this.displayedColumns = ['id', 'name', 'email', 'mobile', 'pinCode', 'state', 'city', 'mapping', 'edit'];
    }
    else {
      this.displayedColumns = ['id', 'name', 'email', 'mobile', 'pinCode', 'state', 'city', 'edit'];
    }
  }

  getSellerUser() {
    let role = 'partner';
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getAllSellerUsers(role).subscribe(res => {

      this.partnerUser = res;
      this.dataSource = new MatTableDataSource(this.partnerUser);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editSellerUser(user) {

    this.salesService.currentTab = 'Edit Partner';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      data: user,
      disableClose: true
    });
  }

  openPartnerDialog() {
    this.salesService.currentTab = 'Add New Partner';
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
  setDataSourceAttributes() {

    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }

  editCategory(element) {

  }

  viewUser(user) {

    this.salesService.currentTab = 'View Partner';
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
      let requiredResponse = this.formatResponse(this.partnerUser);
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
        state: array[i].state
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }


  openMappingDialog(res) {
    this.salesService.currentTab = 'child Seller Mapping';
    this.dialog.open(DialogSellerMappingComponent, {
      height: '450px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }
}

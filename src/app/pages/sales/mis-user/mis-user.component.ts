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
  selector: 'app-mis-user',
  templateUrl: './mis-user.component.html',
  styleUrls: ['./mis-user.component.scss']
})
export class MisUserComponent implements OnInit {


  displayedColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  misUsers: any = [];
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
  ) {
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.getMisUser();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getMisUser();
      }
    },
      err => {
        this.spinner.hide();
      });

      if (this.role == 'Admin') {
        this.displayedColumns =['name', 'emailID', 'mobile', 'pincode', 'state', 'city', 'edit'];
      }
      else {
        this.displayedColumns = ['name', 'emailID', 'mobile', 'pincode', 'state', 'city', 'edit'];
      }
  }

  getMisUser() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    let role = 'mis';
    this.salesService.getAllAdminUsers(role).subscribe(res => {

      this.misUsers = res;
      this.dataSource = new MatTableDataSource(this.misUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.isDataLoaded = false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  setDataSourceAttributes() {
   
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }

  editCategory(res) {
    this.salesService.currentTab = 'Edit MIS';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openMisDialog() {
    this.salesService.currentTab = 'Add New MIS';
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

    this.salesService.currentTab = 'View MIS';
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
      let requiredResponse = this.formatResponse(this.misUsers);
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

}

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
  selector: 'app-back-office-user',
  templateUrl: './back-office-user.component.html',
  styleUrls: ['./back-office-user.component.scss']
})
export class BackOfficeUserComponent implements OnInit {


  displayedColumns = ['id', 'name', 'email', 'mobile', 'pin', 'state', 'city', 'mapping', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.getBackOfficeUser();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getBackOfficeUser();
      }
    },
      err => {
        this.spinner.hide();
      });
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
      this.spinner.hide();
    });
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

}

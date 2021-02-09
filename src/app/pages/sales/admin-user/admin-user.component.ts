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

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
  }

  ngOnInit(): void {
    this.getAdminUser();
    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getAdminUser();
      }
    });
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
      console.log('admin user', res);
      this.adminUsers = res;
      this.dataSource = new MatTableDataSource(this.adminUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editAdminUser(user) {
    this.salesService.currentTab = 'Edit New Admin';
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



}






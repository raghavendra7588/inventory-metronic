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
  selector: 'app-sales-user',
  templateUrl: './sales-user.component.html',
  styleUrls: ['./sales-user.component.scss']
})
export class SalesUserComponent implements OnInit {

  displayedColumns = ['id', 'name', 'email', 'mobile', 'pin', 'state', 'city', 'mapping', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];

  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.getSalesUser();
    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getSalesUser();
      }
    });
  }

  getSalesUser() {
    let role = 'Sales';
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.getAllSalesUsers(role).subscribe(res => {
      console.log('Sales user', res);
      this.adminUsers = res;
      this.dataSource = new MatTableDataSource(this.adminUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editUser(user) {
    console.log('user', user);
    this.salesService.currentTab = 'Edit Sales Person';
    this.dialog.open(DialogEditUserComponent, {
      height: '380px',
      width: '600px',
      data: user,
      disableClose: true
    });
  }

  openDialog() {
    this.salesService.currentTab = 'Add New Sales Person';
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

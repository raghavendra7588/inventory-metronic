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
  selector: 'app-mis-user',
  templateUrl: './mis-user.component.html',
  styleUrls: ['./mis-user.component.scss']
})
export class MisUserComponent implements OnInit {

  displayedColumns = ['name', 'emailID', 'mobile', 'pincode', 'state', 'city', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  misUsers: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
  }

  ngOnInit(): void {
    this.getMisUser();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getMisUser();
      }
    },
      err => {
        this.spinner.hide();
      });
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
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
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
}

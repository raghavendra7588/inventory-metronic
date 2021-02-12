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
  selector: 'app-partner-user',
  templateUrl: './partner-user.component.html',
  styleUrls: ['./partner-user.component.scss']
})
export class PartnerUserComponent implements OnInit {

  displayedColumns = ['id', 'name', 'email', 'mobile', 'pinCode', 'state', 'city', 'mapping', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  partnerUser: any = [];

  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.getSellerUser();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getSellerUser();
      }
    }, err => {
      this.spinner.hide();
    });
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
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editSellerUser(user) {
    console.log('user', user);
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


  editCategory(element) {

  }
}

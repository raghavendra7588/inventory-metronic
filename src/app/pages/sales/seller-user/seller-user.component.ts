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

@Component({
  selector: 'app-seller-user',
  templateUrl: './seller-user.component.html',
  styleUrls: ['./seller-user.component.scss']
})
export class SellerUserComponent implements OnInit {

  displayedColumns = ['vendorCode', 'totalCustomer', 'totalProduct', 'totalOrder', 'name', 'email', 'mobile', 'categories', 'mapping', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  adminUsers: any = [];

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
    });
  }

  getSellerUser() {
    let role = 'Seller';
    this.spinner.show();
    this.salesService.getAllSellerUsers(role).subscribe(res => {
      console.log('Seller user', res);
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

  openParentChildMapping(user) {
    this.dialog.open(DialogSellerMappingComponent, {
      height: '800px',
      width: '700px',
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
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
  adminUsers: any = [];

  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // this.getSellerUser();
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
    this.salesService.currentTab = 'Edit New';
    // this.dialog.open(DialogEditUserComponent, {
    //   height: '250px',
    //   width: '1000px',
    //   data: user,
    //   disableClose: true
    // });
  }

  openUpdateMobileDialog(user) {
    // this.dialog.open(DialogUpdateMobileNumberComponent, {
    //   height: '240px',
    //   width: '600px',
    //   data: user,
    //   disableClose: true
    // });
  }

  openCategoriesDialog(user) {
    // this.dialog.open(DialogCategoriesMappingComponent, {
    //   height: '280px',
    //   width: '600px',
    //   data: user,
    //   disableClose: true
    // });
  }

  openParentChildMapping(user) {
    // this.dialog.open(DialogSellerMappingComponent, {
    //   height: '800px',
    //   width: '700px',
    //   data: user,
    //   disableClose: true
    // });
  }

  editCategory(element) {

  }
}

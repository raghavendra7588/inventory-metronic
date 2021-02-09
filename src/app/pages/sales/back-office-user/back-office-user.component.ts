import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.getBackOfficeUser();
  }

  getBackOfficeUser() {
    let role = 'backoffice';
    this.salesService.getAllBackOfficeUsers(role).subscribe(res => {
      console.log('backoffice user', res);
      this.adminUsers = res;
      this.dataSource = new MatTableDataSource(this.adminUsers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editSellerUser(user) {
    console.log('user', user);
  }

}

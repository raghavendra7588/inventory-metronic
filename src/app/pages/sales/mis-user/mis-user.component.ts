import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mis-user',
  templateUrl: './mis-user.component.html',
  styleUrls: ['./mis-user.component.scss']
})
export class MisUserComponent implements OnInit {

  displayedColumns = ['name', 'emailID', 'mobile', 'pincode', 'state', 'city', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  constructor() { }

  ngOnInit(): void {
  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {

  }
}

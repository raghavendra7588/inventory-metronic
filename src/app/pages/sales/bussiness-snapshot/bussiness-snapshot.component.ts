import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-bussiness-snapshot',
  templateUrl: './bussiness-snapshot.component.html',
  styleUrls: ['./bussiness-snapshot.component.scss']
})
export class BussinessSnapshotComponent implements OnInit {

  displayedColumns = ['type', 'week', 'month', 'year', 'total'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  role: string;
  userID: string;
  bussinessSnapshotData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
    this.role = sessionStorage.getItem('role');

  }

  ngOnInit(): void {
    this.getBussinessSnapshotData();
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getBussinessSnapshotData() {
    if (this.role === 'Admin') {
      this.userID = '0';
    }
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.getBussinessSnapshot(this.userID).subscribe(res => {
      console.log('bussines', res);
      this.bussinessSnapshotData = res;
      this.dataSource = new MatTableDataSource(this.bussinessSnapshotData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    })
  }


}

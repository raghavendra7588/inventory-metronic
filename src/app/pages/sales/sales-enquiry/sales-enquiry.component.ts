import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogSalesEnquiryComponent } from '../dialog-sales-enquiry/dialog-sales-enquiry.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-enquiry',
  templateUrl: './sales-enquiry.component.html',
  styleUrls: ['./sales-enquiry.component.scss']
})
export class SalesEnquiryComponent implements OnInit {

  displayedColumns = ['shopName', 'shopKeepersName', 'CategoryName', 'phoneNo', 'city', 'Status', 'name', 'date', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  strSellerId: string;
  salesEnquiryData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getSalesEnquiryData(this.strSellerId);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getSalesEnquiryData(userId) {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getSalesEnquiry(userId).subscribe(res => {
      console.log('res', res);
      this.salesEnquiryData = res;
      this.dataSource = new MatTableDataSource(this.salesEnquiryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  
  editCategory(res) {
    this.salesService.currentTab = 'Edit Sales Entry';
    this.dialog.open(DialogSalesEnquiryComponent, {
      height: '500px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openCategoryDialog() {
    this.salesService.currentTab = 'Add New Sales Entry';
    this.dialog.open(DialogSalesEnquiryComponent, {
      height: '300px',
      width: '600px',
      disableClose: true
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogSalesEnquiryComponent } from '../dialog-sales-enquiry/dialog-sales-enquiry.component';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';
import { SubheaderService } from 'src/app/_metronic/partials/layout';

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
  isDataLoaded: boolean = false;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService,
    private subheader: SubheaderService
  ) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getSalesEnquiryData(this.strSellerId);

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getSalesEnquiryData(this.strSellerId);
      }
    });

    setTimeout(() => {
      this.subheader.setTitle('Sales / Sales Enquiry');
      this.subheader.setBreadcrumbs([{
        title: 'Sales Enquiry',
        linkText: 'Sales Enquiry',
        linkPath: '/sales/salesEnquiry'
      }]);
    }, 1);
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

      this.salesEnquiryData = res;
      this.dataSource = new MatTableDataSource(this.salesEnquiryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
    }, err => {
      this.spinner.hide();
    });
  }

  setDataSourceAttributes() {
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
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
      height: '500px',
      width: '600px',
      disableClose: true
    });
  }

  downloadTheReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Customer Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };

    const csvExporter = new ExportToCsv(options);
    if (this.isDataLoaded) {
      let requiredResponse = this.formatResponse(this.salesEnquiryData);
      csvExporter.generateCsv(requiredResponse);
    }

  }

  formatResponse(array) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < array.length; i++) {

      let item = {
        Number: j,
        ShopName: array[i].ShopName,
        ShopKeepersName: array[i].ShopKeepersName,
        CategoryName: array[i].CategoryName,
        PhoneNo: array[i].PhoneNo,
        City: array[i].City,
        Status: array[i].Status,
        Name: array[i].Name,
        Date: array[i].Date
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }

}

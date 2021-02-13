import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogBrandComponent } from '../dialog-brand/dialog-brand.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  displayedColumns = ['brand', 'descriptions', 'image', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  brandsData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService
  ) {

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getAllBrandsData();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    this.getAllBrandsData();
  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.salesService.currentTab = 'Edit Brand';
    this.dialog.open(DialogBrandComponent, {
      height: '300px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  newBrand() {
    this.salesService.currentTab = 'Add New Brand';
    this.dialog.open(DialogBrandComponent, {
      height: '300px',
      width: '600px',
      disableClose: true
    });
  }

  getAllBrandsData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getBrandsData().subscribe(res => {
      console.log('brands data', res);

      this.brandsData = res;
      this.dataSource = new MatTableDataSource(this.brandsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
}

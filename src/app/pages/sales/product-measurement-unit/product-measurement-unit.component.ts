import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-product-measurement-unit',
  templateUrl: './product-measurement-unit.component.html',
  styleUrls: ['./product-measurement-unit.component.scss']
})
export class ProductMeasurementUnitComponent implements OnInit {

  displayedColumns = ['units', 'descriptions', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  productMeasurementData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.getProductMeasurementUnitData();

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getProductMeasurementUnitData();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.salesService.currentTab = 'Edit Product Measurement Unit';
    this.dialog.open(DialogProductComponent, {
      height: '270px',
      width: '600px',
      data: res,
      disableClose: true
    });

  }

  newProductMeasurementUnit() {
    this.salesService.currentTab = 'Add Product Measurement Unit';
    this.dialog.open(DialogProductComponent, {
      height: '270px',
      width: '600px',
      disableClose: true
    });
  }

  getProductMeasurementUnitData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    this.salesService.getProductMeasureMentUnit().subscribe(res => {
      console.log('measure ment Unit', res);
      this.productMeasurementData = res;
      this.dataSource = new MatTableDataSource(this.productMeasurementData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    },
      res => {
        this.spinner.hide();
      });
  }

}

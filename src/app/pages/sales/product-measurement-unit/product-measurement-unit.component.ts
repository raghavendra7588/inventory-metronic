import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProductMeasurementUnitData();
  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.dialog.open(DialogProductComponent, {
      height: '270px',
      width: '600px',
      data: res,
      disableClose: true
    });

  }

  newProductMeasurementUnit() {
    this.dialog.open(DialogProductComponent, {
      height: '270px',
      width: '600px',
      disableClose: true
    });
  }

  getProductMeasurementUnitData() {
    this.salesService.getProductMeasureMentUnit().subscribe(res => {
      console.log('measure ment Unit', res);
      this.productMeasurementData = res;
      this.dataSource = new MatTableDataSource(this.productMeasurementData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

}

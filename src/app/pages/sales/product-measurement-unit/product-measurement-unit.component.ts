import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';
import { SubheaderService } from 'src/app/_metronic/partials/layout';

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
  isDataLoaded: boolean = false;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    private subheader: SubheaderService
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

    this.emitterService.isDeleted.subscribe(val => {
      if (val) {
        this.getProductMeasurementUnitData();
      }
    }, err => {
      this.spinner.hide();
    });

    setTimeout(() => {
      this.subheader.setTitle('Sales / Product Measurement Unit');
      this.subheader.setBreadcrumbs([{
        title: 'Product Measurement Unit',
        linkText: 'Product Measurement Unit',
        linkPath: '/sales/productMeasurementUnit'
      }]);
    }, 1);
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
    
      this.productMeasurementData = res;
      this.dataSource = new MatTableDataSource(this.productMeasurementData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
    },
      res => {
        this.spinner.hide();
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
      let requiredResponse = this.formatResponse(this.productMeasurementData);
      csvExporter.generateCsv(requiredResponse);
    }

  }

  formatResponse(array) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < array.length; i++) {

      let item = {
        Number: j,
        id: array[i].id,
        name: array[i].name,
        descriptions:array[i].descriptions
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }

}

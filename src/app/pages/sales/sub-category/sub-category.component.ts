import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogSubCategoryComponent } from '../dialog-sub-category/dialog-sub-category.component';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';
import { SubheaderService } from 'src/app/_metronic/partials/layout';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  subCategoryData: any = [];

  displayedColumns = ['categoryName', 'parentCategory', 'descriptions', 'image', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  isDataLoaded: boolean = false;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService,
    private subheader: SubheaderService
  ) {
    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getAllSubCategoriesData();
      }
    }, err => {
      this.spinner.hide();
    });
    
    this.emitterService.isDeleted.subscribe(val => {
      if (val) {
        this.getAllSubCategoriesData();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    this.getAllSubCategoriesData();

    setTimeout(() => {
      this.subheader.setTitle('Sales / Sub Category');
      this.subheader.setBreadcrumbs([{
        title: 'Sub Category',
        linkText: 'Sub Category',
        linkPath: '/sales/subCategory'
      }]);
  }, 1);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.salesService.currentTab = 'Edit SubCategory';
    this.dialog.open(DialogSubCategoryComponent, {
      height: '370px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openSubCategory() {
    this.salesService.currentTab = 'Add New Category';
    this.dialog.open(DialogSubCategoryComponent, {
      height: '370px',
      width: '600px',
      disableClose: true
    });
  }

  getAllSubCategoriesData() {
    let subCategory = 'sub';
    this.salesService.getAllSubCategoriesData(subCategory).subscribe(res => {

      this.subCategoryData = res;
      this.dataSource = new MatTableDataSource(this.subCategoryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.isDataLoaded = true;
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
      let requiredResponse = this.formatResponse(this.subCategoryData);
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
        parentcategoryname:array[i].parentcategoryname,
        name: array[i].name,
        descriptions:array[i].descriptions,
        imageurl:array[i].imageurl,
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }

}

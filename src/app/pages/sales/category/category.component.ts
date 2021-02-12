import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogBrandComponent } from '../dialog-brand/dialog-brand.component';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { DialogSubCategoryComponent } from '../dialog-sub-category/dialog-sub-category.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryData: any = [];

  displayedColumns = ['name', 'descriptions', 'image', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    private spinner: NgxSpinnerService
  ) {

    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getCategoryData();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.getAllCategoriesData().subscribe(res => {
      this.categoryData = res;
      this.dataSource = new MatTableDataSource(this.categoryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }
      , err => {
        this.spinner.hide();
      });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.salesService.currentTab = 'Edit Category';
    this.dialog.open(DialogCategoryComponent, {
      height: '300px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openCategoryDialog() {
    this.salesService.currentTab = 'Add New Category';
    this.dialog.open(DialogCategoryComponent, {
      height: '300px',
      width: '600px',
      disableClose: true
    });
  }



}

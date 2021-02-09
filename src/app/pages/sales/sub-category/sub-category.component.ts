import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSubCategoryComponent } from '../dialog-sub-category/dialog-sub-category.component';
import { SalesService } from '../sales.service';

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

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllSubCategoriesData();
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.dialog.open(DialogSubCategoryComponent, {
      height: '370px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openSubCategory() {
    this.dialog.open(DialogSubCategoryComponent, {
      height: '370px',
      width: '600px',
      disableClose: true
    });
  }

  getAllSubCategoriesData() {
    let subCategory = 'sub';
    this.salesService.getAllSubCategoriesData(subCategory).subscribe(res => {
      console.log('sub Category', res);
      this.subCategoryData = res;
      this.dataSource = new MatTableDataSource(this.subCategoryData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

}

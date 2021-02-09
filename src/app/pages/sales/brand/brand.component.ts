import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllBrandsData();
  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {

  }

  newBrand() {
    this.dialog.open(DialogBrandComponent, {
      height: '300px',
      width: '600px',
      disableClose: true
    });
  }

  getAllBrandsData() {
    this.salesService.getBrandsData().subscribe(res => {
      console.log('brands data', res);

      this.brandsData = res;
      this.dataSource = new MatTableDataSource(this.brandsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }
}

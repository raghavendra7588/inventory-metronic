import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProductDataComponent } from '../dialog-product-data/dialog-product-data.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns = ['product', 'brand', 'category', 'subCategory', 'image', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  strSellerId: string;
  productData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getProductData(this.strSellerId);
  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editCategory(res) {
    this.dialog.open(DialogProductDataComponent, {
      height: '270px',
      width: '600px',
      data: res,
      disableClose: true
    });
  }

  openProductDialog() {
    this.dialog.open(DialogProductDataComponent, {
      height: '490px',
      width: '1000px',
      disableClose: true
    });
  }


  getProductData(userId) {
    this.salesService.getProductsData(userId).subscribe(res => {
      console.log('product', res);
      this.productData = res;
      this.dataSource = new MatTableDataSource(this.productData);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    });
  }
}

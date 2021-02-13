import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-mapped-products',
  templateUrl: './mapped-products.component.html',
  styleUrls: ['./mapped-products.component.scss']
})
export class MappedProductsComponent implements OnInit {

  displayedColumns = ['id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'availableQuantity', 'save', 'delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  sellerData: any = [];
  role: string;
  filteredSellerData: any = [];

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService
  ) {
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.getSellerUsers();
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getSellerUsers() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    if (this.role == 'Admin') {
      this.role = 'Seller';
    }
    this.salesService.getSellerUsers(this.role).subscribe(res => {
      this.sellerData = res;
      this.filteredSellerData = this.sellerData.slice();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
    this.filteredSellerData = this.sellerData.slice();
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-un-mapped-products',
  templateUrl: './un-mapped-products.component.html',
  styleUrls: ['./un-mapped-products.component.scss']
})
export class UnMappedProductsComponent implements OnInit {

  displayedColumns = ['id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'availableQuantity', 'save'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}

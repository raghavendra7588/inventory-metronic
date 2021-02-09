import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mapped-products',
  templateUrl: './mapped-products.component.html',
  styleUrls: ['./mapped-products.component.scss']
})
export class MappedProductsComponent implements OnInit {

  displayedColumns = ['id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'availableQuantity', 'save', 'delete'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  constructor() { }

  ngOnInit(): void {
  }
  
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


}

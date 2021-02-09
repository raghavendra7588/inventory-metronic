import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-update-out-of-stock',
  templateUrl: './update-out-of-stock.component.html',
  styleUrls: ['./update-out-of-stock.component.scss']
})
export class UpdateOutOfStockComponent implements OnInit {

  displayedColumns = ['id', 'brand', 'product', 'quantity', 'price', 'discount', 'finalPrice', 'outOfStockMsg', 'isOutOfStock'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}

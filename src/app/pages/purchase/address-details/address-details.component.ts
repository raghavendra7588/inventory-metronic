import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { AddAddressComponent } from '../add-address/add-address.component';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  getAddress: any = [];

  displayedColumns: string[] = ['address', 'action'];
  dataSource: any;
  sellerId: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public purchaseService: PurchaseService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getAddressDetails();
    this.emitterService.isAddressCreated.subscribe(value => {
      if (value) {
        this.getAddressDetails();
      }
    });
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
  }


  getAddressDetails() {
    this.purchaseService.getAddressData().subscribe(data => {
      this.getAddress = data;
      this.dataSource = new MatTableDataSource(this.getAddress);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  openDialog() {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px'
    });
  }

  editEmployee(element) {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px',
      data: element
    });
  }

}

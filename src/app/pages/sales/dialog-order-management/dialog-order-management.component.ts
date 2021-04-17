import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-order-management',
  templateUrl: './dialog-order-management.component.html',
  styleUrls: ['./dialog-order-management.component.scss']
})
export class DialogOrderManagementComponent implements OnInit {


  displayedColumns = ['productName', 'varient', 'quantity', 'mrp', 'discount', 'finalPrice'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  orderData: any = [];
  totalOrderedQuantity: number;

  deliveryStatus: any = [];
  deliverySlot: any = [];
  selectStatus: string;
  deliverySlotTiming: string;
  strSellerId: string;
  orderNo: string;

  constructor(
    private dialogRef: MatDialogRef<DialogOrderManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService
  ) {
    this.orderData = data;
    this.assignValues();
  
    this.orderNo = this.orderData.orderid;
    this.dataSource = new MatTableDataSource(this.orderData.orderDetails);
    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.calculateTotalQuantity(this.orderData.orderDetails);
  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.deliveryStatus = [
      {
        id: 0, title: 'Select Status'
      },
      {
        id: 1, title: 'Confirm Order'
      },
      {
        id: 2, title: 'Complete'
      }
    ];

    this.deliverySlot = [
      {
        id: 0, title: 'Anytime'
      },
      {
        id: 1, title: '9AM-1PM'
      },
      {
        id: 2, title: '1PM-5PM'
      },
      {
        id: 3, title: '5PM-9PM'
      }
    ];
  }



  calculateTotalQuantity(arr) {
    let totalFinalPrice: number = 0;
    arr.forEach(item => {
      totalFinalPrice += Number(item.QuantityOrdered);
    });

    this.totalOrderedQuantity = totalFinalPrice;

  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  onSubmit() {
    let formData = new FormData();

    let Order = {
      "name": this.orderData.name.toString(),
      "orderid": this.orderData.orderid.toString(),
      "status": this.selectStatus.toString(),
      "deliveryUpto": this.orderData.deliveryUpto.toString(),
      "deliveryType": this.orderData.deliveryType.toString(),
      "userId": this.strSellerId,
      "paymentType": this.orderData.paymentType.toString(),
      "sellerId": this.orderData.sellerId.toString(),
      "cartId": this.orderData.cartid.toString(),
      "deliveredDate": "",
      "sellerName": this.orderData.sellerName.toString(),
      "deliverySlot": this.deliverySlotTiming.toString(),
      "deliveredBy": "",
      "IsActive": "1"
    }

    formData.append('Order', JSON.stringify(Order));
  
    this.salesService.updateOrders(formData).subscribe(res => {
      this.toastr.success('Updated Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    });

  }

  assignValues() {
    this.selectStatus = this.orderData.status;
    this.deliverySlotTiming = this.orderData.deliverySlot;
  }
}

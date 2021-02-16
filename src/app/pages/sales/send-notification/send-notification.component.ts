import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SendNotification } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  sendUsing: any = [];
  selectTargetUser: any = [];


  sellerData: any = [];
  role: string;
  filteredSellerData: any = [];

  sendNotification: SendNotification = new SendNotification();
  sellerArray: any = [];
  selectedTargetUserstr: string;
  selectedSendUsingStr: string;
  isPincode: boolean = false;

  notificationForm: FormGroup;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public formBuilder: FormBuilder,
    public emitterService: EmitterService,
    public toastr: ToastrService
  ) {
    this.role = sessionStorage.getItem('role');

    this.notificationForm = this.formBuilder.group({
      sendusing: [''],
      userType: [''],
      notificationTitle: [''],
      notificationBody: [''],
      sellerCode: [''],
      pincode: [''],
    });
  }

  ngOnInit(): void {
    this.getSellerUsers();
    this.sendUsing = [
      {
        id: 0, title: 'Seller Code'
      },
      {
        id: 0, title: 'Pin Code'
      }
    ];

    this.selectTargetUser = [
      {
        id: 0, title: 'Seller'
      },
      {
        id: 0, title: 'Buyer'
      }
    ];
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


  onSellerChange(event, response) {

    if (event.source.selected) {
      this.sellerArray.push(response.vendorcode);
      console.log('seller array', this.sellerArray);
    }
    if (!event.source.selected) {


      const index = this.sellerArray.indexOf(response.vendorcode);
      if (index > -1) {
        this.sellerArray.splice(index, 1);
      }
      console.log('after removal', this.sellerArray);
    }
  }

  sendNotificationToUser() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    if (this.selectedTargetUserstr == 'Seller') {
      let sellerString = this.sellerArray.toString();
      this.sendNotification.vendorCode = sellerString.toString();
      this.sendNotification.vendorCode2 = this.sellerArray;
    }
    else {
      this.sendNotification.vendorCode = '';
      this.sendNotification.vendorCode2 = '';
    }
    if (this.selectedSendUsingStr == 'Pin Code') {
      this.sendNotification.sendusing = 'Pincode';
    }
    else {
      this.sendNotification.sendusing = 'SellerCode';
    }


    let notification = {
      'notificationBody': this.sendNotification.notificationBody,
      'notificationTitle': this.sendNotification.notificationTitle,
      'notifyId': "0",
      'pincode': this.sendNotification.pincode,
      'sendusing': this.sendNotification.sendusing,
      'userType': this.sendNotification.userType,
      'vendorCode': this.sendNotification.vendorCode,
      'vendorCode2': this.sendNotification.vendorCode2
    }
    this.salesService.sendNotification(notification).subscribe(res => {
      this.toastr.success('Sent Successfully !!');
      this.clearValues();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
    // console.log('this.sendNotification', this.sendNotification);
    console.log('Notification', notification);
  }

  selectedTargetUser(res) {
    this.selectedTargetUserstr = res.title;
  }

  selectedSendUsing(res) {
    this.selectedSendUsingStr = res.title;
    if (res.title == 'Pin Code') {
      this.isPincode = true;

    }
    else {
      this.isPincode = false;
      this.sendNotification.pincode = '';

    }
  }


  clearValues() {
    this.sendNotification.notificationBody = '';
    this.sendNotification.notificationTitle = '';

    this.sendNotification.pincode = '';
    this.sendNotification.sendusing = '';
    this.sendNotification.userType = '';
    this.sendNotification.vendorCode = '';
    this.sendNotification.vendorCode2 = [];
    this.sendNotification.sellerCode = '';
    this.isPincode = false;
  }
}

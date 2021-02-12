import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  sendUsing: any = [];
  selectTargetUser: any = [];

  constructor() { }

  ngOnInit(): void {
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

}

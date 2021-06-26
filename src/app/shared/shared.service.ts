import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  SubscriptionIsActive: string;

  constructor() {
    this.SubscriptionIsActive = sessionStorage.getItem('isSubscriptionValid');
  }


}

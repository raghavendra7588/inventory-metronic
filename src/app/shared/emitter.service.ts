import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  public isLoggedIn: EventEmitter<boolean>;
  public isLoggedInSuccessful: EventEmitter<boolean>;
  public isRecord: EventEmitter<boolean>;
  public isVendorMasterUpdated: EventEmitter<boolean>;
  public isAddressCreated: EventEmitter<boolean>;
  public isPriceListUpdated: EventEmitter<boolean>;
  public sendPurchaseOrder: EventEmitter<any>;
  public isItemCreated: EventEmitter<boolean>;
  public isLoginResponse: EventEmitter<any>;
  public isBrandPreviousClicked: EventEmitter<boolean>;
  public isProductRemoved: EventEmitter<boolean>;
  public isProductIsAddedOrRemoved: EventEmitter<boolean>;
  public isPurchaseWeekLoaded: EventEmitter<boolean>;
  public currentlySelectedTab: EventEmitter<boolean>;
  public isAdminCreadtedOrUpdated: EventEmitter<boolean>;
  public isDeleted: EventEmitter<boolean>;
  public isResponseLoaded: EventEmitter<boolean>;

  constructor() {
    this.isLoggedIn = new EventEmitter();
    this.isLoggedInSuccessful = new EventEmitter();
    this.isRecord = new EventEmitter();
    this.isVendorMasterUpdated = new EventEmitter();
    this.isAddressCreated = new EventEmitter();
    this.isPriceListUpdated = new EventEmitter();
    this.sendPurchaseOrder = new EventEmitter();
    this.isItemCreated = new EventEmitter();
    this.isLoginResponse = new EventEmitter();
    this.isBrandPreviousClicked = new EventEmitter();
    this.isProductRemoved = new EventEmitter();
    this.isProductIsAddedOrRemoved = new EventEmitter();
    this.isPurchaseWeekLoaded = new EventEmitter();
    this.currentlySelectedTab = new EventEmitter();
    this.isAdminCreadtedOrUpdated = new EventEmitter();
    this.isDeleted = new EventEmitter();
    this.isResponseLoaded = new EventEmitter();
  }
}

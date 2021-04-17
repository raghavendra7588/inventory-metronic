import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/modules/auth/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  price: any;
  token: string;
  sellerId: string;
  intSellerId: number;
  storageSellerId: number;
  priceListData: any = [];
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];

  

  private GET_PURCHASE_ORDER_INVENTORY_DATA = environment.BASE_URL + 'api/PurchaseReportInventory';
  private SAVE_ITEM_MASTER = environment.BASE_URL + 'api/ItemMaster';
  private GET_ITEM_MASTER = environment.BASE_URL + 'api/ItemMaster';
  private GET_MEASUREMENT_UNIT = environment.ADMIN_BASE_URL + 'PriceDecisionFactor/getall';
  private SAVE_STOCK_IN_ITEMS = environment.BASE_URL + 'api/StockIn';
  private GET_STOCK_IN_ITEMS = environment.BASE_URL + 'api/StockIn';

  constructor(public http: HttpClient, public loginService: LoginService) {
    this.token = sessionStorage.getItem('token');
    this.sellerId = sessionStorage.getItem('sellerId');
    this.storageSellerId = Number(sessionStorage.getItem('sellerId'));
  }

  getPurchaseOrderInventoryData(purchaseOrderInventoryData) {
    return this.http.post(this.GET_PURCHASE_ORDER_INVENTORY_DATA, purchaseOrderInventoryData);
  }

  saveItemMaster(itemMaster) {
    return this.http.post(this.SAVE_ITEM_MASTER, itemMaster);
  }

  getItemMaster(sellerId: number) {
    return this.http.get(this.GET_ITEM_MASTER + '/' + sellerId);
  }

  postStockInItem(stockIn) {
    return this.http.post(this.SAVE_STOCK_IN_ITEMS, stockIn);
  }

  getStockInItem(sellerId: number) {
    return this.http.get(this.GET_STOCK_IN_ITEMS + '/' + sellerId);
  }


  getMeasurementUnitData() {
    const data = {};
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_MEASUREMENT_UNIT, data, { headers: reqHeader });
  }
}

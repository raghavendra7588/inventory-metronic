import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MonthData } from './reports.model';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  // private BASE_URL = 'https://3intellects.co.in/uat_InventoryService/';
  // private ADMIN_BASE_URL = 'https://3intellects.co.in/uat_AdminApi/api/';

  // private BASE_URL = 'http://localhost:55547/';

  private GET_Product_Vendor_Wise_Purchase_Report_Data = environment.BASE_URL + 'api/ProductVendorWisePurchaseReport';
  private GET_Minimum_PurchaseOrder_DATA = environment.BASE_URL + 'api/MinimumPurchaseReportInventory';
  private GET_PURCHASE_AMOUNT_PER_WEEk = environment.BASE_URL + 'api/DashBoard/getPurchaseValueByWeek';
  private GET_PURCHASE_AMOUNT_PER_WEEk_BY_VENDOR = environment.BASE_URL + 'api/DashBoard/getPurchaseValueByWeekByVendor';
  private GET_FASTEST_MOVING_DATA_BY_MONTH = environment.BASE_URL + 'api/DashBoard/postFastestMovingProductsPerMonth';
  private POST_PURCHASE_AMOUNT_PER_MONTH = environment.BASE_URL + 'api/DashBoard/getPurchaseAmountByMonth';
  private POST_PURCHASE_AMOUNT_PER_MONTH_BY_VENDOR = environment.BASE_URL + 'api/DashBoard/getPurchaseAmountByMonthByVendor';
  private POST_HIGHEST_VALUE_PRODUCTS_BY_MONTH = environment.BASE_URL + 'api/DashBoard/getHighestValueProductsByCurrentMonth';
  private POST_HIGHEST_VALUE_PRODUCTS_BY_LAST_MONTH = environment.BASE_URL + 'api/DashBoard/getHighestValueByLastMonth';
  private POST_DASHBOARD_SALES = environment.ADMIN_BASE_URL + 'DashBoard/GetCount';

  private POST_DASHBOARD_COUNT_DATA = 'https://3intellects.co.in/uat_AdminApi/api/DashBoard/GetCount';

  constructor(
    public http: HttpClient) { }

  getAllMinimumPurchaseData(PurchaseOrder) {
    return this.http.post(this.GET_Minimum_PurchaseOrder_DATA, PurchaseOrder);
  }

  getMinimumPurchaseDataById(id) {
    return this.http.get(this.GET_Minimum_PurchaseOrder_DATA + '/' + id);
  }

  getProductVendorWiseData(PurchaseOrder) {
    return this.http.post(this.GET_Product_Vendor_Wise_Purchase_Report_Data, PurchaseOrder);
  }


  getPurchaseValueByWeek(sellerId) {
    return this.http.get(this.GET_PURCHASE_AMOUNT_PER_WEEk + '/' + sellerId);
  }

  getPurchaseValueByWeekByVendor(sellerId) {
    return this.http.get(this.GET_PURCHASE_AMOUNT_PER_WEEk_BY_VENDOR + '/' + sellerId);
  }

  getFastestMovingDataByMonth(sellerId) {
    return this.http.get(this.GET_FASTEST_MOVING_DATA_BY_MONTH + '/' + sellerId);
  }


  getPurchaseAmountByMonth(monthData: MonthData) {
    return this.http.post(this.POST_PURCHASE_AMOUNT_PER_MONTH, monthData);
  }


  getPurchaseAmountByMonthPerVendor(monthData: MonthData) {
    return this.http.post(this.POST_PURCHASE_AMOUNT_PER_MONTH_BY_VENDOR, monthData);
  }

  getHighestValueProductByMonth(monthData: MonthData) {
    return this.http.post(this.POST_HIGHEST_VALUE_PRODUCTS_BY_MONTH, monthData);
  }

  getHighestValueProductByLastMonth(monthData: MonthData) {
    return this.http.post(this.POST_HIGHEST_VALUE_PRODUCTS_BY_LAST_MONTH, monthData);
  }

  getDashBoardSales(userId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.POST_DASHBOARD_COUNT_DATA + '?' + 'userId=' + userId.toString(), { headers: headers });
  }

}

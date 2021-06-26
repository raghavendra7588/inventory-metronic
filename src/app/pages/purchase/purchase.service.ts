import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/modules/auth/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  price: any;
  token: string;
  sellerId: string;
  intSellerId: number;
  storageSellerId: number;
  selectedVendorIdForPurchaseOrder: number = 0;

  priceListData: any = [];
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];
  allvendorData: any = [];
  allBrandData: any = [];
  retailersAddressData: any = [];

  addressData: any = [];

  private GET_CATEGORIES_DATA = environment.ADMIN_BASE_URL + '/ProductSellerMapping/getalledit';
  private GET_ALL_ADDRESSS_DATA = environment.BASE_URL + 'api/Address';
  private SAVE_VENDOR_MASTER = environment.BASE_URL + 'api/Vendor';
  private GET_SUBCATEGORIES = environment.ADMIN_BASE_URL + 'Category/getall';
  private GET_BRANDS = environment.ADMIN_BASE_URL + 'ProductSellerMapping/getalledit';
  private GET_BRANDS_DATA = environment.ADMIN_BASE_URL + 'Product/GetAllProductList';
  private GET_ALL_VENDOR_DATA = environment.BASE_URL + 'api/Vendor';
  private SAVE_ADDRESS_MASTER = environment.BASE_URL + 'api/address';
  private SAVE_PRICE_LIST = environment.BASE_URL + 'api/PriceList';
  private SAVE_MULTIPLE_PRICE_LIST = environment.BASE_URL + 'api/PriceList/multiple';
  private GET_ALL_PRICELIST_DATA = environment.BASE_URL + 'api/PriceList';
  private SAVE_PURCHASE_ORDER_MASTER = environment.BASE_URL + 'api/PurchaseOrder';
  private SAVE_PURCHASE_ORDER_ITEM_MASTER = environment.BASE_URL + 'api/PurchaseOrderItem';
  private GET_PURCHASE_ORDER_DATA = environment.BASE_URL + 'api/PurchaseReport';
  private GET_PURCHASE_ORDER = environment.BASE_URL + 'api/PurchaseOrder/getOrderIdByVendorId';
  private GET_PURCHASE_ORDER_ITEM_DATA = environment.BASE_URL + 'api/PurchaseOrder/getOrderItemData';

  public PURCHASE_VENDOR_ORDER_WISE = environment.BASE_URL + 'api/PurchaseReport/purchaseReportVendorOrderWise';
  public GET_VENDOR_VIEW_DATA = environment.BASE_URL + 'api/VendorView';

  private GET_DASHBOARD_PURCHASE_PER_DAY = environment.BASE_URL + 'api/DashBoard/postPurchasePerDay';
  private GET_DASHBOARD_PURCHASE_PER_MONTH = environment.BASE_URL + 'api/DashBoard/postPurchasePerMonth';
  private GET_DASHBOARD_PURCHASE_ORDER_PER_DAY = environment.BASE_URL + 'api/DashBoard/postPurchaseOrderPerDay';
  private GET_DASHBOARD_PURCHASE_ORDER_PER_MONTH = environment.BASE_URL + 'api/DashBoard/postPurchaseOrderPerMonth';
  private GET_DASHBOARD_FASTEST_MOVING_DATA_PER_MONTH = environment.BASE_URL + 'api/DashBoard';
  private GET_BRANDS_DATA_BASED_ON_CATEGORY_SUBCATEGORY_ID = environment.ADMIN_BASE_URL + 'Product/GetAllBrandBasedonCategoryIDandSubCategoryID';
  // private GET_ALL_PRODUCTS_MAPPED_UNMAPPED = environment.HTTP_ADMIN_BASE_URL + 'Product/GetallProduct2';
  private GET_ALL_PRODUCTS_MAPPED_UNMAPPED = environment.ADMIN_BASE_URL + 'Product/GetallProduct2';

  constructor(
    public http: HttpClient,
    public loginService: LoginService) {
    this.token = sessionStorage.getItem('token');
    this.sellerId = sessionStorage.getItem('sellerId');
    this.storageSellerId = Number(sessionStorage.getItem('sellerId'));
  }

  getAllCategories(SellerId) {
    let data = { CategoryId: '0', SellerId: SellerId, SubCategoryId: '0' };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.GET_CATEGORIES_DATA, data, { headers: reqHeader });
  }

  getAllSubCategories(parentid) {
    const data = { 'parentid': parentid }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_SUBCATEGORIES, data, { headers: reqHeader });
  }



  getAllBrand(parenetid: any, SubCategoryId: string) {
    const data = { "SellerId": this.sellerId, "CategoryId": parenetid, "SubCategoryId": SubCategoryId }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS, data, { headers: reqHeader });
  }

  getMappedUnMappedProducts(parenetid: any, SubCategoryId: string) {
    const data = { "SellerId": this.sellerId, "CategoryId": parenetid, "SubCategoryId": SubCategoryId }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_PRODUCTS_MAPPED_UNMAPPED, data, { headers: reqHeader });
  }



  getAllBrandData(parenetid: any, SubCategoryId: string) {
    const data = { "SellerId": this.sellerId, "CategoryId": parenetid, "SubCategoryId": SubCategoryId }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS_DATA, data, { headers: reqHeader });
  }

  getAllBrandsByCategoryAndSubCategoryID(parenetid: any, SubCategoryId: string) {
    const data = { "CategoryId": parenetid, "SubCategoryId": SubCategoryId }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS_DATA_BASED_ON_CATEGORY_SUBCATEGORY_ID, data, { headers: reqHeader });
  }

  getEveryBrand() {
    const data = { "SellerId": this.sellerId, "CategoryId": "0", "SubCategoryId": "0" }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS, data, { headers: reqHeader });
  }

  getEachBrand(categoryId, subcategoryId) {
    const data = { "SellerId": this.sellerId, "CategoryId": categoryId, "SubCategoryId": subcategoryId }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS, data, { headers: reqHeader });
  }

  getAddressData() {
    return this.http.get(this.GET_ALL_ADDRESSS_DATA + '/' + this.storageSellerId);
  }

  saveVendorMaster(vendorData: any) {
    return this.http.post(this.SAVE_VENDOR_MASTER, vendorData);
  }

  getAllVendorData(sellerId: string) {
    return this.http.get(this.GET_ALL_VENDOR_DATA + '/' + sellerId);
  }

  saveAddressMaster(addressData) {
    return this.http.post(this.SAVE_ADDRESS_MASTER, addressData);
  }

  savePriceListMaster(priceListData) {
    return this.http.post(this.SAVE_PRICE_LIST, priceListData);
  }

  saveMultiplePriceList(priceListData) {
    return this.http.post(this.SAVE_MULTIPLE_PRICE_LIST, priceListData);
  }

  getAllPriceListData(sellerId: number) {
    return this.http.get(this.GET_ALL_PRICELIST_DATA + '/' + sellerId);
  }

  savePurchaseOrderMaster(purchaseOrderData) {
    return this.http.post(this.SAVE_PURCHASE_ORDER_MASTER, purchaseOrderData);
  }

  savePurchaseOrderItemMaster(purchaseOrderItem) {
    return this.http.post(this.SAVE_PURCHASE_ORDER_ITEM_MASTER, purchaseOrderItem);
  }

  getPurchaseReportData(purchaseReport) {
    return this.http.post(this.PURCHASE_VENDOR_ORDER_WISE, purchaseReport);
  }

  getPurchaseReportById(id) {
    return this.http.get(this.GET_PURCHASE_ORDER_DATA + '/' + id);
  }

  getAllVendorViewData(vendorView) {
    return this.http.post(this.GET_VENDOR_VIEW_DATA, vendorView);
  }

  getAllPurchaseOrderData(vendorData) {
    return this.http.post(this.GET_PURCHASE_ORDER, vendorData);
  }

  getAllPurchaseOrderItemData(data) {
    return this.http.post(this.GET_PURCHASE_ORDER_ITEM_DATA, data);
  }

  getDashBoardPurchasePerDayData(purchaseData) {
    return this.http.post(this.GET_DASHBOARD_PURCHASE_PER_DAY, purchaseData);
  }

  getDashBoardPurchasePerMonthData(purchaseData) {
    return this.http.post(this.GET_DASHBOARD_PURCHASE_PER_MONTH, purchaseData);
  }

  getDashBoardPurchaseOrderPerDayData(purchaseReport) {
    return this.http.post(this.GET_DASHBOARD_PURCHASE_ORDER_PER_DAY, purchaseReport);
  }

  getDashBoardPurchaseOrderPerMonth(purchaseReport) {
    return this.http.post(this.GET_DASHBOARD_PURCHASE_ORDER_PER_MONTH, purchaseReport);
  }

  getFastestMovingDataPerMonth(sellerId: string) {
    return this.http.get(this.GET_DASHBOARD_FASTEST_MOVING_DATA_PER_MONTH + '/' + sellerId);
  }

}

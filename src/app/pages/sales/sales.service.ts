import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  token: string;
  public currentTab: string = '';
  public showGeneralEditDialog: boolean;

  // BASE_URL = 'http://203.112.144.38/AdminApi/UploadedFiles/';
  BASE_URL = 'https://3intellects.co.in/UAT_AdminApi/UploadedFiles/';
  BASE_URL_DOCUMENTS = 'https://3intellects.co.in/uat_AdminApi';

  ADMIN_BASE_URL = 'https://3intellects.co.in/uat_AdminApi/api/';

  private GET_ALL_ADMIN_USERS = environment.ADMIN_BASE_URL + '/user/getall';
  private GET_ALL_SELLER_USERS = environment.ADMIN_BASE_URL + '/user/getall';
  private GET_ALL_CUSTOMER_USERS = environment.ADMIN_BASE_URL + '/user/getall';
  private GET_ALL_SALES_USERS = environment.ADMIN_BASE_URL + '/user/getall';
  private GET_ALL_BACK_OFFICE_USERS = environment.ADMIN_BASE_URL + '/user/getall';
  private GET_ALL_CATEGORIES_DATA = environment.ADMIN_BASE_URL + '/Category/getall';
  private GET_PARENT_CHILD_BRAND_MAPPING = environment.ADMIN_BASE_URL + '/Brand/getParentChildMapping';
  private GET_PRODUCT_MEASUREMENT_UNIT = environment.ADMIN_BASE_URL + '/PriceDecisionFactor/getall';
  private GET_ALL_BRAND_DATA = environment.ADMIN_BASE_URL + '/Brand/getall';
  private GET_ALL_PRODUCT_DATA = environment.ADMIN_BASE_URL + '/Product/getall';
  private SAVE_ADMIN_USER = environment.ADMIN_BASE_URL + '/user/validate';
  private EDIT_ADMIN_USER = environment.ADMIN_BASE_URL + '/user/InsertUpdate';
  private INSERT_UPDATE_CATEGORY = environment.ADMIN_BASE_URL + 'Category/InsertUpdate';
  private UPDATE_MOBILE_NUMBER = environment.ADMIN_BASE_URL + '/user/UpdateMobileNumber';
  private UPDATE_CATEGORIES = environment.ADMIN_BASE_URL + '/user/savecategories';
  private UPDATE_PRICE_DECISION_FACTOR = environment.ADMIN_BASE_URL + '/PriceDecisionFactor/InsertUpdate';
  private GET_ORDER_LIST = environment.ADMIN_BASE_URL + '/order/GetOrderList';
  private GET_SALES_ENQUIRY_DATA = environment.ADMIN_BASE_URL + '/sales/getall';
  private GET_BUSSINESS_SNAPSHOT_DETAILS = environment.ADMIN_BASE_URL + 'DashBoard/GetCount';
  private BRAND_INSERT_UPDATE = environment.ADMIN_BASE_URL + '/Brand/InsertUpdate';
  private INSERT_PRODUCTS = environment.ADMIN_BASE_URL + '/Product/InsertUpdate';
  private DELETE_PRODUCTS = environment.ADMIN_BASE_URL + '/Product/InsertUpdate';
  private DELETE_PRODUCT_MEASUREMENT_UNIT = environment.ADMIN_BASE_URL + '/PriceDecisionFactor/InsertUpdate';
  private DELETE_SUBCATEGORIES = environment.ADMIN_BASE_URL + '/Category/InsertUpdate';
  private INSERT_UPDATE_ORDER = environment.ADMIN_BASE_URL + '/order/InsertUpdate';
  private INSERT_DOCUMENT = environment.ADMIN_BASE_URL + '/UploadFiles/UploadFile';
  private GET_DOCUMENT_BY_ID = environment.ADMIN_BASE_URL + '/UploadFiles/GetUploadedFileById';
  private SEND_NOTIFICATION = environment.ADMIN_BASE_URL + 'Notification/SendBulkNotification';
  private INSERT_UPDATE_SALES_ENQUIRY = environment.ADMIN_BASE_URL + '/sales/InsertUpdate';
  private GET_UNMAPPED_PRODUCT_DATA = environment.ADMIN_BASE_URL + '/ProductSellerMapping/getalleditunmaped';
  private SAVE_UNMAPPED_PRODUCTS = environment.ADMIN_BASE_URL + '/ProductSellerMapping/InsertUpdate2';
  private GET_MAPPED_PRODUCT_DATA = environment.ADMIN_BASE_URL + '/ProductSellerMapping/getalledit';
  private DOWNLOAD_BULK_PRODUCT_SELLING_DATA = environment.ADMIN_BASE_URL + 'ProductSellerMapping/GetCSV';
  private UPLOAD_BULK_PRODUCT_CSV = environment.ADMIN_BASE_URL + '/ProductSellerMapping/UploadCSV';
  private DOWNLOAD_ORDER_SALES_REPORT = environment.ADMIN_BASE_URL + 'ProductSellerMapping/Getreport';
  private PARENT_CHILD_MAPPING = environment.ADMIN_BASE_URL + '/Brand/InsertParentChildMapping';
 


  constructor(
    private http: HttpClient
  ) {
    this.token = sessionStorage.getItem('token');
  }

  getAllAdminUsers(role) {
    const data = { 'role': role };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_ADMIN_USERS, data, { headers: reqHeader });
  }


  getAllSellerUsers(role) {
    const data = { 'role': role };

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_SELLER_USERS, data, { headers: reqHeader });
  }

  getSellerUsersData(role, loginid) {
    const data = { 'role': role };

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'loginid': loginid
    });
    return this.http.post(this.GET_ALL_SELLER_USERS, data, { headers: reqHeader });
  }


  getAllCustomerUsers(role, userId) {
    const data = { 'role': role };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'loginid': userId
    });

    return this.http.post(this.GET_ALL_CUSTOMER_USERS, data, { headers: reqHeader });

  }

  getAllCustomerUsersByAdmin(role) {
    const data = { 'role': role };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.GET_ALL_CUSTOMER_USERS, data, { headers: reqHeader });

  }


  getAllSalesUsers(role) {
    const data = { 'role': role };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_SALES_USERS, data, { headers: reqHeader });
  }

  getAllBackOfficeUsers(role) {
    const data = { 'role': role };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_BACK_OFFICE_USERS, data, { headers: reqHeader });
  }

  getAllCategoriesData() {
    const data = {};
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_CATEGORIES_DATA, data, { headers: reqHeader });
  }

  getCategoriesData(parentid) {
    let data = { parentid: parentid }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_CATEGORIES_DATA, data, { headers: reqHeader });
  }

  getParentChildMappingBrand(id) {
    const data = { userid: id.toString() };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_PARENT_CHILD_BRAND_MAPPING, data, { headers: reqHeader });
  }


  getAllSubCategoriesData(res) {
    const data = { 'parentid': res };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_CATEGORIES_DATA, data, { headers: reqHeader });
  }


  getAllCategories(parentid, userid) {
    const req = { 'parentid': parentid, userid: userid };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_CATEGORIES_DATA, req, { headers: reqHeader });
  }


  getAllSubCategories(parentid) {
    const req = { 'parentid': parentid };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_CATEGORIES_DATA, req, { headers: reqHeader });
  }


  getProductMeasureMentUnit() {
    const data = {};
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_PRODUCT_MEASUREMENT_UNIT, data, { headers: reqHeader });
  }

  getBrandsData() {
    const data = {};
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_BRAND_DATA, data, { headers: reqHeader });
  }

  getProductsData(userId) {
    const data = { "userid": userId.toString() }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_ALL_PRODUCT_DATA, data, { headers: reqHeader });
  }

  saveAdminUser(user) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.SAVE_ADMIN_USER, user, { headers: reqHeader });
  }


  editAdminUser(user) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.EDIT_ADMIN_USER, user, { headers: reqHeader });
  }

  updateContactNumber(user) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.SAVE_ADMIN_USER, user, { headers: reqHeader });
  }

  insertUpdateCategory(Category) {

    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.INSERT_UPDATE_CATEGORY, Category, { headers: reqHeader });
  }

  deleteSubCategories(subCategory) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.DELETE_SUBCATEGORIES, subCategory, { headers: reqHeader });

  }

  sendNotification(notification) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.SEND_NOTIFICATION, notification, { headers: reqHeader });
  }

  insertUpdateBrand(Brand) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.BRAND_INSERT_UPDATE, Brand, { headers: reqHeader });
  }

  deleteBrand(Brand) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.BRAND_INSERT_UPDATE, Brand, { headers: reqHeader });
  }

  deleteProductUnitData(productUnitData) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.DELETE_PRODUCT_MEASUREMENT_UNIT, productUnitData, { headers: reqHeader });
  }


  insertUpdateProducts(products) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.INSERT_PRODUCTS, products, { headers: reqHeader });
  }

  insertProducts(products) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.INSERT_PRODUCTS, products, { headers: reqHeader });
  }

  deleteProducts(products) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.DELETE_PRODUCTS, products, { headers: reqHeader });
  }

  updateMobileNumber(mobileNumberData) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.UPDATE_MOBILE_NUMBER, mobileNumberData, { headers: reqHeader });
  }

  updateCategories(categoryData) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.UPDATE_CATEGORIES, categoryData, { headers: reqHeader });

  }

  updateProductMeasurementUnit(productMeasurementUnit) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.UPDATE_PRICE_DECISION_FACTOR, productMeasurementUnit, { headers: reqHeader });
  }

  getOrderList(userId) {
    let data = { userId: userId };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.GET_ORDER_LIST, data, { headers: reqHeader });
  }


  getSalesEnquiry(userId) {
    let data = { userId: userId };
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_SALES_ENQUIRY_DATA, data, { headers: reqHeader });
  }

  getBussinessSnapshot(userId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.GET_BUSSINESS_SNAPSHOT_DETAILS + '?' + 'userId=' + userId.toString(), { headers: headers });
  }

  getSellerUsers(role) {
    let data = { role: role };
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.GET_ALL_SELLER_USERS, data, { headers: headers });
  }

  updateOrders(order) {
    let headers = new HttpHeaders();
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.INSERT_UPDATE_ORDER, order, { headers: reqHeader });
  }

  uploadDocuments(document) {
    let headers = new HttpHeaders();
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(this.INSERT_DOCUMENT, document, { headers: reqHeader });
  }


  getDocumentsById(id) {
    return this.http.get(this.GET_DOCUMENT_BY_ID + '/' + id);
  }


  insertUpdateSalesEnquiry(enquiry) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.INSERT_UPDATE_SALES_ENQUIRY, enquiry, { headers: headers });
  }

  getUnmappedProductData(req) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.GET_UNMAPPED_PRODUCT_DATA, req, { headers: headers });
  }

  saveUnmappedProducts(products) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.SAVE_UNMAPPED_PRODUCTS, products, { headers: reqHeader });
  }

  getMappedProducts(req) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.GET_MAPPED_PRODUCT_DATA, req, { headers: headers });
  }


  insertParentChildMapping(req) {
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.PARENT_CHILD_MAPPING, req, { headers: reqHeader });
  }

  downloadProductCsv(sellerId, type) {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'text/csv');
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.DOWNLOAD_BULK_PRODUCT_SELLING_DATA + '?SellerID=' + sellerId + '|' + type, { headers: reqHeader });
  }

  uploadBulkProductsCsv(file) {
    let headers = new HttpHeaders();
    let reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.UPLOAD_BULK_PRODUCT_CSV, file, { headers: reqHeader });
  }


  downloadOrderSalesReport(order) {

    return this.http.get(this.DOWNLOAD_ORDER_SALES_REPORT + '?Data=' + order.sellerName + '||' + order.reportType + '||' + order.startDate + '||' + order.endDate);
  }



}

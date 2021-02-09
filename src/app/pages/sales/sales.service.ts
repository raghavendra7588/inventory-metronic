import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  BASE_URL = 'http://203.112.144.38/AdminApi/UploadedFiles/';

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

  constructor(
    private http: HttpClient
  ) {
    this.token = sessionStorage.getItem('token');
  }

  getAllAdminUsers(role) {
    const data = { 'role': role };
    var reqHeader = new HttpHeaders({
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

  getAllCustomerUsers(role) {
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

  getParentChildMappingBrand(id) {
    const data = { userid: id.toString() + '-' + 'child' };
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
    let categoryData = Category;
    // return this.http.post(this.INSERT_UPDATE_CATEGORY, { Category: categoryData });
    return this.http.post(this.INSERT_UPDATE_CATEGORY, categoryData);
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
}

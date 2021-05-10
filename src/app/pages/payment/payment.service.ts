import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  pUrl: string = '';
  token: string;

  private GET_PAYMENT_MODE = environment.BASE_URL + 'api/PaymentController/getPaymentMode';
  private UPDATE_PAYMENT_MODE = environment.BASE_URL + 'api/PaymentController/UpdatePaymentMode';
  private GET_TRANSACTION_HISTORY_BY_SELLER = environment.BASE_URL + 'api/PaymentController/TransactionHistoryBySeller';
  // private GET_SELLER_SUBSCRIPTIONDETAILS = environment.BASE_URL + 'api/PaymentController/UpdatePaymentMode';
  private GET_SELLER_SUBSCRIPTIONDETAILS = environment.BASE_URL + 'api/Payment';
  private UPDATE_ACTIVE_STATUS = environment.BASE_URL + 'api/PaymentController/UpdateActiveStatus';
  private GET_LATEST_TRANSACTION_STATUS_BY_SELLER = environment.BASE_URL + 'api/PaymentController/GetLatestTransactionBySellerID';
  private UPDATE_PAYMENT_DETAILS = environment.BASE_URL + 'api/PaymentController/UpdatePaymentDetails';

  private GET_SELLER_PROFILE_DETAILS = environment.APP_BASE_URL + 'AppUser/GetProfileDetails';
  private POST_SELLER_ACTIVE_INACTIVE_STATUS = environment.APP_BASE_URL + 'AppUser/SellerUpdate';
  private GET_SELLER_CONTACT_CREDENTIALS = environment.BASE_URL + 'api/Vendor/SellerContactCredentials';
  private POST_SELLER_STATUS_CHECKPOINT = environment.BASE_URL + 'api/PaymentController/UpdateSellerStatusCheckPoint';
  private POST_PREVIOUS_TRANSACTIONS = environment.BASE_URL + 'api/PaymentController/UpdatePreviousTransactions';


  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
  }

  getPaymentMode() {
    return this.http.get(this.GET_PAYMENT_MODE);
  }

  getsellerSubscriptionDetails(sellerData) {
    return this.http.post(this.GET_SELLER_SUBSCRIPTIONDETAILS, sellerData);
  }


  updatePaymentMode(paymentMode) {
    return this.http.post(this.UPDATE_PAYMENT_MODE, paymentMode);
  }

  getTransactionHistory(sellerId: number) {
    return this.http.get(this.GET_TRANSACTION_HISTORY_BY_SELLER + '/' + sellerId);
  }


  updateActiveStatus(sellerData) {
    return this.http.post(this.UPDATE_ACTIVE_STATUS, sellerData);
  }

  getLatestTransactionBySeller(sellerId: number) {
    return this.http.get(this.GET_LATEST_TRANSACTION_STATUS_BY_SELLER + '/' + sellerId);
  }

  updatePaymentData(paymentData) {
    return this.http.post(this.UPDATE_PAYMENT_DETAILS, paymentData);
  }

  updatePreviousTransactionsData(paymentData) {
    return this.http.post(this.POST_PREVIOUS_TRANSACTIONS, paymentData);
  }

  getSellerProfileData(sellerData) {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let req = { "LanguageCode": "en", "id": "6" };
    return this.http.post(this.GET_SELLER_PROFILE_DETAILS, req, { headers: headers });
  }

  postSellerActiveInActiveStatusData(sellerData) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.POST_SELLER_ACTIVE_INACTIVE_STATUS, sellerData, { headers: reqHeader });
  }


  getSellerCredentials(sellerId) {
    return this.http.get(this.GET_SELLER_CONTACT_CREDENTIALS + '/' + Number(sellerId));
  }


  updateSellerStatusCheckpoint(PaymentId) {
    let req = { PaymentId: PaymentId }
    return this.http.post(this.POST_SELLER_STATUS_CHECKPOINT, req);
  }

}

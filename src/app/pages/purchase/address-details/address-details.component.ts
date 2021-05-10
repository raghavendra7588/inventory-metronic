import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { EditUpdateAdmin } from '../../sales/sales.model.';
import { SalesService } from '../../sales/sales.service';
import { AddAddressComponent } from '../add-address/add-address.component';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, OnDestroy {

  getAddress: any = [];
  addressData: any = [];
  displayedColumns: string[] = ['address', 'action'];
  dataSource: any;
  sellerId: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  particularSellerResponse: any = [];
  firstAddressResponse: any = [];
  editUpdateAdmin: EditUpdateAdmin = new EditUpdateAdmin();
  adminUsers: any = [];
  strSellerId: string;
  role: string;
  newCity: string;
  isAddressUpdated: boolean = false;
  isAddressCreatedSubscription: Subscription;
  isSubscriptionValid: string;
  private unsubscribe: Subscription[] = [];

  constructor(
    public purchaseService: PurchaseService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public loginService: LoginService,
    private spinner: NgxSpinnerService,
    private salesService: SalesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.role = sessionStorage.getItem('role');

    this.getAddressDetails();
    this.getSellerUser();
    this.isAddressCreatedSubscription = this.emitterService.isAddressCreated.subscribe(value => {
      if (value) {
        this.firstAddressResponse = [];
        this.isAddressUpdated = value;
        this.getAddressDetails();
        this.getSellerUser();
        this.fetchFirstAddressData();
      }
    });
    this.unsubscribe.push(this.isAddressCreatedSubscription);
    const isPaymentOrStatusChange = this.emitterService.isPaymentOrStatusChange.subscribe(val => {
   
      if (val) {

        this.isSubscriptionValid = '';
        this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
        this.isSubscriptionValid = 'INACTIVE';
        
        this.cdr.detectChanges();
      }
      this.unsubscribe.push(isPaymentOrStatusChange);
    });

    const isPaymentOrStatusActivated = this.emitterService.isPaymentOrStatusActivated.subscribe(val => {
      if (val) {
       
        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = '';
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
          this.isSubscriptionValid = 'ACTIVE';
         
          this.cdr.detectChanges();
        }
      }
      this.unsubscribe.push(isPaymentOrStatusActivated);
    });
   
  }



  getAddressDetails() {
    this.spinner.show();
    const AddressData = this.purchaseService.getAddressData().subscribe(data => {
      this.getAddress = data;
      this.purchaseService.addressData = data;
      this.fetchFirstAddressData();
      this.dataSource = new MatTableDataSource(this.getAddress);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

    this.unsubscribe.push(AddressData);
  }


  openDialog() {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px'
    });
  }

  editEmployee(element) {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px',
      data: element
    });
  }


  fetchFirstAddressData() {

    for (let i = 0; i < this.getAddress.length; i++) {
      this.firstAddressResponse = this.getAddress[0];
      this.newCity = this.firstAddressResponse.billing_city;
    }

    if (this.isAddressUpdated) {
      this.updateSellerCity();
    }
  }

  fetchCurrentSeller() {
    this.adminUsers.filter(ele => {
      if (Number(ele.id) == Number(this.sellerId)) {
        this.particularSellerResponse = ele;
      }

    });
  }

  getSellerUser() {
    let role = 'Seller';
    this.spinner.show();

    if (this.role == 'Admin') {
      const AllSellerUsers = this.salesService.getAllSellerUsers(role).subscribe(res => {

        this.adminUsers = res;
        this.salesService.sellerData = this.adminUsers;
        this.fetchCurrentSeller();
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
      this.unsubscribe.push(AllSellerUsers);
    }

    if (this.role == 'partner' || this.role == 'sales' || this.role == 'Seller') {
      const AllSellerUser = this.salesService.getSellerUsersData(role, this.strSellerId).subscribe(res => {

        this.adminUsers = res;
        this.salesService.sellerData = this.adminUsers;
        this.fetchCurrentSeller();
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
      this.unsubscribe.push(AllSellerUser);
    }


  }

  updateSellerCity() {

    if (this.particularSellerResponse && this.firstAddressResponse) {

      this.editUpdateAdmin.IsActive = '1';
      this.editUpdateAdmin.userid = this.strSellerId;

      this.editUpdateAdmin.address = this.particularSellerResponse.address;
      this.editUpdateAdmin.city = this.firstAddressResponse.billing_city;

      sessionStorage.removeItem('city');
      sessionStorage.setItem('city', this.firstAddressResponse.billing_city);

      this.editUpdateAdmin.emailid = this.particularSellerResponse.emailid;
      this.editUpdateAdmin.id = this.particularSellerResponse.id;
      this.editUpdateAdmin.mobilenumber = this.particularSellerResponse.mobilenumber;
      this.editUpdateAdmin.name = this.particularSellerResponse.name;
      this.editUpdateAdmin.password = this.particularSellerResponse.password;
      this.editUpdateAdmin.pincode = this.particularSellerResponse.pincode;
      this.editUpdateAdmin.role = this.particularSellerResponse.role;
      this.editUpdateAdmin.state = this.particularSellerResponse.state;


      this.salesService.editAdminUser(this.editUpdateAdmin).subscribe(res => {
        this.emitterService.isLoggedIn.emit(true);
      }, err => {
        this.spinner.hide();
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

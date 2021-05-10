import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrModule } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSelectFilterModule } from 'mat-select-filter';
import { InlineSVGModule } from 'ng-inline-svg';

import { AddAddressComponent } from './add-address/add-address.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { DialogContentVendorComponent } from './dialog-content-vendor/dialog-content-vendor.component';
import { DialogOrderPrintComponent } from './dialog-order-print/dialog-order-print.component';
import { DialogPurchaseOrderPrintComponent } from './dialog-purchase-order-print/dialog-purchase-order-print.component';
import { DialogViewVendorDataComponent } from './dialog-view-vendor-data/dialog-view-vendor-data.component';
import { GetPriceListComponent } from './get-price-list/get-price-list.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { SpecificPriceListComponent } from './specific-price-list/specific-price-list.component';
import { VendorComponent } from './vendor/vendor.component';
import { NumberDirective } from './number.directive';


@NgModule({
  declarations: [
    AddAddressComponent,
    VendorComponent,
    DialogViewVendorDataComponent,
    PriceListComponent,
    SpecificPriceListComponent,
    PurchaseOrderComponent,
    GetPriceListComponent,
    DialogContentVendorComponent,
    AddressDetailsComponent,
    NumberDirective,
    DialogPurchaseOrderPrintComponent,
    DialogOrderPrintComponent,
    AddAddressComponent,
    AddressDetailsComponent,
    DialogContentVendorComponent,
    DialogOrderPrintComponent,
    DialogPurchaseOrderPrintComponent,
    DialogViewVendorDataComponent,
    GetPriceListComponent,
    PriceListComponent,
    PurchaseOrderComponent,
    SpecificPriceListComponent,
    VendorComponent,
    NumberDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintModule,
    MatSelectFilterModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    InlineSVGModule,
    InlineSVGModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'addAddress',
        component: AddressDetailsComponent,
      },
      {
        path: 'vendor',
        component: VendorComponent,
      },
      {
        path: 'priceList',
         component: PriceListComponent
      },
      {
        path: 'specificPriceList', 
        component: SpecificPriceListComponent
      },
      {
        path: 'purchaseOrder',
         component: PurchaseOrderComponent
      }
    ]),
  ],
  entryComponents: [
    DialogViewVendorDataComponent,
    DialogContentVendorComponent,
    DialogPurchaseOrderPrintComponent,
    DialogOrderPrintComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AddAddressComponent,
    AddressDetailsComponent,
    VendorComponent,
    DialogViewVendorDataComponent,
    PriceListComponent,
    SpecificPriceListComponent,
    PurchaseOrderComponent,
    DialogPurchaseOrderPrintComponent,
    DialogOrderPrintComponent,
    NumberDirective
  ]
})
export class PurchaseModule { }

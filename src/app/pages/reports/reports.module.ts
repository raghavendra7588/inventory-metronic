import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
// import { ToastrModule } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ProductVendorWisePurchaseReportComponent } from './product-vendor-wise-purchase-report/product-vendor-wise-purchase-report.component';
import { DialogProductVendorWisePurchaseReportComponent } from './dialog-product-vendor-wise-purchase-report/dialog-product-vendor-wise-purchase-report.component';
import { RouterModule } from '@angular/router';
import { VendorOrderWisePurchaseReportComponent } from './vendor-order-wise-purchase-report/vendor-order-wise-purchase-report.component';
import { DialogVendorOrderWisePurchaseReportComponent } from './dialog-vendor-order-wise-purchase-report/dialog-vendor-order-wise-purchase-report.component';
import { ProductWisePurchaseReportComponent } from './product-wise-purchase-report/product-wise-purchase-report.component';
import { DialogProductWisePurchaseReportComponent } from './dialog-product-wise-purchase-report/dialog-product-wise-purchase-report.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { InlineSVGModule } from 'ng-inline-svg';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ProductVendorWisePurchaseReportComponent,
    DialogProductVendorWisePurchaseReportComponent,
    VendorOrderWisePurchaseReportComponent,
    DialogVendorOrderWisePurchaseReportComponent,
    ProductWisePurchaseReportComponent,
    DialogProductWisePurchaseReportComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatBadgeModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgxPrintModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectFilterModule,
    ToastrModule.forRoot(),
    InlineSVGModule.forRoot(),
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: 'vendorOrderWisePurchaseReport',
        component: VendorOrderWisePurchaseReportComponent,
      },
      {
        path: 'productWisePurchaseReport',
        component: ProductWisePurchaseReportComponent,
      },
      {
        path: 'productVendorWisePurchaseReport',
        component: ProductVendorWisePurchaseReportComponent,
      }
    ])
  ],
  entryComponents: [
    DialogProductVendorWisePurchaseReportComponent,
    DialogVendorOrderWisePurchaseReportComponent,
    DialogProductWisePurchaseReportComponent
  ],
  exports: [
    ProductVendorWisePurchaseReportComponent,
    DialogProductVendorWisePurchaseReportComponent,
    VendorOrderWisePurchaseReportComponent,
    DialogVendorOrderWisePurchaseReportComponent,
    ProductWisePurchaseReportComponent,
    DialogProductWisePurchaseReportComponent]
})
export class ReportsModule { }

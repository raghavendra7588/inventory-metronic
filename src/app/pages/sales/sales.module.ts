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
import { FileSaverModule } from 'ngx-filesaver';

import { AdminUserComponent } from './admin-user/admin-user.component';
import { SellerUserComponent } from './seller-user/seller-user.component';
import { CustomerUserComponent } from './customer-user/customer-user.component';
import { SalesUserComponent } from './sales-user/sales-user.component';
import { BackOfficeUserComponent } from './back-office-user/back-office-user.component';
import { MisUserComponent } from './mis-user/mis-user.component';
import { PartnerUserComponent } from './partner-user/partner-user.component';

import { SalesService } from './sales.service';
import { DialogUpdateMobileNumberComponent } from './dialog-update-mobile-number/dialog-update-mobile-number.component';
import { NumberDirective } from './number.directive';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogCategoriesMappingComponent } from './dialog-categories-mapping/dialog-categories-mapping.component';
import { DialogSellerMappingComponent } from './dialog-seller-mapping/dialog-seller-mapping.component';
import { DialogCategoryComponent } from './dialog-category/dialog-category.component';
import { DialogSubCategoryComponent } from './dialog-sub-category/dialog-sub-category.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { DialogBrandComponent } from './dialog-brand/dialog-brand.component';
import { BulkProductSellerMappingComponent } from './bulk-product-seller-mapping/bulk-product-seller-mapping.component';
import { ProductMeasurementUnitComponent } from './product-measurement-unit/product-measurement-unit.component';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { MappedProductsComponent } from './mapped-products/mapped-products.component';
import { UnMappedProductsComponent } from './un-mapped-products/un-mapped-products.component';
import { UpdateOutOfStockComponent } from './update-out-of-stock/update-out-of-stock.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderSalesReportComponent } from './order-sales-report/order-sales-report.component';
import { BussinessSnapshotComponent } from './bussiness-snapshot/bussiness-snapshot.component';
import { DocumentComponent } from './document/document.component';
import { SalesEnquiryComponent } from './sales-enquiry/sales-enquiry.component';
import { DialogProductDataComponent } from './dialog-product-data/dialog-product-data.component';
import { DialogOrderManagementComponent } from './dialog-order-management/dialog-order-management.component';
import { DialogOrderManagementPrintComponent } from './dialog-order-management-print/dialog-order-management-print.component';
import { DialogSalesEnquiryComponent } from './dialog-sales-enquiry/dialog-sales-enquiry.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { DialogViewUserComponent } from './dialog-view-user/dialog-view-user.component';
import { FormatImgUrlPipe } from './format-img-url.pipe';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AdminUserComponent,
    SellerUserComponent,
    CustomerUserComponent,
    SalesUserComponent,
    BackOfficeUserComponent,
    MisUserComponent,
    PartnerUserComponent,
    NumberDirective,
    DialogUpdateMobileNumberComponent,
    DialogEditUserComponent,
    DialogCategoriesMappingComponent,
    DialogSellerMappingComponent,
    DialogCategoryComponent,
    DialogSubCategoryComponent,
    CategoryComponent,
    SubCategoryComponent,
    DialogProductComponent,
    DialogBrandComponent,
    BulkProductSellerMappingComponent,
    ProductMeasurementUnitComponent,
    BrandComponent,
    ProductComponent,
    MappedProductsComponent,
    UnMappedProductsComponent,
    UpdateOutOfStockComponent,
    OrderManagementComponent,
    OrderSalesReportComponent,
    BussinessSnapshotComponent,
    DocumentComponent,
    SalesEnquiryComponent,
    DialogProductDataComponent,
    DialogOrderManagementComponent,
    DialogOrderManagementPrintComponent,
    DialogSalesEnquiryComponent,
    DialogSalesEnquiryComponent,
    SendNotificationComponent,
    DialogViewUserComponent,
    FormatImgUrlPipe
  ],
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
    ModalModule.forRoot(),
    InlineSVGModule.forRoot(),
    FileSaverModule,
    RouterModule.forChild([
      {
        path: 'user/admin',
        component: AdminUserComponent
      },
      {
        path: 'user/seller',
        component: SellerUserComponent
      },
      {
        path: 'user/customer',
        component: CustomerUserComponent
      },
      {
        path: 'user/sales',
        component: SalesUserComponent
      },
      {
        path: 'user/backOffice',
        component: BackOfficeUserComponent
      },
      {
        path: 'user/mis',
        component: MisUserComponent
      },
      {
        path: 'user/partner',
        component: PartnerUserComponent
      },
      {
        path: 'masterManagement/category',
        component: CategoryComponent
      },
      {
        path: 'masterManagement/subCategory',
        component: SubCategoryComponent
      },

      {
        path: 'masterManagement/productMeasurementUnit',
        component: ProductMeasurementUnitComponent
      },
      {
        path: 'masterManagement/brand',
        component: BrandComponent
      },
      {
        path: 'masterManagement/product',
        component: ProductComponent
      },


      {
        path: 'productManagement/bulkProductSellerMapping',
        component: BulkProductSellerMappingComponent
      },
      {
        path: 'productManagement/mappedProduct',
        component: MappedProductsComponent
      },
      {
        path: 'productManagement/unMappedProduct',
        component: UnMappedProductsComponent
      },
      {
        path: 'productManagement/updateOutOfStock',
        component: UpdateOutOfStockComponent
      },


      {
        path: 'orderManagement/orders',
        component: OrderManagementComponent
      },
      {
        path: 'reports/orderSalesReport',
        component: OrderSalesReportComponent
      },


      {
        path: 'reports/bussinessSnapshot',
        component: BussinessSnapshotComponent
      },

      {
        path: 'enquiry/salesEnquiry',
        component: SalesEnquiryComponent
      },


      {
        path: 'documents',
        component: DocumentComponent
      },
      {
        path: 'sendNotification',
        component: SendNotificationComponent
      },

    ]),
  ],
  exports: [
    AdminUserComponent,
    SellerUserComponent,
    CustomerUserComponent,
    SalesUserComponent,
    BackOfficeUserComponent,
    MisUserComponent,
    PartnerUserComponent,
    NumberDirective,
    DialogUpdateMobileNumberComponent,
    DialogEditUserComponent,
    DialogCategoriesMappingComponent,
    DialogSellerMappingComponent,
    DialogCategoryComponent,
    DialogSubCategoryComponent,
    CategoryComponent,
    SubCategoryComponent,
    DialogProductComponent,
    DialogBrandComponent,
    BulkProductSellerMappingComponent,
    ProductMeasurementUnitComponent,
    BrandComponent,
    ProductComponent,
    MappedProductsComponent,
    UnMappedProductsComponent,
    UpdateOutOfStockComponent,
    OrderManagementComponent,
    OrderSalesReportComponent,
    BussinessSnapshotComponent,
    DocumentComponent,
    SalesEnquiryComponent,
    DialogProductDataComponent,
    DialogOrderManagementComponent,
    DialogOrderManagementPrintComponent,
    DialogSalesEnquiryComponent,
    DialogSalesEnquiryComponent,
    SendNotificationComponent,
    DialogViewUserComponent,
    FormatImgUrlPipe
  ],
  providers: [
    SalesService
  ],
  entryComponents: [
    DialogUpdateMobileNumberComponent,
    DialogCategoriesMappingComponent,
    DialogEditUserComponent,
    DialogSellerMappingComponent,
    DialogCategoryComponent,
    DialogSubCategoryComponent,
    DialogProductComponent,
    DialogBrandComponent,
    DialogProductDataComponent,
    DialogOrderManagementComponent,
    DialogOrderManagementPrintComponent,
    DialogSalesEnquiryComponent,
    DialogViewUserComponent
  ],
})
export class SalesModule { }

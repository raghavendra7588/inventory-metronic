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
import { ModalModule } from 'ngx-bootstrap/modal';

import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentService } from './payment.service';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { DialogSubscriptionHistoryComponent } from './dialog-subscription-history/dialog-subscription-history.component';
import { DialogSellerActiveInactiveComponent } from './dialog-seller-active-inactive/dialog-seller-active-inactive.component';
import { PaidOrdersPageComponent } from './paid-orders-page/paid-orders-page.component';
import { HighlightCardDirective } from './highlight-card.directive';
import { SharedService } from 'src/app/shared/shared.service';




@NgModule({
  declarations: [
    PaymentSuccessComponent,
    PaymentFailureComponent,
    SubscriptionPlanComponent,
    DialogSubscriptionHistoryComponent,
    DialogSellerActiveInactiveComponent,
    PaidOrdersPageComponent,
    HighlightCardDirective
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
    ModalModule.forRoot(),
    InlineSVGModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'subscription',
        component: SubscriptionPlanComponent,
      },
      {
        path: 'orderStats',
        component: PaidOrdersPageComponent,
      }
    ]),
  ],
  exports: [
    PaymentSuccessComponent,
    PaymentFailureComponent,
    SubscriptionPlanComponent,
    DialogSubscriptionHistoryComponent,
    DialogSellerActiveInactiveComponent,
    PaidOrdersPageComponent
  ],
  providers: [PaymentService, SharedService],
  entryComponents: [
    DialogSubscriptionHistoryComponent,
    DialogSellerActiveInactiveComponent]
})
export class PaymentModule { }

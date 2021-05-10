import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-quick-actions-offcanvas',
  templateUrl: './quick-actions-offcanvas.component.html',
  styleUrls: ['./quick-actions-offcanvas.component.scss'],
})
export class QuickActionsOffcanvasComponent implements OnInit, OnDestroy {

  extrasQuickActionsOffcanvasDirectionCSSClasses = 'offcanvas-right';
  currentlySelectedTab: string;
  isSubscriptionValid: string;
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    public emitterService: EmitterService,
    private cdr: ChangeDetectorRef,
    public paymentService: PaymentService
  ) {
    this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
    const currentlySelectedTab = this.emitterService.currentlySelectedTab.subscribe(val => {
      if (val) {
        this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
        }
      }
      this.unsubscribe.push(currentlySelectedTab);
    });

    const isPaymentOrStatusChange = this.emitterService.isPaymentOrStatusChange.subscribe(val => {
      
      if (val) {
        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = '';
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
          this.isSubscriptionValid = 'INACTIVE';
         
          this.cdr.detectChanges();
        }
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

  ngOnInit(): void {
    this.extrasQuickActionsOffcanvasDirectionCSSClasses = `offcanvas-${this.layout.getProp(
      'extras.quickActions.offcanvas.direction'
    )}`;
    if ("isSubscriptionValid" in sessionStorage) {
      this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    }
  }


  onTabChange(currentTab: string) {

    this.currentlySelectedTab = currentTab;

    sessionStorage.removeItem('currentlySelectedTab');
    sessionStorage.setItem('currentlySelectedTab', this.currentlySelectedTab);
    this.emitterService.currentlySelectedTab.emit(true);
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

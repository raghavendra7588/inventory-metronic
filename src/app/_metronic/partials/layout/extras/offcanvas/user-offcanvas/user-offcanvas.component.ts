import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PaymentService } from 'src/app/pages/payment/payment.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit, OnDestroy {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<UserModel>;
  sellerName: string;
  vendorCode: string;
  role: string;
  city: string;
  isSubscriptionValid: string;
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private auth: AuthService,
    private emitterService: EmitterService,
    private cdr: ChangeDetectorRef,
    public paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserSubject.asObservable();

    this.sellerName = sessionStorage.getItem('sellerName');
    this.vendorCode = sessionStorage.getItem('vendorId');
    this.role = sessionStorage.getItem('role');
    this.city = sessionStorage.getItem('city');
    if ("isSubscriptionValid" in sessionStorage) {
      this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    }
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

  logout() {
    this.auth.logout();
    document.location.reload();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

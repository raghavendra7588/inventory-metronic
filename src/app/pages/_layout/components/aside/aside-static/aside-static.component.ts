import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { LayoutService } from '../../../../../_metronic/core';

@Component({
  selector: 'app-aside-static',
  templateUrl: './aside-static.component.html',
  styleUrls: ['./aside-static.component.scss'],
})
export class AsideStaticComponent implements OnInit, OnDestroy {
  disableAsideSelfDisplay: boolean;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  role: string;
  isInventory: boolean;
  currentlySelectedTab: string;
  isSubscriptionValid: string;
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private loc: Location,
    private emitterService: EmitterService,
    private cdr: ChangeDetectorRef,
    public paymentService: PaymentService
  ) {
    this.isInventory = true;
    this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
    const currentlySelectedTab = this.emitterService.currentlySelectedTab.subscribe(val => {
      if (val) {
        this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
        }
      }

    });
    this.unsubscribe.push(currentlySelectedTab);
    const isPaymentOrStatusChange = this.emitterService.isPaymentOrStatusChange.subscribe(val => {

      if (val) {
        this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
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
        this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
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
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    // Routing
    this.location = this.loc;


    const isLoggedIn = this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        if ("role" in sessionStorage) {
          this.role = sessionStorage.getItem("role");
        }
        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
        }
      }
      this.unsubscribe.push(isLoggedIn);
    });

    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem("role");

    }
    if ("isSubscriptionValid" in sessionStorage) {
      this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    }
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../../../_metronic/core';
import { KTUtil } from '../../../../../assets/js/components/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EmitterService } from 'src/app/shared/emitter.service';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit, OnDestroy {
  TABS: string[] = [
    'kt_aside_tab_0',
    'kt_aside_tab_1',
    'kt_aside_tab_2',
    'kt_aside_tab_3',
    'kt_aside_tab_4',
    'kt_aside_tab_5',
    'kt_aside_tab_6'];
  activeTabId;
  disableAsideSelfDisplay: boolean;
  asideMenuStatic: true;
  disableAsideSecondaryDisplay: boolean;
  ulCSSClasses: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  role: string;
  currentlySelectedTab: string;
  isSubscriptionValid: string;
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private emitterService: EmitterService,
    public paymentService: PaymentService
  ) {

    const isLoggedInSuccessful = this.emitterService.isLoggedInSuccessful.subscribe(val => {
      this.currentlySelectedTab = 'Inventory';
      if (val) {
        if ("role" in sessionStorage) {
          this.role = sessionStorage.getItem("role");
        }
        if ("isSubscriptionValid" in sessionStorage) {
          this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
        }
      }
      this.unsubscribe.push(isLoggedInSuccessful);
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


    this.activeTabId = this.TABS[2];
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.asideMenuStatic = this.layout.getProp('aside.menu.static');
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
    this.disableAsideSecondaryDisplay = this.layout.getProp('aside.secondary.display');
    if ("isSubscriptionValid" in sessionStorage) {
      this.isSubscriptionValid = sessionStorage.getItem("isSubscriptionValid");
    }
  }

  setTab(id) {
    this.activeTabId = id;
    const asideWorkspace = KTUtil.find(
      document.getElementById('kt_aside'),
      '.aside-secondary .aside-workspace'
    );
    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }
    this.cdr.detectChanges();
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

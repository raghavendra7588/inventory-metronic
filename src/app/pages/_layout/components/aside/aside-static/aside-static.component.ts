import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/emitter.service';
import { LayoutService } from '../../../../../_metronic/core';

@Component({
  selector: 'app-aside-static',
  templateUrl: './aside-static.component.html',
  styleUrls: ['./aside-static.component.scss'],
})
export class AsideStaticComponent implements OnInit {
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

  constructor(
    private layout: LayoutService,
    private loc: Location,
    private emitterService: EmitterService) {
    this.isInventory = true;
    this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
    this.emitterService.currentlySelectedTab.subscribe(val => {
      if (val) {
        this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
      }
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


    this.emitterService.isLoggedIn.subscribe(val => {


      if (val) {
       

        if ("role" in sessionStorage) {
          this.role = sessionStorage.getItem("role");

        }

      }
    });

    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem("role");
   
    }
  }
}

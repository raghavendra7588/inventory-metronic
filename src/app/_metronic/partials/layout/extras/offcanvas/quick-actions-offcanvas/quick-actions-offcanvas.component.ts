import { Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/emitter.service';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-quick-actions-offcanvas',
  templateUrl: './quick-actions-offcanvas.component.html',
  styleUrls: ['./quick-actions-offcanvas.component.scss'],
})
export class QuickActionsOffcanvasComponent implements OnInit {

  extrasQuickActionsOffcanvasDirectionCSSClasses = 'offcanvas-right';
  currentlySelectedTab: string;

  constructor(
    private layout: LayoutService,
    public emitterService: EmitterService) {
    this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
    this.emitterService.currentlySelectedTab.subscribe(val => {
      if (val) {
        this.currentlySelectedTab = sessionStorage.getItem('currentlySelectedTab');
      }
    });
  }

  ngOnInit(): void {
    this.extrasQuickActionsOffcanvasDirectionCSSClasses = `offcanvas-${this.layout.getProp(
      'extras.quickActions.offcanvas.direction'
    )}`;
  }


  onTabChange(currentTab: string) {

    this.currentlySelectedTab = currentTab;

    sessionStorage.removeItem('currentlySelectedTab');
    sessionStorage.setItem('currentlySelectedTab', this.currentlySelectedTab);
    this.emitterService.currentlySelectedTab.emit(true);
  }
}

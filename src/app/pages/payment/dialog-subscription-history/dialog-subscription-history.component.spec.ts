import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubscriptionHistoryComponent } from './dialog-subscription-history.component';

describe('DialogSubscriptionHistoryComponent', () => {
  let component: DialogSubscriptionHistoryComponent;
  let fixture: ComponentFixture<DialogSubscriptionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSubscriptionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSubscriptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserComponent } from './partner-user.component';

describe('PartnerUserComponent', () => {
  let component: PartnerUserComponent;
  let fixture: ComponentFixture<PartnerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

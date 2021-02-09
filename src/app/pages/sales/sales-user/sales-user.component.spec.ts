import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUserComponent } from './sales-user.component';

describe('SalesUserComponent', () => {
  let component: SalesUserComponent;
  let fixture: ComponentFixture<SalesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

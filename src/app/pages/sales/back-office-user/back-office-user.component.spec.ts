import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserComponent } from './back-office-user.component';

describe('BackOfficeUserComponent', () => {
  let component: BackOfficeUserComponent;
  let fixture: ComponentFixture<BackOfficeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

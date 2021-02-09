import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisUserComponent } from './mis-user.component';

describe('MisUserComponent', () => {
  let component: MisUserComponent;
  let fixture: ComponentFixture<MisUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

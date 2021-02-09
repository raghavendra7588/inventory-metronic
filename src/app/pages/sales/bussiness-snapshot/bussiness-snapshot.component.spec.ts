import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessSnapshotComponent } from './bussiness-snapshot.component';

describe('BussinessSnapshotComponent', () => {
  let component: BussinessSnapshotComponent;
  let fixture: ComponentFixture<BussinessSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BussinessSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

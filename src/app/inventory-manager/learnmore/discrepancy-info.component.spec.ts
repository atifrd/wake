import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepancyInfoComponent } from './discrepancy-info.component';

describe('DiscrepancyInfoComponent', () => {
  let component: DiscrepancyInfoComponent;
  let fixture: ComponentFixture<DiscrepancyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscrepancyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepancyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

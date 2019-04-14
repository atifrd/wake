import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCapacityComponent } from './help-capacity.component';

describe('HelpCapacityComponent', () => {
  let component: HelpCapacityComponent;
  let fixture: ComponentFixture<HelpCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

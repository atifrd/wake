import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpWetDensityComponent } from './help-wet-density.component';

describe('HelpWetDensityComponent', () => {
  let component: HelpWetDensityComponent;
  let fixture: ComponentFixture<HelpWetDensityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpWetDensityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpWetDensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

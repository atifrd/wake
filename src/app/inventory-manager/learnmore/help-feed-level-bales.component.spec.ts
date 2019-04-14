import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFeedLevelBalesComponent } from './help-feed-level-bales.component';

describe('HelpFeedLevelBalesComponent', () => {
  let component: HelpFeedLevelBalesComponent;
  let fixture: ComponentFixture<HelpFeedLevelBalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpFeedLevelBalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFeedLevelBalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

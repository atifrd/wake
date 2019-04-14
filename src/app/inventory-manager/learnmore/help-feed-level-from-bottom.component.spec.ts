import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFeedLevelFromBottomComponent } from './help-feed-level-from-bottom.component';

describe('HelpFeedLevelFromBottomComponent', () => {
  let component: HelpFeedLevelFromBottomComponent;
  let fixture: ComponentFixture<HelpFeedLevelFromBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpFeedLevelFromBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFeedLevelFromBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

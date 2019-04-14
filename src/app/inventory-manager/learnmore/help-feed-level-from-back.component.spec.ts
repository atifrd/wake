import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFeedLevelFromBackComponent } from './help-feed-level-from-back.component';

describe('HelpFeedLevelFromBackComponent', () => {
  let component: HelpFeedLevelFromBackComponent;
  let fixture: ComponentFixture<HelpFeedLevelFromBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpFeedLevelFromBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFeedLevelFromBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

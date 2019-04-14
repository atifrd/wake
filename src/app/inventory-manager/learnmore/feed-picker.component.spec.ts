import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPickerComponent } from './feed-picker.component';

describe('FeedPickerComponent', () => {
  let component: FeedPickerComponent;
  let fixture: ComponentFixture<FeedPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MonthService } from './month.service';

describe('MonthService', () => {
    let service: MonthService;

  beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.get(MonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a month list', () => {
    expect(service.months).toBeTruthy();
    expect(service.months.length === 12);
  });

  it('should return a month name for index', () => {
    let monthName = "April";
    let expectedMonthNumber = 3;
    expect(service.indexForName(monthName)).toBe(expectedMonthNumber);
  });

  it('should return a month name for index', () => {
    let monthName = "April";
    let expectedMonthNumber = 3;
    expect(service.nameForIndex(expectedMonthNumber)).toBe(monthName);
  });

  it('should return a month display for a month year string', () => {
    let monthYear = "April 2019";
    let expectedMonth = 3;
    let expectedYear = 2019;
    let expectedText = "April 2019";
    expect(service.dateForMonth(monthYear)).toBeTruthy();
    expect(service.dateForMonth(monthYear).month).toBe(expectedMonth);
    expect(service.dateForMonth(monthYear).year).toBe(expectedYear);
    expect(service.dateForMonth(monthYear).text).toBe(expectedText);
  });

});

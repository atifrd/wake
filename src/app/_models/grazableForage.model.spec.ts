import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Diet, GrazableForage, Consumption, ConsumptionCalculation, FeedAmount, FeedConsumed, FeedClassification, Nutrition, Cost, FeedCalculation, DietRequirements, ProteinRequirement, DietCost, DietNutrition, ForageConcentrateRatio } from './diet.models';
import { Component, Pipe, PipeTransform, Directive } from '@angular/core';

describe('GrazableForage without params', () => {
  let component: GrazableForage;

  beforeEach(async(() => {
    component = new GrazableForage();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have zero growth rate', () => {
    expect(component.growthRate).toEqual(0);
  });

  it('should have zero hectare', () => {
    expect(component.hectare).toEqual(0);
  });

  it('should have zero utilisation', () => {
    expect(component.utilisation).toEqual(0);
  });

  it('should have zero available', () => {
    expect(component.available).toEqual(0);
  });

  it('should not have custom rate', () => {
    expect(component.customRate).toEqual(false);
  });

  it('should have zero surplus/deficit', () => {
    expect(component.surplusDeficit).toEqual(0);
  });

  it('should not be valid', () => {
    expect(component.isValid).toEqual(false);
  });
});

describe('GrazableForage with typed payload', () => {
  let component: GrazableForage;
  let payload: GrazableForage;

  beforeEach(async(() => {
    payload = new GrazableForage();
    payload.growthRate = 12;
    payload.hectare = 60;
    payload.utilisation = 50;
    payload.available = 100;
    component = new GrazableForage(payload);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a growth rate passed in constructor', () => {
    expect(component.growthRate).toEqual(payload.growthRate);
  });

  it('should have a hectare passed in constructor', () => {
    expect(component.hectare).toEqual(payload.hectare);
  });

  it('should have a utilisation passed in constructor', () => {
    expect(component.utilisation).toEqual(payload.utilisation);
  });

  it('should have a available passed in constructor', () => {
    expect(component.available).toEqual(payload.available);
  });
});
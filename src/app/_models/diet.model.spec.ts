import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Diet, GrazableForage, Consumption, ConsumptionCalculation, FeedAmount, FeedConsumed, FeedClassification, Nutrition, Cost, FeedCalculation, DietRequirements, ProteinRequirement, DietCost, DietNutrition, ForageConcentrateRatio } from './diet.models';
import { Component, Pipe, PipeTransform, Directive } from '@angular/core';

describe('Diet without params', () => {
  let component: Diet;
  
  beforeEach(async(() => {
    component = new Diet();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null grazable forage', () => {
    expect(component.grazableForage).toBeNull();
  });

  it('should have null milkers forage', () => {
    expect(component.milkers).toBeNull();
  });

  it('should have null dry forage', () => {
    expect(component.dry).toBeNull();
  });

  it('should have null transition forage', () => {
    expect(component.transition).toBeNull();
  });
});

describe('Diet with typed payload', () => {
  let component: Diet;
  let payload: Diet;
  
  beforeEach(async(() => {
    payload = new Diet();
    payload.dry = new Consumption();
    payload.transition = new Consumption();
    payload.milkers = new Consumption();
    payload.grazableForage = new GrazableForage();
    payload.grazableForage.available = 12;
    component = new Diet(payload);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have grazable forage', () => {
    expect(component.grazableForage).toBeTruthy();
    expect(component.grazableForage instanceof(GrazableForage)).toBe(true);
    expect(component.grazableForage.available).toEqual(12);
  });

  it('should have milkers', () => {
    expect(component.milkers).toBeTruthy();
    expect(component.milkers instanceof(Consumption)).toBe(true);
  });

  it('should have dry', () => {
    expect(component.dry).toBeTruthy();
    expect(component.dry instanceof(Consumption)).toBe(true);
  });

  it('should have transition', () => {
    expect(component.transition).toBeTruthy();
    expect(component.transition instanceof(Consumption)).toBe(true);
  });
});
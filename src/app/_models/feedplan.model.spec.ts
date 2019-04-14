import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Feedplan, Scenario, HerdBooleans } from './feedplan.models';
import { Component, Pipe, PipeTransform, Directive } from '@angular/core';
import { MonthDisplay } from './shared.models';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

describe('Feedplan without params', () => {
    let component: Feedplan;
  
    beforeEach(async(() => {
      component = new Feedplan();
    }));
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should have null farm id', () => {
      expect(component.farmId).toBeNull();
    });
  
    it('should have null feedplan id', () => {
      expect(component.feedPlanId).toBeNull();
    });
  
    it('should have null scenario', () => {
      expect(component.scenario).toBeNull();
    });
  });

describe('Feedplan called from static constructor', () => {
    let component: Feedplan;
    let farmid = "asdf";
    let date = new MonthDisplay();
    date.month = 6;
    date.text = "July 2019";
    date.year = 2019;
    let cows = new HerdBooleans();
    cows.dry = true;
    cows.transition = true;
    cows.milkers = true;

    beforeEach(async(() => {
      component = Feedplan.create(farmid, date, cows);
    }));
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should have farm id', () => {
      expect(component.farmId).toBe(farmid);
    });
  
    it('should have null feedplan id', () => {
      expect(component.feedPlanId).toBeNull();
    });
  
    it('should have scenario date', () => {
      expect(component.scenario.date).toBeTruthy();
      expect(component.scenario.date.text).toEqual(`July 2019`);
      expect(component.scenario.date.month).toEqual(6);
      expect(component.scenario.date.year).toEqual(2019);
    });

    it('should have scenario name', () => {
      expect(component.scenario.name).toBeTruthy();
      expect(component.scenario.name).toEqual(`New Feed Plan`);
    });

    it('should have scenario cows', () => {
      expect(component.scenario).toBeTruthy();
      expect(component.scenario.cows).toBeTruthy();
      expect(component.scenario.cows.milkers).toBe(true);
      expect(component.scenario.cows.dry).toBe(true);
      expect(component.scenario.cows.transition).toBe(true);
    });

    it('should have scenario valid', () => {
      expect(component.scenario.valid).toBeTruthy();
      expect(component.scenario.valid.length === 3).toBeTruthy();
      expect(component.scenario.valid[0]).toBe(false);
      expect(component.scenario.valid[1]).toBe(false);
      expect(component.scenario.valid[2]).toBe(false);
    });

    it('should have scenario feed types', () => {
      expect(component.scenario.feedTypes).toBeTruthy();
      expect(component.scenario.feedTypes.length === 0);
    });

    it('should have scenario stock properties', () => {
        expect(component.scenario.stockDetails).toBeTruthy();
        expect(component.scenario.stockDetails.length).toBe(1);
        expect(component.scenario.stockDetails[0].month).toEqual(date.text);
        expect(component.scenario.stockDetails[0].date).toBeTruthy();
        expect(component.scenario.stockDetails[0].date.year).toEqual(date.year);
        expect(component.scenario.stockDetails[0].activeDiet);
        expect(component.scenario.stockDetails[0].activeDiet).toBe(true);
        expect(component.scenario.stockDetails[0].valid);
        expect(component.scenario.stockDetails[0].valid).toBe(false);
        expect(component.scenario.stockDetails[0].activeStockDetails);
        expect(component.scenario.stockDetails[0].activeStockDetails).toBe(true);
        expect(component.scenario.stockDetails[0].averageDaysInMilk)
        expect(component.scenario.stockDetails[0].averageDaysInMilk).toBe(0);
        expect(component.scenario.stockDetails[0].averageDaysPregnant);
        expect(component.scenario.stockDetails[0].averageDaysPregnant).toBe(0);
        expect(component.scenario.stockDetails[0].averageDistanceWalkedPerDay);
        expect(component.scenario.stockDetails[0].averageDistanceWalkedPerDay.dry).toBe(0);
        expect(component.scenario.stockDetails[0].averageDistanceWalkedPerDay.milkers).toBe(0);
        expect(component.scenario.stockDetails[0].averageDistanceWalkedPerDay.transition).toBe(0);
        expect(component.scenario.stockDetails[0].averageLiveWeight);
        expect(component.scenario.stockDetails[0].averageLiveWeight.dry).toBe(0);
        expect(component.scenario.stockDetails[0].averageLiveWeight.milkers).toBe(0);
        expect(component.scenario.stockDetails[0].averageLiveWeight.transition).toBe(0);
        expect(component.scenario.stockDetails[0].centsLitre);
        expect(component.scenario.stockDetails[0].centsLitre).toBe(0);
        expect(component.scenario.stockDetails[0].diet);
        expect(component.scenario.stockDetails[0].diet.length === 0);
        expect(component.scenario.stockDetails[0].dietCost);
        expect(component.scenario.stockDetails[0].dietCost.dry);
        expect(component.scenario.stockDetails[0].dietCost.dry.costCP).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.dry.costDM).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.dry.costME).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.milkers);
        expect(component.scenario.stockDetails[0].dietCost.milkers.costCP).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.milkers.costDM).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.milkers.costME).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.transition);
        expect(component.scenario.stockDetails[0].dietCost.transition.costCP).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.transition.costDM).toBe(0);
        expect(component.scenario.stockDetails[0].dietCost.transition.costME).toBe(0);
        expect(component.scenario.stockDetails[0].dietNutrition).toBeNull();
        expect(component.scenario.stockDetails[0].dietValidation)
        expect(component.scenario.stockDetails[0].dietValidation.dry).toBe(false);
        expect(component.scenario.stockDetails[0].dietValidation.milkers).toBe(false);
        expect(component.scenario.stockDetails[0].dietValidation.transition).toBe(false);
        expect(component.scenario.stockDetails[0].feedInstructionNames);
        expect(component.scenario.stockDetails[0].feedInstructionNames.dry).toBeNull();
        expect(component.scenario.stockDetails[0].feedInstructionNames.milkers).toBeNull();
        expect(component.scenario.stockDetails[0].feedInstructionNames.transition).toBeNull();
        expect(component.scenario.stockDetails[0].liveweightChange);
        expect(component.scenario.stockDetails[0].liveweightChange.dry).toBe(0);
        expect(component.scenario.stockDetails[0].liveweightChange.milkers).toBe(0);
        expect(component.scenario.stockDetails[0].liveweightChange.transition).toBe(0);
        expect(component.scenario.stockDetails[0].milkFat).toBe(0);
        expect(component.scenario.stockDetails[0].milkFatPrice).toBe(0);
        expect(component.scenario.stockDetails[0].milkPrice).toBe(true);
        expect(component.scenario.stockDetails[0].milkProtein).toBe(0);
        expect(component.scenario.stockDetails[0].milkProteinPrice).toBe(0);
        expect(component.scenario.stockDetails[0].numberOfAnimals);
        expect(component.scenario.stockDetails[0].numberOfAnimals.dry).toBe(0);
        expect(component.scenario.stockDetails[0].numberOfAnimals.milkers).toBe(0);
        expect(component.scenario.stockDetails[0].numberOfAnimals.transition).toBe(0);
        expect(component.scenario.stockDetails[0].proteinPrice);
        expect(component.scenario.stockDetails[0].proteinPrice).toBe(false);
        expect(component.scenario.stockDetails[0].terrain);
        expect(component.scenario.stockDetails[0].terrain.dry).toBe(0);
        expect(component.scenario.stockDetails[0].terrain.milkers).toBe(0);
        expect(component.scenario.stockDetails[0].terrain.transition).toBe(0);
    });
  });

describe('Feedplan with json payload', () => {
  
  let component: Feedplan;
  let payload: any;
  
  beforeEach(async(() => {
    payload = {
      farmId: "53d0625b-75f5-408e-9c92-076f00763e9a",
      feedPlanId: "a2d181de-b979-4495-8e2b-c61d248d8d7d",
      scenario: {
        name: "New Feed Plan",
        valid: [
          false,
          false,
          false
        ],
        cows: {
          milkers: true,
          dry: false,
          transition: false
        },
        date: {
          month: 3,
          year: 2019
        },
        feedTypes: [],
        stockDetails: 
        [
          {
            month: "April 2019",
            milkPrice: true,
            numberOfAnimals: {
            milkers: 0.0,
            dry: 0.0,
            transition: 0.0
            },
            averageLiveWeight: {
              milkers: 0.0,
              dry: 0.0,
              transition: 0.0
            },
            averageDaysInMilk: 0,
            averageDaysPregnant: 0,
            averageMilkYield: 0.0,
            milkFat: 0.0,
            milkProtein: 0.0,
            liveweightChange: {
              milkers: 0.0,
              dry: 0.0,
              transition: 0.0
            },
            centsLitre: 0,
            milkProteinPrice: 0.0,
            milkFatPrice: 0.0,
            averageDistanceWalkedPerDay: {
              milkers: 0.0,
              dry: 0.0,
              transition: 0.0
            },
            terrain: {
              milkers: 0.0,
              dry: 0.0,
              transition: 0.0
            },
            diet: [],
            dietValidation: {
              milkers: false,
              dry: false,
              transition: false
            },
            activeDiet: true,
            activeStockDetails: true,
            feedInstructionNames: {
              milkers: null,
              dry: null,
              transition: null
            }
          }
        ]
      }
    };

  component = new Feedplan(payload);

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the feedplan properties set', () => {
    expect(component.farmId).toBeTruthy();
    expect(component.farmId).toBe("53d0625b-75f5-408e-9c92-076f00763e9a");
    expect(component.feedPlanId).toBeTruthy();
    expect(component.feedPlanId).toBe("a2d181de-b979-4495-8e2b-c61d248d8d7d");
  });

  it('should have the scenario populated', () => {
    expect(component.scenario).toBeTruthy();
    expect(component.scenario.name).toBe("New Feed Plan");
    expect(component.scenario.name).toBe("New Feed Plan");
    expect(component.scenario.valid).toBeTruthy();
    expect(component.scenario.valid.length === 3);
    expect(component.scenario.valid[0] === false);
    expect(component.scenario.valid[1] === false);
    expect(component.scenario.valid[2] === false);
    expect(component.scenario.cows).toBeTruthy();
    expect(component.scenario.cows.milkers === true);
    expect(component.scenario.cows.dry === false);
    expect(component.scenario.cows.transition === false);
    expect(component.scenario.date).toBeTruthy();
    expect(component.scenario.date.month === 3);
    expect(component.scenario.date.text === "April 2019");
    expect(component.scenario.date.year === 2019);
    expect(component.scenario.feedTypes).toBeTruthy();
    expect(component.scenario.feedTypes.length === 0);
  });

  it('should have the scenario stock details populated', () => {
    expect(component.scenario.stockDetails).toBeTruthy();
    expect(component.scenario.stockDetails.length === 1);
    expect(component.scenario.stockDetails[0]).toBeTruthy();
    expect(component.scenario.stockDetails[0].valid === false);
    expect(component.scenario.stockDetails[0].date !== null);
    expect(component.scenario.stockDetails[0].date.month).toBe(3);
    expect(component.scenario.stockDetails[0].date.year).toBe(2019);
    expect(component.scenario.stockDetails[0].date.text).toBe("April 2019");
  });

  describe('Feedplan with valid data should validate', () => {
  
    let component: Feedplan;
    let payload: any;
    
    beforeEach(async(() => {
      payload = {
        farmId: "53d0625b-75f5-408e-9c92-076f00763e9a",
        feedPlanId: "a2d181de-b979-4495-8e2b-c61d248d8d7d",
        scenario: {
          name: "New Feed Plan",
          valid: [
            false,
            false,
            false
          ],
          cows: {
            milkers: true,
            dry: false,
            transition: false
          },
          date: {
            month: 3,
            year: 2019
          },
          feedTypes: [],
          stockDetails: 
          [
            {
              month: "April 2019",
              milkPrice: true,
              numberOfAnimals: {
              milkers: 110.0,
              dry: 0.0,
              transition: 0.0
              },
              averageLiveWeight: {
                milkers: 500.0,
                dry: 0.0,
                transition: 0.0
              },
              averageDaysInMilk: 30,
              averageDaysPregnant: 10,
              averageMilkYield: 30.0,
              milkFat: 4.0,
              milkProtein: 3.0,
              liveweightChange: {
                milkers: 1.0,
                dry: 0.0,
                transition: 0.0
              },
              centsLitre: 45,
              milkProteinPrice: 0.0,
              milkFatPrice: 0.0,
              averageDistanceWalkedPerDay: {
                milkers: 1.0,
                dry: 0.0,
                transition: 0.0
              },
              terrain: {
                milkers: 1.0,
                dry: 0.0,
                transition: 0.0
              },
              diet: [],
              dietValidation: {
                milkers: false,
                dry: false,
                transition: false
              },
              activeDiet: true,
              activeStockDetails: true,
              feedInstructionNames: {
                milkers: null,
                dry: null,
                transition: null
              }
            }
          ]
        }
      };
  
      component = new Feedplan(payload);
      component.validate();
  
    }));
  
    it('should validate to true', () => {
      expect(component).toBeTruthy();
      expect(component.scenario.valid[0] === true);
      expect(component.scenario.stockDetails[0].valid === true);
    });
  
  });

});
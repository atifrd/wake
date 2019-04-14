import { TestBed } from '@angular/core/testing';

import { TooltipService } from './tooltip.service';

describe('TooltipService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service).toBeTruthy();
  });

  it('should return tip for Milkers', () => {
    const requested = 'Milkers';
    const expected = 'Milkers description';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Early Dry Cows', () => {
    const requested = 'Early Dry Cows';
    const expected = 'EDC description';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Transition Cows', () => {
    const requested = 'Transition Cows';
    const expected = 'Transition description';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Cost ($/kg CP)', () => {
    const requested = 'Cost ($/kg CP)';
    const expected = 'This enables you to compare the value of cost of feeds per kilogram of crude protein.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Cost ($/t DM)', () => {
    const requested = 'Cost ($/t DM)';
    const expected = 'This enables you to compare the cost of feeds per tonne of dry matter, but not per unit energy and protein.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Cost (c/MJ ME)', () => {
    const requested = 'Cost (c/MJ ME)';
    const expected = 'This enables you to compare the cost of feeds per megajoule of metabolisable energy.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Crude protein (% DM)', () => {
    const requested = 'Crude protein (% DM)';
    const expected = 'Crude Protein (CP) is the oldest and simplest way to describe the protein requirements of the cow and the protein supplied in feeds. The crude protein content of a feed is calculated based on its nitrogen content: CP% = N X 6.25';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });
  
  it('should return tip for Dry matter %', () => {
    const requested = 'Dry matter %';
    const expected = 'The dry matter contents of different types of feeds vary widely. It is important that these values are accurate.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });
  
  it('should return tip for Energy (MJ ME/kg DM)', () => {
    const requested = 'Energy (MJ ME/kg DM)';
    const expected = 'Metabolisable Energy (ME) is the main measure used to describe the energy requirements of the cow and the energy supplied in feeds. It is the energy remaining after gas, heat, and faecal and urinary energy have been accounted for.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Feed description', () => {
    const requested = 'Feed description';
    const expected = 'Give each feed a descriptive name. e.g . ASW wheat, home-grown lucerne hay.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Market price ($/tn)', () => {
    const requested = 'Market price ($/tn)';
    const expected = 'Market price for each feed may be expressed either on an as-fed or a dry matter basis, whichever you prefer.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for NDF (% DM)', () => {
    const requested = 'NDF (% DM)';
    const expected = 'Neutral detergent fibre (NDF) is a chemical measure of all the fibre (the digestible and indigestible parts) and indicates how bulky the feed is.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Storage description', () => {
    const requested = 'Storage description';
    const expected = 'Give each storage facility a descriptive name. e.g. Grain silo no. 2, Main hay shed near dairy.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Storage facility', () => {
    const requested = 'Storage facility';
    const expected = 'Select the storage facility each feed will be kept in from the drop-down list provided.';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for Daily growth rate', () => {
    const requested = 'Daily growth rate';
    const expected = 'These figures are based on DairyMod simulations run for each location. They are expressed in percentiles. Poor = 10th percentile. Fair = 25th percentile. Good = 50th percentile. Very good = 75th percentile. Exceptional = 90th percentile';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return tip for % utilisation', () => {
    const requested = '% utilisation';
    const expected = '\'% utilisation\' refers to the proportion of grazable forage that is harvested by the cow. Low utilisation = 55%. Moderate utilisation= 70%. High utilisation = 85%';
    const service: TooltipService = TestBed.get(TooltipService);
    expect(service.tip(requested)).toEqual(expected);
  });

  it('should return a collection of 16 tips for all', () => {
    const expected = 16;
    const service: TooltipService = TestBed.get(TooltipService);
    const actual = service.all();
    expect(Object.keys(actual).length).toEqual(expected);
  });

});

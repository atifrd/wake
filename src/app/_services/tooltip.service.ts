import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  private tips: Object =
  {
    'Milkers': 'Milkers description',
    'Early Dry Cows': 'EDC description',
    'Transition Cows': 'Transition description',
    'Cost ($/kg CP)': 'This enables you to compare the value of cost of feeds per kilogram of crude protein.',
    'Cost ($/t DM)': 'This enables you to compare the cost of feeds per tonne of dry matter, but not per unit energy and protein.',
    'Cost (c/MJ ME)': 'This enables you to compare the cost of feeds per megajoule of metabolisable energy.',
    'Crude protein (% DM)': 'Crude Protein (CP) is the oldest and simplest way to describe the protein requirements of the cow and the protein supplied in feeds. The crude protein content of a feed is calculated based on its nitrogen content: CP% = N X 6.25',
    'Dry matter %': 'The dry matter contents of different types of feeds vary widely. It is important that these values are accurate.',
    'Energy (MJ ME/kg DM)': 'Metabolisable Energy (ME) is the main measure used to describe the energy requirements of the cow and the energy supplied in feeds. It is the energy remaining after gas, heat, and faecal and urinary energy have been accounted for.',
    'Feed description': 'Give each feed a descriptive name. e.g . ASW wheat, home-grown lucerne hay.',
    'Market price ($/tn)': 'Market price for each feed may be expressed either on an as-fed or a dry matter basis, whichever you prefer.',
    'NDF (% DM)': 'Neutral detergent fibre (NDF) is a chemical measure of all the fibre (the digestible and indigestible parts) and indicates how bulky the feed is.',
    'Storage description': 'Give each storage facility a descriptive name. e.g. Grain silo no. 2, Main hay shed near dairy.',
    'Storage facility': 'Select the storage facility each feed will be kept in from the drop-down list provided.',
    'Daily growth rate': 'These figures are based on DairyMod simulations run for each location. They are expressed in percentiles. Poor = 10th percentile. Fair = 25th percentile. Good = 50th percentile. Very good = 75th percentile. Exceptional = 90th percentile',
    '% utilisation': '\'% utilisation\' refers to the proportion of grazable forage that is harvested by the cow. Low utilisation = 55%. Moderate utilisation= 70%. High utilisation = 85%'
  };

  constructor() { }

  all() {
    return this.tips;
  }

  tip(title: string) {
    return this.tips[title];
  }

}
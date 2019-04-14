import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FeedConsumed, FeedAmount, FeedCalculation, DietRequirements, ProteinRequirement, DietCost, DietNutrition, ForageConcentrateRatio } from '../_models/diet.models';
import { StockDetails, FeedType } from '../_models/feedplan.models';

@Injectable({
  providedIn: 'root'
})

export class DietCalculatorService {

    // constants
    readonly k_Lactose = 50;
    readonly k_TimeStanding = 14;
    readonly k_PositionChanges = 10;
    readonly k_FastingMetabolismCorrectionFactor = 1.1;
    readonly k_Kc = 0.133;
    readonly k_Kt = 0.84;
    readonly k_GrossEnergy = 18.8;

    // stock data
    val_AvgDaysInMilk:number=0;
    val_AvgMilkYield:number=0;
    val_AvgDaysPregnant:number=0;
    val_LiveWeightChange:number=0;
    val_AvgLiveWeight:number=0;
    val_DistanceWalked:number=0;
    val_HeightWalked:number=0;
    val_Fat:number=0;
    val_Protein:number=0;
    val_cowType:string="milkers";
    
    // dietary data
    val_dietFed:Array<FeedType> = [];
    val_MjME:number=0;
    val_KgDM:number=0;

    constructor() { }

    monthsTimeAfterCalving(){
      return this.val_AvgDaysInMilk/30.5;
    }

    fat(){
      return this.val_Fat*10;
    }

    protein(){
      return this.val_Protein*10;
    }

    maxNdfIntakeLiveWeight(){
      return 0.0125*this.val_AvgLiveWeight;
    }

    dailyMaxIntakeLiveWeight(){
      return this.val_AvgLiveWeight*this.maxNdfIntakeLiveWeight();
    }

    fatCorrectedMilkYield(){
      return (this.fat()/10*0.406+1.509)*this.val_AvgMilkYield/(0.406*4+1.509);
    }

    dmiPotential(){
      return ((0.372*this.fatCorrectedMilkYield())+(0.0968*Math.pow(this.val_AvgLiveWeight,0.75))*(1-Math.exp(-0.192*((this.val_AvgDaysInMilk/7)+3.67))));
    }

    energyDensity(){
      return this.val_MjME/this.val_KgDM;
    }

    qM(){
      return this.energyDensity()/this.k_GrossEnergy;
    }

    kM(){
      return 0.35*this.qM()+0.503;
    }

    kI(){
      return 0.35*this.qM()+0.42;
    }

    kG(){
      var result = null;
      
      if(this.val_cowType === 'milkers'){
        result = this.kI()*0.95;
      }
      else {
        result = (0.78*this.kI())+0.006;
      }
      
      return result;
    }

    l(){
      return this.val_MjME/this.mM();
    }

    cL(){
      return 1+(0.018*(this.l()-1));
    }

    r(){
      return -0.024+0.179*(1-Math.exp(-0.278*this.l()));
    }

    fastingMetabolism(){
      return this.k_FastingMetabolismCorrectionFactor*(0.53*(Math.pow((this.val_AvgLiveWeight/1.08),0.67)));
    }

    horizontal(){
      return (2.6*this.val_AvgLiveWeight*this.val_DistanceWalked)/1000000;
    }

    vertical(){
      return (28*this.val_AvgLiveWeight*this.val_HeightWalked)/1000000;
    }

    standing(){
      return (10000*(this.k_TimeStanding/24)*this.val_AvgLiveWeight)/1000000;
    }

    position(){
      return (260*this.val_AvgLiveWeight*this.k_PositionChanges)/1000000;
    }

    eM(){
      return this.fastingMetabolism()+this.horizontal()+this.vertical()+this.standing()+this.position(); 
    }

    mM(){
      return this.eM()/this.kM();
    }

    evi(){
      return (0.0384*this.fat())+(0.0223*(this.protein()/0.94))+(0.0199*this.k_Lactose)-0.108;
    }

    eI(){
      return this.val_AvgMilkYield*this.evi();
    }

    mI(){
      return this.eI()/this.kI();
    }

    mG(){
      var result;
      if(this.val_LiveWeightChange <=0 ){
        if(this.val_cowType === 'milkers'){
          result = ((19*this.k_Kt)/this.kI())*this.val_LiveWeightChange;  
        }
        else {
          result = 19*this.k_Kt*this.val_LiveWeightChange;
        }
      }
      else {
        result = (19/this.kG())*this.val_LiveWeightChange;
      }
      return result;
    }

    wC(){
      return ((Math.pow(this.val_AvgLiveWeight,0.73))-28.89)/2.064;
    }

    log10Et(){
      return 151.665-(151.64* Math.exp(-0.0000576*this.val_AvgDaysPregnant));
    }

    eT(){
      return Math.pow(10,this.log10Et());
    }

    eC(){
      return 0.025*this.wC()*(this.eT()*0.0201*Math.exp(-0.0000576*this.val_AvgDaysPregnant));
    }

    mC(){
      return this.eC()/this.k_Kc;
    }

    mmP(){
      return (this.mM()+this.mI()+this.mG()+this.mC())*this.cL()*1.05;
    }

    ///
    /// END - ENERGY REQUIREMENTS CALCULATIONS
    ///

    ///
    /// START - PROTEIN REQUIREMENTS CALCULATIONS
    /// these functions are prefixed with mp in case of name clashes
    /// as they were added after all the energy calculation functions were written
    ///

    // Calculations for Pregnancy
    Log10Tpt(){
      return 3.707-(5.698*Math.exp(-0.00262*this.val_AvgDaysPregnant));
    }

    Tpt(){
      return Math.pow(10, this.Log10Tpt());
    }

    mpWc(){
      return (Math.pow(this.val_AvgLiveWeight, 0.73)-28.89)/2.064;
    }

    Mpc(){
      return 1.01*this.mpWc()*(this.Tpt()*Math.exp(-0.00262*this.val_AvgDaysPregnant));
    }

    Mpg(){
      var result = 0;
      if(this.val_LiveWeightChange > 0){
        result = 233*this.val_LiveWeightChange;
      }
      else if(this.val_LiveWeightChange < 0){
        result = 138*this.val_LiveWeightChange;
      }
      return result;
    }

    Mpi(){
      var result = 0;
      if(this.val_AvgMilkYield > 0){
        result = 1.471*this.protein()*this.val_AvgMilkYield*1.03;
      }
      return result;
    }

    Mpb(){
      return 2.1875*(Math.pow(this.val_AvgLiveWeight, 0.75));
    }

    Mpd(){
      return 0.1125*(Math.pow(this.val_AvgLiveWeight, 0.75));
    }

    Mpm(){
      return this.Mpb()+this.Mpd();
    }

    Mpmp(){
      return this.Mpc()+this.Mpg()+this.Mpi()+this.Mpm();
    }

    MpmpCorrection(){
      return this.Mpmp()*1.25;
    }

    mpTotal(){
      return this.MpmpCorrection()*1.05;
    }
    
    Mpy(fme){
      return (7+(6*(1-Math.exp(-0.35*this.l()))))*fme;
    }
    
    Erdp(feed:FeedType){
      return 0.8*(this.Qdp(feed)+this.Sdp(feed));
    }
    
    Mcp(feed:FeedType){
      var mpy = this.Mpy(feed);
      var erdp = this.Erdp(feed);
      var result = erdp;
      if(mpy <= erdp){
        result = mpy;
      }
      return result;
    }
    
    Mtp(feed:FeedType){
      return this.Mcp(feed)*0.75;
    }
    
    Dmtp(feed:FeedType){
      return this.Mtp(feed)*0.85;
    }
    
    Mp(feed:FeedType){
      return this.Dmtp(feed)+this.Dup(feed);
    }
    
    Dup(feed:FeedType){
      var result = 0;
      if(feed.adin > 0){
        result = 0.9*(this.Udp(feed)-(6.25*feed.adin*feed.dm));
      }
      else {
        result = 0.85*this.Udp(feed);
      }
      return result;
    }
    
    Udp(feed:FeedType){
      return feed.dm*feed.cp-(this.Sdp(feed)+this.Qdp(feed));
    }

    Sdp(feed:FeedType){
      
      var result = 0;
              
      var an = feed.an;
      var bn = feed.bn;
      var cn = feed.cn;
      var cp = feed.cp;
      var dm = feed.dm;
      
      //  bn * cn / cn + r() * cp * dm
      
      result = (((bn*cn)/(cn+this.r()))*cp)*dm;
      // 0.1188/
      
      if(isNaN(result)) {
        result = 0;
      } 
      
      return result;
    }
    
    Qdp(feed:FeedType){
      // How can this possibly be wrong?
      var val1 = feed.cp;
      var val2 = feed.an;
      var val3 = feed.dm;
      
      var result = val1*val2*val3; 
      
      return result;
    }
    
    Fme(feed:FeedType){
      
      var result = 0;      
      var feedType = feed.feedCode;
      var fatDensity = (feed.ee/1000)*35;
      
      if(feedType === 'grass silage'){
        result = 0.9*(feed.me-fatDensity)*feed.dm;
      }
      else if(feedType === 'other silage'){
        result = feed.me*(0.467+(0.00136*feed.dm)-(0.00000115*Math.pow(feed.dm,2)))*feed.dm;
      }
      else if(feedType === 'distillery byproduct'){
        result = (0.95*feed.me-fatDensity)*feed.dm;
      }
      else {
        result = (feed.me-fatDensity)*feed.dm;
      }
      
      return result;
    }
    
    mpSupply(){
      
      var result = 0;
      var qdp = 0;
      var sdp = 0;
      var fme = 0;
      var udp = 0;
      var dup = 0;

      this.val_dietFed.forEach((feed) => {
        qdp += this.Qdp(feed);
        sdp += this.Sdp(feed);
        udp += this.Udp(feed);
        dup += this.Dup(feed);
        fme += this.Fme(feed);
      });
      
      var erdp = 0.8 * qdp + sdp;
      var rdp = qdp + sdp;
      var mpy = this.Mpy(fme);
      var mcp = 0;
      
      if(mpy <= erdp){
        mcp = mpy;
      }
      else {
        mcp = erdp;
      }
      
      var mtp = 0.75 * mcp;
      var dmtp = 0.85 * mtp;
      var mp = dmtp + dup;
      
      result = mp;
      
      return result;
    }
    
    ///
    /// END - PROTEIN REQUIREMENTS CALCULATIONS
    ///

    // Dietary Requirements
    dietRequirements(stockDetails:StockDetails, dietFed:FeedType[], cowType:string) : DietRequirements {
    
      // STOCK DETAILS
      this.val_AvgDaysInMilk = stockDetails.averageDaysInMilk;
      this.val_AvgMilkYield = stockDetails.averageMilkYield;
      this.val_AvgDaysPregnant = cowType === 'dry' ? 245 : cowType === 'transition' ? 270 : stockDetails.averageDaysPregnant;
      this.val_AvgLiveWeight = stockDetails.averageLiveWeight[cowType];
      this.val_LiveWeightChange = stockDetails.liveweightChange[cowType];
      this.val_DistanceWalked = stockDetails.averageDistanceWalkedPerDay[cowType]*1000;
      this.val_HeightWalked = stockDetails.terrain[cowType];
      this.val_Fat = stockDetails.milkFat;
      this.val_Protein = stockDetails.milkProtein;
      this.val_cowType = cowType;

      // DIET DETAILS
      this.val_dietFed = dietFed;
      this.val_MjME = 0;
      this.val_KgDM = 0;
      
      dietFed.forEach((feed) => {
        if(feed.asFedOrDM != 'dm'){
          var feedSuppliedMe = feed.me*(feed.dm/1000);
          this.val_MjME += feedSuppliedMe;
        }
        else {
          this.val_MjME += feed.me;
        }
        this.val_KgDM += feed.dm;
      });
      
      var energy = this.mmP(); // the amount of energy required given the chosen diet
      var appetite = cowType === 'dry' ? 10 : cowType === 'transition' ? 11.5 : this.dmiPotential();

      var protein = new ProteinRequirement();
      protein.required = this.mpTotal();
      protein.supply = this.mpSupply();
      
      //(proteinNumerator/proteinDemoninator)*100; // the protein requirement given the chosen diet

      var dietRequirements = new DietRequirements();
      dietRequirements.energyRequirement = energy;
      dietRequirements.appetiteRequirement = appetite;
      dietRequirements.proteinRequirement = protein;
      

      return dietRequirements;
    }
    
    // cost, nutrition and requirements of diet
    dietNutrition(dietTotals: Array<FeedCalculation>, requirements: DietRequirements, cow_type: string) : DietNutrition {
    
        var totals = {
          me:0,
          cp:0,
          dm:0,
          ndf:0,
          starch:0,
          forage:0,
          concentrate:0
        };
        
        dietTotals.forEach((feed: FeedCalculation) => {
          var dmRatio = feed.feedType.asFedOrDM === 'dm' ? 1 : feed.feedType.dm/1000;
          totals.me += feed.feedConsumed.me*dmRatio;
          totals.cp += feed.feedConsumed.cp;
          totals.dm += feed.feedConsumed.dm;
          totals.ndf += feed.feedConsumed.ndf;
          totals.starch += feed.feedConsumed.starch;
          if(feed.feedType.type ==='Forage'){
            totals.forage += feed.feedConsumed.dm;
          }
          else {
            totals.concentrate += feed.feedConsumed.dm;
          }
        });

        var energyRatio = totals.me/requirements.energyRequirement*100;
        var energyRequired = requirements.energyRequirement;
        var energySupplied = totals.me;
        var energyValid = this.withinRange(energyRatio, 95, 110);         
        var proteinRequired = requirements.proteinRequirement.required;
        var proteinSupplied = requirements.proteinRequirement.supply;
        var proteinRatio = proteinSupplied/proteinRequired*100;
        var proteinValid = this.withinRange(proteinRatio, 95, 180);
        var appetiteRatio = totals.dm/requirements.appetiteRequirement*100;
        var appetiteRequired = requirements.appetiteRequirement;
        var appetiteSupplied = totals.dm;
        var appetiteValid = 
          cow_type === 'dry' ? this.withinRange(appetiteRatio, 80, 120) :
          cow_type === 'transition' ? this.withinRange(appetiteRatio, 80, 120) :
          this.withinRange(appetiteRatio, 85, 115);
        var ndfRatio = (totals.ndf/1000)/totals.dm;
        var ndfValid = this.withinRange(ndfRatio, 0.30, 1);
        var starchRatio = (totals.starch/1000)/totals.dm;
        var starchValid = this.withinRange(starchRatio, 0, 0.25);
        var forageRatio = totals.forage/totals.dm*100;
        var concentrateRatio = totals.concentrate/totals.dm*100;
        var forageConcentrateRatio = new ForageConcentrateRatio();
        forageConcentrateRatio.forage = forageRatio;
        forageConcentrateRatio.concentrate = concentrateRatio;
        var forageConcentrateValid = this.greaterThan(forageRatio, 40);

        var dietValid = energyValid && proteinValid && appetiteValid && ndfValid && starchValid && forageConcentrateValid;

        var dietNutrition = new DietNutrition();

        dietNutrition.energyRatio = energyRatio;
        dietNutrition.energyRequired = energyRequired;
        dietNutrition.energySupplied = energySupplied;
        dietNutrition.energyValid = energyValid;
        dietNutrition.energyAmount = totals.me;
        dietNutrition.proteinRatio = proteinRatio;
        dietNutrition.proteinValid =proteinValid;
        dietNutrition.proteinAmount = totals.cp;
        dietNutrition.proteinSupplied = proteinSupplied;
        dietNutrition.proteinRequired = proteinRequired;
        dietNutrition.appetiteRatio = appetiteRatio;
        dietNutrition.appetiteValid = appetiteValid;
        dietNutrition.appetiteAmount = requirements.appetiteRequirement;
        dietNutrition.appetiteRequired = appetiteRequired;
        dietNutrition.appetiteSupplied = appetiteSupplied;
        dietNutrition.ndfRatio = ndfRatio;
        dietNutrition.ndfValid = ndfValid;
        dietNutrition.ndfAmount = totals.ndf;
        dietNutrition.starchRatio = starchRatio;
        dietNutrition.starchValid = starchValid;
        dietNutrition.starchAmount = totals.starch;
        dietNutrition.forageConcentrateRatio = forageConcentrateRatio;
        dietNutrition.forageConcentrateValid = forageConcentrateValid;
        dietNutrition.dmAmount = totals.dm;
        dietNutrition.dietValid = dietValid;
        
        return dietNutrition;
    }

    // composition requires stock details, diet details
    dietCost(stockDetails:StockDetails, dietTotals: Array<FeedCalculation>, cowType: string) : DietCost {

      // milkIncome ($ per cow, per day)
      var milkIncomePerCow = 0;
      var milkProteinIncomePerCow = 0;
      var milkFatIncomePerCow = 0;
      var feedCostPerCow = 0;
      var feedCostPerDM = 0;
      var marginOverFeedCost = 0;
      var feedCostPerMilkIncome = 0;
      var fce = 0;
      
      if(stockDetails.milkPrice){
        milkIncomePerCow = stockDetails.centsLitre/100 * stockDetails.averageMilkYield;
      }
      else {
        milkProteinIncomePerCow = ((stockDetails.milkProtein/100) * stockDetails.averageMilkYield) * stockDetails.milkProteinPrice;
        milkFatIncomePerCow = ((stockDetails.milkFat/100) * stockDetails.averageMilkYield) * stockDetails.milkFatPrice;
        milkIncomePerCow = milkProteinIncomePerCow + milkFatIncomePerCow;
      }
      
      var totalDmPerCow = _.reduce(dietTotals, function(total, diet){
          return total + diet.feedConsumed.dm; 
      }, 0);
      
      var totalCostPerCow = _.reduce(dietTotals, function(total, diet){
          return total + diet.feedConsumed.cost; 
      }, 0);

      feedCostPerCow = totalCostPerCow; // stockDetails.numberOfAnimals[cowType];
      feedCostPerDM = totalCostPerCow/totalDmPerCow;
      marginOverFeedCost = milkIncomePerCow-feedCostPerCow;
      feedCostPerMilkIncome = feedCostPerCow/milkIncomePerCow*100;
      fce = stockDetails.averageMilkYield/totalDmPerCow;

      var dietCost = new DietCost();

      dietCost.fce = fce;
      dietCost.feedCostOfMilkIncome = feedCostPerMilkIncome;
      dietCost.milkIncomePerDay = milkIncomePerCow;
      dietCost.feedCostPerDay = feedCostPerCow;
      dietCost.marginOverFeedCostPerDay = marginOverFeedCost;
      dietCost.feedCostPerKgDm = feedCostPerDM;

      return dietCost;
    }

    // reporting totals
    dietReports(stockDetails:any, amount:string, feed:any) {
      var values = [];
      var total  = 0;
      if (amount == 'tonnes') {
        stockDetails.map(function(stock) {
          stock.diet.map(function(j) {
            total = 0;
            for (var k in j) {
              total += j[k].consumed;
            }
            values.push(total);
          });
        });
      }
      if (amount == 'cost') {
        stockDetails.map(function(stock) {
          stock.diet.map(function(j) {
            total = 0;
            for (var k in j) {
              if (j[k].calc != undefined && j[k].calc.cost != undefined) total += j[k].calc.cost;
            }
            values.push(total);
          });
        });
      }
      if (feed == undefined) {
        return values.reduce(function(p, c) {
          return p + c;
        });
      } else {
        return values[feed];
      }
    }
    
    daysInMonth(month: string){
        let monthYear: string[] = month.split(' ');
        var numberOfDays = 0;
        switch(monthYear[0]){
          case 'January': numberOfDays = 31;break;
          case 'February':
          {
            numberOfDays = parseInt(monthYear[1]) %4 == 0 ? 29:28;
          } 
          break;
          case 'March': numberOfDays = 31;break;
          case 'April': numberOfDays = 30;break;
          case 'May': numberOfDays = 31;break;
          case 'June': numberOfDays = 30;break;
          case 'July': numberOfDays = 31;break;
          case 'August': numberOfDays = 31;break;
          case 'September': numberOfDays = 30;break;
          case 'October': numberOfDays = 31;break;
          case 'November': numberOfDays = 30;break;
          case 'December': numberOfDays = 31;break;
        }
        return numberOfDays;
    }

    withinRange(ratio:number, lower:number, upper:number){
        var check = ratio > lower && ratio < upper;
        return check;
    }
    
    greaterThan(ratio:number, lower:number){
      var check = ratio > lower;
      return check;
    }
    
    withinRatioRange(left:number, right:number, lower:number, upper:number){
      var baseline = left+right;
      var leftRatio = (left/baseline);
      var rightRatio = (right/baseline);
      // we only need to check one ratio for validity:
      var check = leftRatio >= lower && leftRatio <= upper;
      return check;
    }
  }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FarmService } from '../_services/farm.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.sass']
})

export class FarmComponent implements OnInit, OnDestroy {

  constructor(public farm: FarmService) { }

  ngOnInit() { }

  ngOnDestroy() { }
}
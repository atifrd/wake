import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-feeding-instructions-edit',
  templateUrl: './stock-feeding-instructions-edit.component.html',
  styleUrls: ['./stock-feeding-instructions-edit.component.sass']
})
export class StockFeedingInstructionsEditComponent implements OnInit {

  @Input() comment : string;
  constructor() { }

  ngOnInit() {
  }

}

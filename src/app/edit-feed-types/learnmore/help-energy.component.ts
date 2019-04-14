import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-energy',
  templateUrl: './help-energy.component.html',
  styleUrls: ['./help-energy.component.scss']
})
export class HelpEnergyComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }

}

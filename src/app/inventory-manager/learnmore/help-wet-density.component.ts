import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-wet-density',
  templateUrl: './help-wet-density.component.html',
  styleUrls: ['./help-wet-density.component.scss']
})
export class HelpWetDensityComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

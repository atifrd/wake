import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-capacity',
  templateUrl: './help-capacity.component.html',
  styleUrls: ['./help-capacity.component.scss']
})
export class HelpCapacityComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

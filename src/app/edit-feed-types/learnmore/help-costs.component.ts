import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-costs',
  templateUrl: './help-costs.component.html',
  styleUrls: ['./help-costs.component.scss']
})
export class HelpCostsComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }

}

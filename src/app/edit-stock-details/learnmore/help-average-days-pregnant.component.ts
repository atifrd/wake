import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-average-days-pregnant',
  templateUrl: './help-average-days-pregnant.component.html',
  styleUrls: ['./help-average-days-pregnant.component.scss']
})
export class HelpAverageDaysPregnantComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

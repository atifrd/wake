import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-average-days-in-milk',
  templateUrl: './help-average-days-in-milk.component.html',
  styleUrls: ['./help-average-days-in-milk.component.scss']
})
export class HelpAverageDaysInMilkComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

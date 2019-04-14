import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-average-liveweight',
  templateUrl: './help-average-liveweight.component.html',
  styleUrls: ['./help-average-liveweight.component.scss']
})
export class HelpAverageLiveweightComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

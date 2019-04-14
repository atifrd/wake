import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-liveweight-change',
  templateUrl: './help-liveweight-change.component.html',
  styleUrls: ['./help-liveweight-change.component.scss']
})
export class HelpLiveweightChangeComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

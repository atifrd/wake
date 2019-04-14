import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-distance-walked',
  templateUrl: './help-distance-walked.component.html',
  styleUrls: ['./help-distance-walked.component.scss']
})
export class HelpDistanceWalkedComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

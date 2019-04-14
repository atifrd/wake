import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-feed-level-from-back',
  templateUrl: './help-feed-level-from-back.component.html',
  styleUrls: ['./help-feed-level-from-back.component.scss']
})
export class HelpFeedLevelFromBackComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }

}

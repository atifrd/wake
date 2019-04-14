import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-feed-level-from-bottom',
  templateUrl: './help-feed-level-from-bottom.component.html',
  styleUrls: ['./help-feed-level-from-bottom.component.scss']
})
export class HelpFeedLevelFromBottomComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

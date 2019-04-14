import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-feed-level-bales',
  templateUrl: './help-feed-level-bales.component.html',
  styleUrls: ['./help-feed-level-bales.component.scss']
})
export class HelpFeedLevelBalesComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

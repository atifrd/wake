import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-feed-wastage',
  templateUrl: './help-feed-wastage.component.html',
  styleUrls: ['./help-feed-wastage.component.scss']
})
export class HelpFeedWastageComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

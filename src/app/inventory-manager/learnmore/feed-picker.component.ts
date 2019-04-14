import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-feed-picker',
  templateUrl: './feed-picker.component.html',
  styleUrls: ['./feed-picker.component.scss']
})
export class FeedPickerComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

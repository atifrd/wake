import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-milk-fat',
  templateUrl: './help-milk-fat.component.html',
  styleUrls: ['./help-milk-fat.component.scss']
})
export class HelpMilkFatComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

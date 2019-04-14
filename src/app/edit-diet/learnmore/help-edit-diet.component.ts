import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-edit-diet',
  templateUrl: './help-edit-diet.component.html',
  styleUrls: ['./help-edit-diet.component.scss']
})
export class HelpEditDietComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

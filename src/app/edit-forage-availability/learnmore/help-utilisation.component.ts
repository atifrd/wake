import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-utilisation',
  templateUrl: './help-utilisation.component.html',
  styleUrls: ['./help-utilisation.component.scss']
})
export class HelpUtilisationComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

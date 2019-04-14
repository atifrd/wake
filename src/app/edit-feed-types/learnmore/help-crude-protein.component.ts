import { Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-foundation/modal';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-crude-protein',
  templateUrl: './help-crude-protein.component.html',
  styleUrls: ['./help-crude-protein.component.scss']
})
export class HelpCrudeProteinComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }

}

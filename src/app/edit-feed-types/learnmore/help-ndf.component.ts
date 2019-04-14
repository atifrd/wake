import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-ndf',
  templateUrl: './help-ndf.component.html',
  styleUrls: ['./help-ndf.component.scss']
})
export class HelpNdfComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }

}

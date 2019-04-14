import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-balance-diet',
  templateUrl: './help-balance-diet.component.html',
  styleUrls: ['./help-balance-diet.component.scss']
})
export class HelpBalanceDietComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

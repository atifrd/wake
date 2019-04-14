import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-cow-appetite',
  templateUrl: './help-cow-appetite.component.html',
  styleUrls: ['./help-cow-appetite.component.scss']
})
export class HelpCowAppetiteComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

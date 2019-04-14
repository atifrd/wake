import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-help-terrain',
  templateUrl: './help-terrain.component.html',
  styleUrls: ['./help-terrain.component.scss']
})
export class HelpTerrainComponent implements OnInit {
  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-feedtype-details',
  templateUrl: './edit-feedtype-details.component.html',
  styleUrls: ['./edit-feedtype-details.component.sass']
})
export class EditFeedtypeDetailsComponent implements OnInit {

  constructor(private modalService : ModalService) { }

  ngOnInit() {
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  save(){
    //Save logic
    this.modalService.hide();
  }

  cancel(){
    this.modalService.hide();
  }

}

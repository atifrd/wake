import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-foundation';

@Injectable({
  providedIn: 'root'
})
export class NgxRevealModalService {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }


  show(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  hide(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

}

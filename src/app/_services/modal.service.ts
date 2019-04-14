
import { Injectable, Type, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-foundation/modal';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private modalRefList: BsModalRef[] = [];
    private currentModalRef: BsModalRef;
    constructor(private modalService: BsModalService) { }

    show(template: string | TemplateRef<any> | any, cssClass: string = '', param?: any): Observable<any> {

        const initialState = {
            resultForParent: '',
            paramFromParent: param
        };

        this.modalRefList.push(this.modalService.show(template, { class: cssClass, initialState }));
        //this.modalRef.content.paramFromParent = param;

        return new Observable<string>(this.getConfirmSubscriber());
    }

    hide() {
        this.currentModalRef = this.modalRefList.pop();
        this.currentModalRef.hide();
    }

    private getConfirmSubscriber() {
        return (observer) => {
            const subscription = this.modalService.onHidden.subscribe(() => {
                observer.next(this.currentModalRef.content.resultForParent);
                observer.complete();
            });

            return {
                unsubscribe() {
                    subscription.unsubscribe();
                }
            };
        }
    }
}

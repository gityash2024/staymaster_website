import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { CustomModalComponent } from '../modal/custom-modal/custom-modal.component';
import { Subject } from 'rxjs';
import { PropertiesFilterModalComponent } from '../modal/properties-filter-modal/properties-filter-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private componentRef!: ComponentRef<CustomModalComponent>;
  private componentPropRef!: ComponentRef<PropertiesFilterModalComponent>;
  private componentSubscriber!: Subject <string>;
  private componentSubscriberProp!: Subject <string>;
  constructor(private resolver: ComponentFactoryResolver, 
    private resolverProp: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    let factory = this.resolver.resolveComponentFactory(CustomModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  // openFilterModal(entry: ViewContainerRef, modalTitle: string, modalBody: string, data: any[]) {
  //   let factory = this.resolverProp.resolveComponentFactory(PropertiesFilterModalComponent);
  //   this.componentPropRef = entry.createComponent(factory);
  //   this.componentPropRef.instance.title = modalTitle;
  //   this.componentPropRef.instance.body = modalBody;
  //   // this.componentPropRef.instance.data = data;
  //   this.componentPropRef.instance.closeMeEvent.subscribe(() => this.closePropModal());
  //   this.componentPropRef.instance.confirmEvent.subscribe(() => this.confirmProp());
  //   this.componentSubscriberProp = new Subject<string>();
  //   return this.componentSubscriberProp.asObservable();
  // }

  closePropModal() {
    this.componentSubscriberProp.complete();
    this.componentPropRef.destroy();
  }

  confirmProp() {
    this.componentSubscriberProp.next('confirm');
    this.closeModal();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalManagerService } from 'src/app/services/modal-manager.service';

@Component({
    selector: 'app-concierge-description',
    templateUrl: './concierge-description.component.html',
    styleUrls: ['./concierge-description.component.scss']
})
export class ConciergeDescriptionComponent {

    conciergeDesc: { name: string , desc: string} = { name: '', desc: '' };
    title: string = '';
    overlayVisible: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private mms: ModalManagerService,
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.conciergeDesc = JSON.parse(decodeURIComponent(params['conciergeDesc']));
            this.title = params['title'];
            console.log('conciergeDesc', this.conciergeDesc, this.title)
        });
    }

    toggleMenu() {
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
			this.overlayVisible = true;
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
        else this.mms.topMenuModal({ id: 0 }).subscribe((res: any) => {});
    }

    shareOnWhatsApp(){
        const whatsappLink = `https://api.whatsapp.com/send?text=${this.conciergeDesc.name}&phone=919226934609`;
        window.open(whatsappLink, '_blank')
    }
}

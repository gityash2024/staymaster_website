import { Component } from '@angular/core';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/http/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
	//selectedGender: string = '';
	contactForm: FormGroup;
	isSubmitted = false;
	errorMessage = '';
	reasons = ['Support', 'Sales', 'Feedback', 'Other'];
	overlayVisible: boolean = false;

	constructor(
		private mms: ModalManagerService,
		private fb: FormBuilder,
		private http: HttpClient,
		private apiService: ApiService,
		private toastr: ToastrService
	) {
		this.contactForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', Validators.required],
			reason: ['',],
			message: ['', Validators.required]
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

	onSubmit(form: any) {
		console.log('Form Data:', form.value);
		this.isSubmitted = true;

		const payload = {
			form_type: 'contact_us',
			name: form.value.name || '',
			email: form.value.email || '',
			phone: form.value.phone || '',
			comment: form.value.message || '',
		};

		if (form.valid) {
			this.apiService.httpPostForm('/ext/submitForm', payload, 'text').subscribe(
				(res: any) => {
					console.log('Form submitted successfully:', res);
					this.toastr.success(`Thank you for your enquiry, we will get in touch with you shortly`);
					form.reset();
					this.isSubmitted = false;

				},
				(error: any) => {
					console.error('Error submitting form:', error);
				}
			);
		} else {
			console.warn('Form is invalid. Please correct the errors.');
		}
	}


}

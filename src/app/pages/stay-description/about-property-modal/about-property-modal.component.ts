import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about-property-modal',
  templateUrl: './about-property-modal.component.html',
  styleUrls: ['./about-property-modal.component.scss']
})
export class AboutPropertyModalComponent {

  propertyDetails: { description: string, details: any } = { description: '', details: [] }

  constructor(
    public dialogRef: MatDialogRef<AboutPropertyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any
  ) { }

  ngOnInit() {
    this.propertyDetails.description = this.reqData.data.description_summary;
    if (this.reqData.data.description_bedrooms_and_bath) {
      this.propertyDetails.details.push({
        "title": "Bedrooms & Bath",
        "description": this.reqData.data.description_bedrooms_and_bath
      })
    }
    if (this.reqData.data.description_living_and_dining) {
      this.propertyDetails.details.push({
        "title": "Living & Dining",
        "description": this.reqData.data.description_living_and_dining
      })
    }
    if (this.reqData.data.description_kitchen_space) {
      this.propertyDetails.details.push({
        "title": "Kitchen Space",
        "description": this.reqData.data.description_kitchen_space
      })
    }
    if (this.reqData.data.description_pool) {
      this.propertyDetails.details.push({
        "title": "Pool",
        "description": this.reqData.data.description_pool
      })
    }
    if (this.reqData.data.description_hospitality_service) {
      this.propertyDetails.details.push({
        "title": "Hospitality & Service",
        "description": this.reqData.data.description_hospitality_service
      })
    }
    if (this.reqData.data.description_unique_highlights) {
      this.propertyDetails.details.push({
        "title": "Unique Highglights",
        "description": this.reqData.data.description_unique_highlights
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { Fancybox } from "@fancyapps/ui";
// const Fancybox = Fancybox()
@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoGalleryComponent {

  currentDevice: string = "";
  categoryMedia:any;
  allMedias:any;
  category: string = 'All Photos';
  // private lightGallery!: LightGallery;
  // settings = {
  //   counter: false,
  //   plugins: [lgZoom]
  // };

  constructor(
    private config: ConfigService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private location: Location,
    private elRef: ElementRef
  ) {

  }

  ngOnInit() {
    this.currentDevice = this.config.getDevice();
    const medias = this.dataService.getPhotoGalleryData();
    if (medias) {
      this.route.params.subscribe(params => {
        if (!params['id']) {
          this.router.navigate(['/stay']);
        }
        else {
          // this.categoryMedia = medias;
          this.categoryMedia = Object.entries(medias).map(([category, photos]) => ({ category, photos }));
          this.categoryMedia.unshift({category: "All Photos", photos: Object.values(medias).flat()});
          this.allMedias = []
        }
      });
      Fancybox.bind(this.elRef.nativeElement, '[data-fancybox="gallery"]', {
        // Custom options
      });
    } else {
      this.router.navigate(['/stay']);
    }
  }
  // onBeforeSlide = (detail: BeforeSlideDetail): void => {
  //   const { index, prevIndex } = detail;
  // };

  // onInit = (detail:any): void => {
  //   this.lightGallery = detail.instance;
  // };

  goBack() {
    this.location.back();
  }
}

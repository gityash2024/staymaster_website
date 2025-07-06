import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about-amenity-modal',
  templateUrl: './about-amenity-modal.component.html',
  styleUrls: ['./about-amenity-modal.component.scss'],
})
export class AboutAmenityModalComponent {
  // amenityCategories = [
  //   {
  //     title: 'Essentials',
  //     img: '../../../assets/images/air_conditioner.png',
  //     list: [
  //       'Pool',
  //       'Wifi',
  //       'Cleaning Services',
  //       'Air Conditioning',
  //       'Conceirge',
  //       'Power Backup',
  //     ],
  //   },
  //   {
  //     title: 'Housekeeping',
  //     img: '../../../assets/images/housekeeping2.png',
  //     list: [
  //       'Private Butler',
  //       'Cleaning Services',
  //       'Kitchen Access',
  //       'Luggage Drop Off',
  //     ],
  //   },
  //   {
  //     title: 'Safety',
  //     img: '../../../assets/images/safety.png',
  //     list: [
  //       'Smoke Alarm',
  //       'First Aid Kit',
  //       'Fire Alarm',
  //       'Fire Extinguisher',
  //       'Security Camera',
  //     ],
  //   },
  //   {
      
  //     list: [
  //       'Cooking Stove',
  //       'Microwave',
  //       'Toaster',
  //       'Induction Stove',
  //       'Oven',
  //       'Grinder',
  //       'Mixer',
  //       'Blender',
  //       'Coffee Machine',
  //       'Salt & Pepper',
  //       'Tea & Coffee',
  //       'Milk',
  //       'French Press',
  //       'Pots & Pans',
  //       'Cooking Oil',
  //       'Cups & Mugs',
  //       'Spoons, Forks & Knives',
  //       'Electric Kettle',
  //       'Mini Fridge',
  //       'Dishwasher',
  //       'Refrigerator',
  //       'Ice Bucket',
  //       'Cutting Board',
  //       'Water Bottles',
  //       'Cooker',
  //       'Wine Glasses',
  //       'Beer Mugs',
  //       'Alcohol Glasses',
  //       'Wine Opener',
  //     ],
  //   },
  //   {
  //     title: 'Rooms',
  //     img: '../../../assets/images/Air-Conditioner.png',
  //     list: [
  //       'Bed Linen',
  //       'Clothes Storage',
  //       'Hangers',
  //       'Iron',
  //       'Safe',
  //       'Curtains',
  //       'Darkening Curtains',
  //     ],
  //   },
  //   {
  //     title: 'Bathrooms',
  //     img: '../../../assets/images/bathrooms.png',
  //     list: [
  //       'Bath Linen',
  //       'Soap',
  //       'Shampoo',
  //       'Conditioner',
  //       'Moisturizer',
  //       'Cotton buds',
  //       'Hot Water',
  //       'Hair Dryer',
  //     ],
  //   },
  //   {
  //     title: 'Living & Dining',
  //     img: '../../../assets/images/living&dining.png',
  //     list: [
  //       'Sofas',
  //       'Chairs',
  //       'Dining Table',
  //       'Television',
  //       'Wifi',
  //       'Speakers',
  //     ],
  //   },
  //   {
  //     title: 'Pools',
  //     img: '../../../assets/images/poolgreen.png',
  //     list: ['Type', 'Sunbeds', 'Pool Towels', 'Floaters'],
  //   },
  //   {
  //     title: 'Accessibility',
  //     img: '../../../assets/images/accessibility.png',
  //     list: ['Ground Floor Rooms', 'Wheelchair Accessible', 'Elevator'],
  //   },
  //   {
  //     title: 'Baby & Kids',
  //     img: '../../../assets/images/baby&kids.png',
  //     list: [
  //       'High Chair',
  //       'Baby Cot',
  //       'Baby Monitor',
  //       'Safety Gates',
  //       'Table Corner Guards',
  //       'Floaters',
  //       'Toys',
  //     ],
  //   },
  // ];
  
  amenityCategories: { title: string, img: string, list: string[] }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AboutAmenityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public reqData: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.groupAmenitiesByCategory();
  }

  groupAmenitiesByCategory() {
    const groupedAmenities = this.reqData.data.amenitiesWithDescriptions.reduce((result: any, item: any) => {
      if (!result[item.category_name]) {
        result[item.category_name] = [];
      }
      result[item.category_name].push(item);
      return result;
    }, {});

    for (const category in groupedAmenities) {
      if (groupedAmenities.hasOwnProperty(category)) {
        const amenities = groupedAmenities[category];
        const amenityList = amenities.map((a:any) => a.name);
        // const icon = amenities[0].icon ? `../../../assets/images/${amenities[0].icon}` : `../../../assets/images/select.png}`;
        const icon = this.getIcon(category)
        this.amenityCategories.push({ title: category, img: icon, list: amenityList });
      }
    }
  }

  getIcon(category:any){
    var icon = "../../../assets/images/select.png"
    switch (category) {
      case "Essentials":
        icon = '../../../assets/images/air_conditioner.png'
        break;
      case "Housekeeping":
        icon = '../../../assets/images/housekeeping2.png'
        break;
      case "Safety":
        icon = '../../../assets/images/safety.png'
        break;
      case "Kitchen":
        icon = '../../../assets/images/kitchen.png'
        break;
      case "Rooms":
        icon = '../../../assets/images/air_conditioner.png'
        break;
      case "Bathrooms":
        icon = '../../../assets/images/bathrooms.png'
        break;
      case "Living and Dining":
        icon = '../../../assets/images/living&dining.png'
        break;
      case "Pool":
        icon = '../../../assets/images/poolgreen.png'
        break;
      case "Accessibility":
        icon = '../../../assets/images/accessibility.png'
        break;
      case "Baby & Kids":
        icon = '../../../assets/images/baby&kids.png'
        break;
    
      default:
        break;
    }

    return icon
  }
}

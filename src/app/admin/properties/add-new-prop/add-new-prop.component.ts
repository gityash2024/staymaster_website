import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { ViewEncapsulation } from '@angular/compiler';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-prop',
  templateUrl: './add-new-prop.component.html',
  styleUrls: ['./add-new-prop.component.scss']
})
export class AddNewPropComponent {
  myForm: FormGroup = this._fb.group({});
  masterData: any = [];
  amenities: any = [];
  clients: any = [];
  destinations: any = [];
  meals_menu_file: any;
  constructor(private _fb: FormBuilder, private cd: ChangeDetectorRef, private adminService: AdminService) { }


  dayNight: any = [
    { id: 1, name: 'Day' },
    { id: 2, name: 'Night' }
  ];
  typeOfPlace: any = [
    { id: 1, name: 'Villa' },
    { id: 2, name: 'Apartment' }
  ];
  locations: any = [];
  bedroomsArr: any = [
    { id: 1, name: '1 RK' },
    { id: 2, name: '1 BHK' },
    { id: 3, name: '2 BHK' },
    { id: 4, name: '3 BHK' },
    { id: 5, name: '4 BHK' },
    { id: 6, name: '5 BHK' },
    { id: 7, name: '6 BHK' },
    { id: 8, name: '7 BHK' },
    { id: 9, name: '8 BHK' },
    { id: 10, name: '9 BHK' },
    { id: 11, name: '10 BHK' },
  ];
  aminities: any = [
    { id: 1, name: 'Wifi' },
    { id: 3, name: 'AC' },
    { id: 4, name: 'Kitchen' },
    { id: 5, name: 'Dryer' },
    { id: 6, name: 'Washing Machine' },
    { id: 7, name: 'Iron' },
    { id: 10, name: 'Gardan' }
  ];

  Essentials: any = [];;

  Housekeeping = [
    { id: 0, Name: "Concierge" },
    { id: 1, Name: "Power Backup" },
    { id: 2, Name: "Housekeeping" },
    { id: 3, Name: "Private Butler" },
    { id: 4, Name: "Cleaning Services" },
    { id: 5, Name: "Kitchen Access" },
    { id: 6, Name: "Luggage Drop Off" },
  ];

  Safety = [
    { id: 0, Name: "Smoke Alarm" },
    { id: 1, Name: "First Aid Kit" },
    { id: 2, Name: "Fire Alarm" },
    { id: 3, Name: "Fire Extinguisher" },
    { id: 4, Name: "Security Camera" },
    { id: 5, Name: "Fire Ball" },
    { id: 6, Name: "Security Exit" },
  ];

  Kitchen = [
    { id: 0, Name: "Cooking Stove" },
    { id: 1, Name: "Microwave" },
    { id: 2, Name: "Toaster" },
    { id: 3, Name: "Induction Stove" },
    { id: 4, Name: "Oven" },
    { id: 5, Name: "Grinder" },
    { id: 6, Name: "Mixer" },
    { id: 7, Name: "Blender" },
    { id: 8, Name: "Coffee Machine" },
    { id: 9, Name: "Salt & Pepper" },
    { id: 10, Name: "Tea & Coffee" },
    { id: 11, Name: "Induction Stove" },
    { id: 12, Name: "Induction Stove" },
    { id: 13, Name: "Induction Stove" },
    { id: 14, Name: "Induction Stove" },
    { id: 15, Name: "Milk" },
    { id: 16, Name: "French Press" },
    { id: 17, Name: "Pots & Pans" },
    { id: 18, Name: "Cooking Oil" },
    { id: 19, Name: "Cups & Mugs" },
    { id: 20, Name: "Spoons, Forks & Knives" },
    { id: 21, Name: "Electric Kettle" },
    { id: 22, Name: "Mini Fridge" },
    { id: 23, Name: "Dishwasher" },
    { id: 24, Name: "Refrigerator" },
    { id: 25, Name: "Ice Bucket" },
    { id: 26, Name: "Cutting Board" },
    { id: 27, Name: "Water Bottles" },
    { id: 28, Name: "Cooker" },
    { id: 29, Name: "Wine Glasses" },
    { id: 30, Name: "Beer Mugs" },
    { id: 31, Name: "Alcohol Glasses" },
    { id: 32, Name: "Wine Opener" },
  ];

  Rooms = [
    { id: 0, Name: "Bed Linen" },
    { id: 1, Name: "Clothes Storage" },
    { id: 2, Name: "Hangers" },
    { id: 3, Name: "Iron" },
    { id: 4, Name: "Safe" },
    { id: 5, Name: "Curtains" },
    { id: 6, Name: "Darkening Curtains" },
  ];

  Bathroom = [
    { id: 0, Name: "Bath Linen" },
    { id: 1, Name: "Soap" },
    { id: 2, Name: "Shampoo" },
    { id: 3, Name: "Conditioner" },
    { id: 4, Name: "Moisturizer" },
    { id: 5, Name: "Cotton buds" },
    { id: 6, Name: "Hot Water" },
    { id: 7, Name: "Hair Dryer" },
  ];

  LivingAndDining = [
    { id: 0, Name: "Sofas" },
    { id: 1, Name: "Chairs" },
    { id: 2, Name: "Dining Table" },
    { id: 3, Name: "Television" },
    { id: 4, Name: "Wifi" },
    { id: 5, Name: "Speakers" },
  ];

  Pool = [
    { id: 0, Name: "Type" },
    { id: 1, Name: "Sunbeds" },
    { id: 2, Name: "Pool Towels" },
    { id: 3, Name: "Floaters" },
    { id: 4, Name: "Bar" },
    { id: 5, Name: "Life Guard" },
    { id: 6, Name: "Instructor" },
  ];

  Accessibility = [
    { id: 0, Name: "Ground Floor Rooms" },
    { id: 1, Name: "Wheelchair Accessible" },
    { id: 2, Name: "Elevator" },
    { id: 3, Name: "Brail Menu" },
    { id: 4, Name: "Blind Walkway" },
    { id: 5, Name: "Blind Spots" },
  ];

  BabyAndKids = [
    { id: 0, Name: "High Chair" },
    { id: 1, Name: "Baby Cot" },
    { id: 2, Name: "Baby Monitor" },
    { id: 3, Name: "Safety Gates" },
    { id: 4, Name: "Table Corner Guards" },
    { id: 5, Name: "Floaters" },
    { id: 6, Name: "Toys" },
  ];


  meals = [
    { id: 0, Name: "Vegiterian" },
    { id: 1, Name: "Non-Vegiterian" },
  ];
  cities = [
    { id: 0, name: "A" },
    { id: 1, name: "B" },
  ];
  states = [
    { id: 0, name: "A" },
    { id: 1, name: "B" },
  ];
  countries = [
    { id: 1, name: "India" }
  ];
  typeOfProperty: any = [];
  staffs: any = [];
  testDropdownData = [
    { id: 0, name: "A" },
    { id: 1, name: "B" },
    { id: 1, name: "C" },
  ];



  category: any = [
    { id: 1, name: 'Delux' },
    { id: 3, name: 'AC' },
    { id: 4, name: 'Super Delux' },
    { id: 5, name: 'Villa' },
    { id: 6, name: 'Washing Machine' },
    { id: 7, name: 'Garden' },
    { id: 10, name: 'Sea View' }
  ];
  features: any = [
    { id: 1, name: 'Pool' },
    { id: 3, name: 'Hot Tub' },
    { id: 4, name: 'Parking' },
    { id: 5, name: 'EV Charger' },
    { id: 6, name: 'BBQ Grill' },
    { id: 7, name: 'Breakfast' },
    { id: 8, name: 'Gym' },
    { id: 9, name: 'Smoking Allowed' },
    { id: 10, name: 'Gardan' }
  ];

  imageUploadCategory: any = [
    'Display Image',
    'Property Image',
    'Front Image',
    'Hall Image',
    'Bedroom Image',
    'Kitchen Image',
    'Garden Image',
    'Swiming Image',
    "Virtual Tour"
  ];



  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "../../../../assets/images/upload-image.png";

  ngOnInit(): void {
    this.loadMasterData();
    this.createForm();

  }

    // Function to trigger the file input dialog
    triggerFileInput() {
      const fileInput = document.getElementById('fileInput');
      console.log(fileInput)
      if (fileInput) {
        fileInput.click();
      }
    }

  loadMasterData() {
    this.adminService.settingsWithUsers().subscribe(settings => {
      this.masterData = settings;
      this.amenities = this.masterData['amenities'];
      this.clients = this.masterData['hosts'];
      this.locations = this.masterData['destinations'];
      this.typeOfProperty = this.masterData['property_types'];
      this.staffs = this.masterData['staffs'];

      /* this.Essentials = this.amenities?.Essentials;
      this.Housekeeping = this.amenities?.Housekeeping;
      this.Essentials.map((item:any) => { item.description = '', item.checked = false });
      this.Housekeeping.map((item:any) => { item.description = '', item.checked = false }); */
      // this.parseMasterData();

    });
  }

  parseMasterData() {
    setTimeout(() => {
      console.log(`this.Essentials`, this.Essentials);
      const essentialArray = this.Essentials.map((checkbox: any) => {
        return this._fb.group({
          name: new FormControl(checkbox.Name),
          value: new FormControl(false),
          description: new FormControl('')
        })
      });
      this.myForm.patchValue({
        amenitiesEssential: essentialArray
      });
    }, 400);
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getControl(cat: any): FormControl<any> {
    const control = this.myForm.get('propertyCategory')?.get(cat?.id.toString()) as FormControl<any>;
    return control
  }

  createForm() {
    const checkboxArray = this.category.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.name),
        value: new FormControl(false),
        description: new FormControl(""),
        id:new FormControl(checkbox.id)
      })
    });

    const clientArray = this.clients.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.name),
        value: new FormControl(false),
      })
    });
    const locationArray = this.locations.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.name),
        value: new FormControl(false),
      })
    });



    const HousekeepingArray = this.Housekeeping.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const safetyArray = this.Safety.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const kitechenArray = this.Kitchen.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const roomsArray = this.Rooms.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const bathroomArray = this.Bathroom.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const livingDinningArray = this.LivingAndDining.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const poolsArray = this.Pool.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const AccessibilityArray = this.Accessibility.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });

    const BabyKidsArray = this.BabyAndKids.map((checkbox: any) => {
      return this._fb.group({
        name: new FormControl(checkbox.Name),
        value: new FormControl(false),
        description: new FormControl('')
      })
    });




    this.myForm = this._fb.group({
      property_name: new FormControl(''),
      name: new FormControl(''),
      client_id: new FormControl(''),
      staymaster_select: new FormControl(''),
      internal_name: new FormControl(''),
      location_id: new FormControl(''),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(1),
      pin_code: new FormControl(''),
      property_type: new FormControl(''),
      featured_property: new FormControl(''),
      no_of_bedrooms: new FormControl(''),
      no_of_bathrooms: new FormControl(''),
      no_of_guests: new FormControl(''),
      no_of_extra_guests: new FormControl(''),
      maximum_capacity: new FormControl(''),
      property_features: new FormArray(checkboxArray),
      security_deposit_percentage: new FormControl(''),
      showSecurityDeposit: new FormControl(''),

      display_images: new FormArray([]),

      summary: new FormControl(),
      bedrooms_bath: new FormControl(),
      living_dining: new FormControl(),
      kitchen: new FormControl(),
      pool: new FormControl(),
      unique_highlights: new FormControl(),
      hospitality_service: new FormControl(),

      // amenitiesEssential: new FormArray([]),
      // amenitiesHousekeeping: new FormArray(HousekeepingArray),
      // amenitiesSafety: new FormArray(safetyArray),
      // amenitiesKitchen: new FormArray(kitechenArray),
      // amenitiesRoom: new FormArray(roomsArray),
      // amenitiesBathroom: new FormArray(bathroomArray),
      // amenitiesLivingDinning: new FormArray(livingDinningArray),
      // amenitiesLivingPools: new FormArray(poolsArray),
      // amenitiesAccessibility: new FormArray(AccessibilityArray),
      // amenitiesBabyKids: new FormArray(BabyKidsArray),

      latitude: new FormControl(''),
      longitude: new FormControl(''),
      location_Details: new FormControl(''),
      places_around: new FormControl(''),

      meals_available: new FormControl(''),
      meals_description: new FormControl(''),
      meals_menu: new FormControl(null),
      meals_types: new FormArray(clientArray),
      fixed_breakfast_fee: new FormControl(''),
      breakfast_fee: new FormControl(''),
      menu:new FormControl(),

      check_in: new FormControl(''),
      check_out: new FormControl(''),
      other_details: new FormControl(''),
      house_rules: new FormControl(''),
      cancellation_policies: new FormControl(''),

      reservation_executive: new FormControl(''),
      revenue_manager: new FormControl(''),
      hospitality_manager: new FormControl(''),
      general_manager: new FormControl(''),
    });
  }

  uploadFile(event: any, index: number) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (file.size <= 1024 * 1024) { // Check if file size is less than or equal to 1MB (1MB = 1024 * 1024 bytes)
        reader.readAsDataURL(file);

        // When file uploads set it to file formcontrol
        reader.onload = () => {
            this.imageUrl = reader.result;
            this.Photos.at(index).patchValue({
                file: file,
                filedata: reader.result
            });

            /*
            this.editFile = false;
            this.removeUpload = true; */
        }
        // ChangeDetectorRef since file is loading outside the zone
        this.cd.markForCheck();
    } else {
        // Handle file size exceeding 1MB
        alert("File size exceeds 1MB");
        // You can add any other logic or UI update here to notify the user
    }
}


uploadMenu(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    console.log(file);    
    this.meals_menu_file = file;
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    /* reader.onload = () => {
      this.imageUrl = reader.result;
      this.myForm.patchValue({
        menu: file,
      });
    }; */

    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
  } else {
    console.error("No file selected");
  }
}


  addFormControl(category: string) {
    if( this.Photos.length < 51){
      const newFormGroup = this._fb.group({
        file: new FormControl(),
        filedata:new FormControl(),
        display_image: new FormControl(''),
        categoryId: new FormControl(category + ' Image'),
        serialNo: new FormControl(''),
        title: new FormControl(''),
        description: new FormControl(''),
      });
  
      this.Photos.push(newFormGroup);
    }else{
      alert("Cannot add more than 50 images")
    }
 
  }

  get Photos() {
    return this.myForm.get('display_images') as FormArray;
  }

  get propertyCatogery() {
    return this.myForm.get('property_features') as FormArray;
  }

  get meals_types() {
    return this.myForm.get('meals_types') as FormArray;
  }


  get amenitiesEssential() {
    return this.myForm.get('amenitiesEssential') as FormArray;
  }
  get amenitiesHousekeeping() {
    return this.myForm.get('amenitiesHousekeeping') as FormArray;
  }
  get amenitiesSafety() {
    return this.myForm.get('amenitiesSafety') as FormArray;
  }
  get amenitiesKitchen() {
    return this.myForm.get('amenitiesKitchen') as FormArray;
  }
  get amenitiesRoom() {
    return this.myForm.get('amenitiesRoom') as FormArray;
  }
  get amenitiesBathroom() {
    return this.myForm.get('amenitiesBathroom') as FormArray;
  }
  get amenitiesLivingDinning() {
    return this.myForm.get('amenitiesLivingDinning') as FormArray;
  }
  get amenitiesLivingPools() {
    return this.myForm.get('amenitiesLivingPools') as FormArray;
  }
  get amenitiesAccessibility() {
    return this.myForm.get('amenitiesAccessibility') as FormArray;
  }
  get amenitiesBabyKids() {
    return this.myForm.get('amenitiesBabyKids') as FormArray;
  }

  removeFormControl(index: number) {
    this.Photos.removeAt(index);
  }


  submitForm() {
    const formValue = this.myForm.value;
    var amenitiesEssential = this.amenities.Essentials;
    const formData = new FormData();
    formData.append('listing_name', this.myForm.controls['name'].value);
    formData.append('internal_name', this.myForm.controls['internal_name'].value);
    formData.append('channel_id', '0');
    formData.append('host', this.myForm.controls['client_id'].value);
    formData.append('destination', this.myForm.controls['location_id'].value);
    formData.append('address_line1', this.myForm.controls['address_line1'].value);
    formData.append('address_line2', this.myForm.controls['address_line2'].value);
    formData.append('staymaster_select', this.myForm.controls['staymaster_select'].value);
    formData.append('city', this.myForm.controls['city'].value);
    formData.append('state', this.myForm.controls['state'].value);
    formData.append('country', this.myForm.controls['country'].value);
    formData.append('postcode', this.myForm.controls['pin_code'].value);
    formData.append('property_type', this.myForm.controls['property_type'].value);

    formData.append('no_of_bedrooms', this.myForm.controls['no_of_bedrooms'].value);
    formData.append('no_of_bathrooms', this.myForm.controls['no_of_bathrooms'].value);
    formData.append('no_of_guests', this.myForm.controls['no_of_guests'].value);
    formData.append('no_of_extra_guests', this.myForm.controls['no_of_extra_guests'].value);
    // maximum_capacity
    const indices = this.myForm.controls['property_features'].value.map((obj: { value: any; },index: number)=> obj.value ? index + 1 : -1).filter((index: number) => index != -1)
    formData.append('property_collections', JSON.stringify(indices)); // array
    // formData.append('property_features', this.myForm.controls['name'].value);
    formData.append('featured_property', this.myForm.controls['featured_property'].value ? '1':'0'  || "0" );
    formData.append('security_deposit_percentage', this.myForm.controls['security_deposit_percentage'].value);    
    
    formData.append('description_summary', this.myForm.controls['summary'].value);
    formData.append('description_bedrooms_and_bath', this.myForm.controls['bedrooms_bath'].value);
    formData.append('description_living_and_dining', this.myForm.controls['living_dining'].value);
    formData.append('description_kitchen_space', this.myForm.controls['kitchen'].value);
    formData.append('description_pool', this.myForm.controls['pool'].value);
    formData.append('description_unique_highlights', this.myForm.controls['unique_highlights'].value);
    formData.append('description_hospitality_service', this.myForm.controls['hospitality_service'].value);
        // Flatten the lists
        let flattenedList: any[] = [];
        for (const key in this.amenities) {
            if (this.amenities.hasOwnProperty(key)) {
                flattenedList.push(...this.amenities[key]);
            }
        }
        const keysToKeep = ['id', 'description'];
        let  newAminites = flattenedList.filter(obj => obj.checked) // Filter where checked is true
        .map(obj =>
            Object.fromEntries(Object.entries(obj).filter(([key]) => keysToKeep.includes(key)))
        )
        .map(obj => ({
            ...obj,
            Description: obj['description'],
            // Remove the 'age' property from the object
            description: undefined
        }));
    formData.append('amenities', JSON.stringify(newAminites));
    formData.append('google_latitude', this.myForm.controls['latitude'].value);
    formData.append('google_longitude', this.myForm.controls['longitude'].value);
    formData.append('places_around', this.myForm.controls['places_around'].value);
    formData.append('location_details', this.myForm.controls['location_Details'].value);
    formData.append('meals_available', this.myForm.controls['meals_available'].value);
    formData.append('meals_text', this.myForm.controls['meals_description'].value);
    // formData.append('meals_menu', this.myForm.controls['name'].value); // array of strings
    formData.append('meals_menu', this.meals_menu_file); // array of strings
    formData.append('breakfast_fee', this.myForm.controls['breakfast_fee'].value);
    formData.append('check_in', this.myForm.controls['check_in'].value);
    formData.append('check_out', this.myForm.controls['check_out'].value);
    formData.append('other_details', this.myForm.controls['other_details'].value);
    formData.append('house_rules', this.myForm.controls['house_rules'].value);
    formData.append('cancellation_policies', this.myForm.controls['cancellation_policies'].value);
    formData.append('reservation_executive', this.myForm.controls['reservation_executive'].value);
    formData.append('revenue_manager', this.myForm.controls['revenue_manager'].value);
    formData.append('hospitality_manager', this.myForm.controls['hospitality_manager'].value);
    formData.append('general_manager', this.myForm.controls['general_manager'].value);

    for(var photo of this.Photos.controls){
      let count = 1;
      if (photo.value.categoryId == "Display Image"){

        formData.append('display_image', photo.value.file); // display_image
        // formData.append('display_image_description', photo.value.description);
        // formData.append('display_image_title', photo.value.title);
        // formData.append('display_image_serialNo', photo.value.serialNo);
        // formData.append('display_image_category', photo.value.categoryId);


      }else if (["Property Image",'Front Image','Hall Image','Bedroom Image','Kitchen Image','Garden Image','Swiming Image'].includes(photo.value.categoryId) ){

        formData.append(`photo${count}`, photo.value.file); // photo
        formData.append(`photo${count}_description`, photo.value.description);
        formData.append(`photo${count}_title`, photo.value.title);
        formData.append(`photo${count}_serialNo`, photo.value.serialNo);
        formData.append(`photo${count}_category`, photo.value.categoryId);
        formData.append(`photo${count}_order`, count+'');

        count = count + 1
      
      }else if(['Virtual Tour'].includes(photo.value.categoryId)){
       
        formData.append('virtual_tour', photo.value.file); // virtual_tour
        // formData.append('virtual_tour_description', photo.value.description);
        // formData.append('virtual_tour_title', photo.value.title);
        // formData.append('virtual_tour_serialNo', photo.value.serialNo);
        // formData.append('virtual_tour_category', photo.value.categoryId);
      
      }
    }



    this.adminService.addProperties(formData).subscribe((res: any) => { 
      console.log(res)
    });


  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/http/api.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

Chart.register(DataLabelsPlugin);

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent {
  public barChartLegend = true;
  public barChartPlugins = [];
  mixedChartData: any;
  mixedChartOptions: any;
  public showChart = true;
  enquiryForm: FormGroup;
  formSubmitted = false;
  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  //   datasets: [
  //     {
  //       data: [], // Populate with your values
  //       label: 'Realistic Net Earnings Adjusted Against Seasonality',
  //       backgroundColor: 'rgba(0, 128, 0, 0.2)',
  //       borderColor: 'rgba(0, 128, 0, 1)',
  //       borderWidth: 1
  //     }
  //   ]
  // };

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       labels: {
  //         usePointStyle: false, // Change the box to a smaller circle
  //         font: {
  //           size: 14 // Adjust font size if needed
  //         }
  //       }
  //     },

  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //       color: '#00695c',
  //       font: {
  //         weight: 'bold'
  //       },
  //       formatter: function (value, context) {
  //         if (value >= 100000) {
  //           return `₹${(value / 100000).toFixed(3)}L`; // Show as Lakhs with 3 decimal points
  //         } else if (value >= 1000) {
  //           return `₹${(value / 1000).toFixed(3)}K`; // Show as Thousands with 3 decimal points
  //         } else {
  //           return `₹${value.toFixed(3)}`; // Show original value with 3 decimal points
  //         }
  //       }
  //     }
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false // Optionally hide x-axis grid lines
  //       }
  //     },
  //     y: {
  //       display: false // Hide the y-axis values
  //     }
  //   }
  // };

  // Register the DataLabels plugin
  headerName: string = 'transparant';
  userFormsSection: boolean = true;
  currentForm: string = 'aboutPropertyDetails';
  otpFirstNo: string = '';
  activeSlide: string = 'slide1';
  locationData: any = '';
  becomeHostForm: FormGroup;
  otp: string[] = ['', '', '', '', '', ''];
  getBarchartData: any = '';
  paramsData: any = '';
  propertyOptions: any = [

  ];
  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef



  ) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      propertyType: ['', Validators.required]
    });
    this.becomeHostForm = this.fb.group({
      location: ['', Validators.required],
      property_type: ['', Validators.required],
      bedrooms: ['', Validators.required],
      pool_type: ['', Validators.required],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^\d{6}$/),]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getLocationData();
    this.getFormSettings();
    this.route.queryParams.subscribe(params => {
      if (params && Object.keys(params).length > 0) {
        this.paramsData = params;
        this.apiService
          .httpPost('/ext/hostEnquiry', params)
          .subscribe((res: any) => {
            if (params) {
              if (res) {
                this.getBarchartData = res;
                this.updateChartData(res.rentals);
                this.userFormsSection = false;


              }
            }
          })
      }

    });
  }

  updateChartData(rentals: any) {
    const rentalValues: number[] = Object.values(rentals).map((value) => Number(value));
    const months = Object.keys(rentals).map(
      (month) => month.charAt(0).toUpperCase() + month.slice(1)
    );

    // Format value as 'L' for Lakhs and 'K' for Thousands
    const formatValue = (value: any) =>
      value >= 100000 ? `₹${(value / 100000).toFixed(1)}L` : `₹${(value / 1000).toFixed(1)}K`;

    // Find the maximum earning
    const maxEarning = Math.max(...rentalValues);
    const maxEarningIndex = rentalValues.indexOf(maxEarning);

    this.mixedChartData = {
      labels: months, // Months
      datasets: [
        {
          type: 'bar',
          label: 'Monthly Rentals',
          data: rentalValues, // Raw values for the bar chart
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)');
            gradient.addColorStop(1, 'rgba(75, 192, 192, 0.1)');
            return gradient;
          },
          borderWidth: 0,
          barPercentage: 0.6, // Control bar width
          // Don't display values on bar chart
          datalabels: {
            display: false, // Disable data labels for bar chart
          }
        },
        {
          type: 'line',
          label: 'Net Earnings',
          data: rentalValues, // Use raw values for the line chart
          borderColor: '#17a2b8', // Line color
          backgroundColor: 'transparent',
          tension: 0.4, // Smooth line
          borderWidth: 3,
          pointBackgroundColor: '#17a2b8',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: false,
          // Show formatted values on line chart (K or L)
          datalabels: {
            display: false,
            formatter: function (value: any) {
              return formatValue(value); // Display formatted values on the line chart (in 'K' or 'L')
            },
            color: '#17a2b8', // Line chart value color
            font: {
              size: 12,
              weight: 'bold',
            },
            anchor: 'end',
            align: 'top',
          },
        },
      ],
    };

    this.mixedChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Realistic Net Earnings Adjusted Against Seasonality', // Add the heading here
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333', // Title color
          padding: {
            top: 0,
            bottom: 10,
          },
          margin: {
            let: 0
          }
        },
        legend: {
          display: false, // Hide legend
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.raw;
              return formatValue(value); // Format values for tooltip
            },
          },
        },
        annotation: {
          annotations: {
            highEarningsLabel: {
              type: 'label',
              xValue: months[maxEarningIndex],
              yValue: maxEarning,
              content: [`High Earnings`, formatValue(maxEarning)],
              backgroundColor: '#1D9BF0',
              color: '#fff',
              borderRadius: 5,
              padding: 8,
              font: {
                size: 12,
              },
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Hide gridlines on x-axis
          },
          ticks: {
            color: '#666',
            font: {
              size: 14,
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value: any) {
              return formatValue(value); // Format y-axis values for tooltip
            },
            color: '#666',
            font: {
              size: 14,
            },
          },
          grid: {
            color: 'rgba(200, 200, 200, 0.2)',
          },
        },
      },
      layout: {
        // padding: {
        //   top: 20,
        //   right: 30,
        //   bottom: 20,
        //   left: 20,
        // },
      },
    };
  }







  showUserDetails() {
    if (this.becomeHostForm.controls['location'].valid &&
      this.becomeHostForm.controls['property_type'].valid &&
      this.becomeHostForm.controls['bedrooms'].valid &&
      this.becomeHostForm.controls['pool_type'].valid) {
      this.currentForm = 'userDetails';
    } else {
      // Mark all controls as touched to show validation errors
      this.becomeHostForm.controls['location'].markAsTouched();
      this.becomeHostForm.controls['property_type'].markAsTouched();
      this.becomeHostForm.controls['bedrooms'].markAsTouched();
      this.becomeHostForm.controls['pool_type'].markAsTouched();
    }
  }

  formatToReadableValue(value: number): string {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + 'Cr'; // Crores
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2) + 'L'; // Lakhs
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'; // Thousands
    }
    return value.toString(); // Below 1K remains as-is
  }
  submitUserDetails(form: any) {
    if (!form.controls['name'].valid || !form.controls['email'].valid || !form.controls['phone'].valid || !form.controls['otp'].valid) {
      form.controls['name'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['phone'].markAsTouched();
      form.controls['otp'].markAsTouched();

      return;
    }
    const guestToken = this.dataService.getWebToken();
    if (form.valid) {
      const payload: any = {
        location: form.value.location,
        property_type: form.value.property_type,
        bedrooms: form.value.bedrooms,
        pool_type: form.value.pool_type,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        otp: form.value.otp,
        guestToken: guestToken,
      };
      // this.apiService
      //   .httpPost('/ext/hostEnquiry', payload)
      //   .subscribe((res: any) => {
      //     if (res && res.rentals) {
      //       this.updateChartData(res.rentals);
      //     }
      //   });

      this.router.navigate(['/host'], { queryParams: payload });
      this.userFormsSection = false;

      this.currentForm = 'estimatedEarningsDetails';
      this.userFormsSection = false;
    }


  }


  scrollToElement($element: any): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  getLocationData() {
    this.apiService
      .httpPost('/ext/hostCalculatorSettings', {})
      .subscribe((res: any) => {
        if (res) {
          this.locationData = res;
        }
      });
  }
  getOtp(form: any) {
    if (!form.controls['name'].valid || !form.controls['email'].valid || !form.controls['phone'].valid) {
      form.controls['name'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['phone'].markAsTouched();
      return;
    }
    const payload: any = {};
    payload.guestToken = this.dataService.getWebToken()
    payload.phone = form.value.phone;
    this.apiService
      .httpPost('/ext/generateHostOTP', payload)
      .subscribe((res: any) => {
        if (res) {
          this.toastr.success('OTP has been sent to your phone. Please check your SMS.', '', {
            timeOut: 10000,
          });
          // this.autoFillOtp(res.otp);

        }
      });
  }

  onKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key >= '0' && event.key <= '9') {
      input.value = event.key;

      const otpElements = document.querySelectorAll('.sm-otp') as NodeListOf<HTMLInputElement>;

      let otpValue = '';
      otpElements.forEach((el) => otpValue += el.value);

      this.becomeHostForm.get('otp')?.setValue(otpValue);

      if (index < otpElements.length - 1) {
        otpElements[index + 1].focus();
      }
    } else if (event.key === 'Backspace') {
      input.value = '';

      const otpElements = document.querySelectorAll('.sm-otp') as NodeListOf<HTMLInputElement>;

      let otpValue = '';
      otpElements.forEach((el) => otpValue += el.value);
      this.becomeHostForm.get('otp')?.setValue(otpValue);

      if (index > 0) {
        otpElements[index - 1].focus();
      }
    }

    event.preventDefault();
  }
  editResult() {
    this.userFormsSection = true;
    this.currentForm = 'aboutPropertyDetails';
    this.router.navigate(['/host']);



  }
  getDisplayDetails() {
    const location = this.locationData.location?.find((loc: any) => loc.id.toString() === this.paramsData.location) || {};
    const propertyType = this.locationData.property_type?.find((prop: any) => prop.id.toString() === this.paramsData.property_type) || {};
    const bedroom = this.locationData.bedrooms?.find((bed: any) => bed.id.toString() === this.paramsData.bedrooms) || {};
    const poolType = this.locationData.pool_type?.find((pool: any) => pool.id.toString() === this.paramsData.pool_type) || {};

    return {
      locationName: location.name || 'Unknown Location',
      propertyTypeName: propertyType.name || 'Unknown Property Type',
      bedroomsName: bedroom.name || 'Unknown Bedrooms',
      poolTypeName: poolType.name || 'Unknown Pool Type',
    };
  }
  autoFillOtp(otp: any) {
    const otpString = String(otp); // Ensure otp is a string
    const otpElements = document.querySelectorAll('.sm-otp') as NodeListOf<HTMLInputElement>;

    if (otpString.length === otpElements.length) {
      otpString.split('').forEach((digit, index) => {
        otpElements[index].value = digit;
      });

      // Optionally, set the form control value for the full OTP
      this.becomeHostForm.get('otp')?.setValue(otpString);
    }
  }
  getFormSettings() {
    return this.apiService.httpGet('/ext/formSettings').subscribe((res: any) => {
      this.propertyOptions = res.property_types

      console.log(this.propertyOptions)
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Form Data:', form.value);
    this.formSubmitted = true;

    const payload = {
      form_type: 'host_page_form',
      name: form.value.name || '',
      email: form.value.email || '',
      phone: form.value.phone || '',
      property_type: form.value.propertyType || '',
    };

    if (form.valid) {
      this.apiService.httpPostForm('/ext/submitForm', payload, 'text').subscribe(
        () => {
          form.reset();
          this.formSubmitted = false;
          this.toastr.success(`Thank you for your enquiry, we will get in touch with you shortly`);

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

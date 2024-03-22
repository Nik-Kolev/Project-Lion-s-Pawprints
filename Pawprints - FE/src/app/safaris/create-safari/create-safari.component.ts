import { carouselAnimation } from './../../animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { SupabaseService } from '../../services/supabase.service';
import { SafariService } from '../../services/safari.service';

interface ImageUpdateParams {
  event: any;
  path: 'imageUrl' | 'imageDayUrl';
  dayId?: string;
}

@Component({
  selector: 'app-create-safari',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-safari.component.html',
  styleUrl: './create-safari.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
    ]),
    carouselAnimation,
  ],
})
export class CreateSafariComponent implements OnInit {
  safariForm!: FormGroup;
  currentDay!: number;
  imageUrl: string | ArrayBuffer = '../../../assets/safari/imagePreview.jpg';
  imageDayUrl: string | ArrayBuffer = '../../../assets/safari/imagePreview.jpg';
  dayImageUrls: { [key: string]: string | ArrayBuffer } = {};
  selectedHeaderImageFile: File | null = null;
  selectedDayImages: Array<File> | null = null;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private safariService: SafariService
  ) {
    this.safariForm = this.fb.group({
      safariTitle: '',
      headerImage: '',
      route: this.fb.array([]),
      period: this.fb.group({
        from: '',
        to: '',
      }),
      rates: this.fb.group({
        twoPeopleOneRoom: '',
        threePeopleTwoRooms: '',
        fourPeopleTwoRooms: '',
        fivePeopleThreeRooms: '',
        sixPeopleThreeRooms: '',
      }),
    });
  }

  get route(): FormArray {
    return this.safariForm.get('route') as FormArray;
  }

  addDay(): void {
    const dayId = `dayImage${this.route.controls.length}`;
    this.dayImageUrls[dayId] = '../../../assets/safari/imagePreview.jpg';

    const dayFormGroup = this.fb.group({
      day: [{ value: '', disabled: true }],
      dayTitle: '',
      description: '',
      mainDestination: '',
      accommodation: this.fb.group({
        name: '',
        type: '',
        location: '',
        link: '',
      }),
      mealsAndDrinks: this.fb.group({
        includedMeals: '',
        drinksIncluded: '',
      }),
      dayImage: '',
    });
    this.currentDay = this.route.controls.length;
    this.route.push(dayFormGroup);
  }

  removeDay(index: number): void {
    this.route.removeAt(index);
    this.currentDay = this.route.controls.length - 1;
  }

  onImagePreview({ event, path, dayId }: ImageUpdateParams): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (path === 'imageDayUrl' && dayId) {
          this.dayImageUrls[dayId] = e.target.result;
          this.selectedDayImages?.push(file);
        } else {
          this[path] = e.target.result;
          this.selectedHeaderImageFile = file;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.addDay();
  }

  onSubmit(): void {
    // if (this.selectedHeaderImageFile && this.selectedDayImages) {
    //   this.supabase
    //     .supabaseUploader(this.selectedHeaderImageFile, 'saf2')
    //     .subscribe({
    //       next: (url) => {
    // this.link = `success ${url}`;
    // },
    // error: (error) => {
    // this.link = `Error: ${error.message}`;
    //   },
    // });
    // console.log(this.link);
    // }
    this.safariService
      .uploadPrices(
        '65fbfd52a3ab118e35c8a652',
        this.safariForm.value.period,
        this.safariForm.value.rates
      )
      .subscribe({
        next: (x) => {
          console.log(x);
          console.log('Success');
        },
        error: (error) => {
          // console.log('asd');
          console.log(error);
        },
      });
    console.log(this.safariForm.value);
  }
}

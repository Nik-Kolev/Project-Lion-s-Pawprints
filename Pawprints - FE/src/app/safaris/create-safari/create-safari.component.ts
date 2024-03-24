import { Day } from './../../services/safari.service';
import { arrowAnimation, carouselAnimation } from './../../animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { SafariService } from '../../services/safari.service';
import { delay, forkJoin, of, switchMap, concatMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

interface ImageParams {
  event: any;
  type: 'headerImage' | 'dayImage';
  dayId?: number;
}

@Component({
  selector: 'app-create-safari',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-safari.component.html',
  styleUrl: './create-safari.component.scss',
  animations: [arrowAnimation, carouselAnimation],
})
export class CreateSafariComponent implements OnInit {
  safariForm!: FormGroup;
  currentDay!: number;

  headerSafariImage: string = '../../../assets/safari/imagePreview.jpg';
  selectedSafariImage!: File;
  daySafariImages: string[] = [];
  selectedDayImages: Array<File> = [];

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private safariService: SafariService,
    private toastService: ToastrService
  ) {
    this.safariForm = this.fb.group({
      safariTitle: '',
      safariImage: '',
      days: this.fb.array([]),
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

  get days(): FormArray {
    return this.safariForm.get('days') as FormArray;
  }

  addDay(): void {
    const dayFormGroup = this.fb.group({
      day: [{ value: '', disabled: true }],
      dayTitle: '',
      description: '',
      mainDestination: '',
      hotelName: '',
      hotelLink: '',
      hotelType: '',
      hotelLocation: '',
      includedMeals: '',
      includedDrinks: '',
      dayImage: '',
    });

    this.currentDay = this.days.controls.length;
    this.days.push(dayFormGroup);
  }

  removeDay(index: number): void {
    this.daySafariImages.splice(index, 1);
    this.selectedDayImages.splice(index, 1);
    this.days.removeAt(index);
    this.currentDay = this.days.controls.length - 1;
  }

  onImagePreview({ event, type, dayId }: ImageParams): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'dayImage' && dayId !== undefined) {
          this.daySafariImages[dayId] = e.target.result;
          this.selectedDayImages.push(file);
        } else {
          this.headerSafariImage = e.target.result;
          this.selectedSafariImage = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.addDay();
  }

  safariTag(title: string) {
    return title
      .split('-')
      .join('')
      .split(' ')
      .slice(0, 5)
      .map((x: string) => x[0])
      .join('');
  }

  onSubmit(): void {
    this.supabase
      .supabaseUploader(
        this.selectedSafariImage,
        this.safariTag(this.safariForm.value.safariTitle)
      )
      .pipe(
        switchMap((uploadSafariImage) => {
          this.safariForm.value.safariImage = uploadSafariImage;
          const uploadDayImages = this.selectedDayImages.map(
            (dayImageFile, index) =>
              of(dayImageFile).pipe(
                delay(1500),
                concatMap((file) =>
                  this.supabase.supabaseUploader(
                    file,
                    this.safariTag(this.safariForm.value.safariTitle)
                  )
                )
              )
          );
          return forkJoin(uploadDayImages).pipe(
            switchMap((response) => {
              response.forEach((uploadedImageUrl, i) => {
                this.safariForm.value.days[i].dayImage = uploadedImageUrl;
              });
              return this.safariService.createSafari(this.safariForm.value);
            })
          );
        })
      )
      .subscribe({
        next: () => this.toastService.success('Safari created.'),
        error: (err) => this.toastService.error(err),
      });
  }
}

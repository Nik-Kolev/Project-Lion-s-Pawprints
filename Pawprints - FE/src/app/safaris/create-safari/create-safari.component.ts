import { Day } from './../../services/safari.service';
import {
  arrowAnimation,
  carouselAnimation,
  displaySafari,
} from './../../animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { SafariService } from '../../services/safari.service';
import { delay, forkJoin, of, switchMap, concatMap, concat, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { positiveNumber } from '../../validators/positiveNumber';
import { ErrorsComponent } from '../../shared/errors/errors.component';
import { ActivatedRoute, Router } from '@angular/router';
import { scrollTo } from '../../shared/scrollTo';

interface ImageParams {
  event: any;
  type: 'headerImage' | 'dayImage';
  dayId?: number;
}

interface DayImageFile {
  dayIndex: number;
  file: File;
}

@Component({
  selector: 'app-create-safari',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorsComponent],
  templateUrl: './create-safari.component.html',
  styleUrl: './create-safari.component.scss',
  animations: [arrowAnimation, carouselAnimation, displaySafari],
})
export class CreateSafariComponent implements OnInit {
  @ViewChildren('dayElement') dayElements!: QueryList<ElementRef>;

  safariForm!: FormGroup;
  currentDay!: number;
  isEditMode: boolean = false;
  safariId: string | null = null;

  headerSafariImage: string = '../../../assets/safari/imagePreview.jpg';
  selectedSafariImage!: File;
  daySafariImages: string[] = [];
  selectedDayImages: DayImageFile[] = [];

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private safariService: SafariService,
    private toastService: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.safariForm = this.fb.group({
      safariTitle: [''],
      safariImage: [''],
      days: this.fb.array([]),
      period: this.fb.group({
        from: [''],
        to: [''],
      }),
      rates: this.fb.group({
        // twoPeopleOneRoom: ['', [Validators.required, positiveNumber()]],
        twoPeopleOneRoom: [''],
        threePeopleTwoRooms: [''],
        fourPeopleTwoRooms: [''],
        fivePeopleThreeRooms: [''],
        sixPeopleThreeRooms: [''],
      }),
    });
  }

  get days(): FormArray {
    return this.safariForm.get('days') as FormArray;
  }

  getDescriptions(dayIndex: number): FormArray {
    return this.days.at(dayIndex).get('descriptions') as FormArray;
  }

  addDay(): void {
    const dayFormGroup = this.fb.group({
      dayTitle: [''],
      descriptions: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ]),
      mainDestination: [''],
      hotelName: [''],
      hotelLink: [''],
      hotelType: [''],
      hotelLocation: [''],
      includedMeals: [''],
      includedDrinks: [''],
      dayImage: [''],
    });

    this.currentDay = this.days.controls.length;
    this.days.push(dayFormGroup);
    this.cd.detectChanges();
    if (this.currentDay == 0) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        scrollTo(this.currentDay, this.dayElements);
      }, 0);
    }
  }

  removeDay(index: number): void {
    this.daySafariImages.splice(index, 1);
    this.selectedDayImages.splice(index, 1);
    this.days.removeAt(index);
    this.currentDay = this.days.controls.length - 1;

    if (index > 0) {
      scrollTo(this.currentDay, this.dayElements);
    } else {
      scrollTo(0, this.dayElements);
    }
  }

  populateSafari(safariId: string) {
    this.safariService.fetchSafariById(safariId).subscribe({
      next: (safari) => {
        this.currentDay = safari.days.length - 1;
        this.safariForm.patchValue({
          safariTitle: safari.safariTitle,
          period: {
            from: safari.period.from,
            to: safari.period.to,
          },
          rates: {
            twoPeopleOneRoom: safari.rates.twoPeopleOneRoom,
            threePeopleTwoRooms: safari.rates.threePeopleTwoRooms,
            fourPeopleTwoRooms: safari.rates.fourPeopleTwoRooms,
            fivePeopleThreeRooms: safari.rates.fivePeopleThreeRooms,
            sixPeopleThreeRooms: safari.rates.sixPeopleThreeRooms,
          },
        });
        this.headerSafariImage = safari.safariImage;

        safari.days.forEach((day) => {
          const emptyDescriptionsNeeded = Math.max(
            0,
            4 - day.descriptions.length
          );
          const descriptions = day.descriptions.concat(
            Array(emptyDescriptionsNeeded).fill('')
          );
          const descriptionsFormArray = this.fb.array(
            descriptions.map((description) =>
              this.fb.control(description, Validators.required)
            )
          );
          const dayGroup = this.fb.group({
            dayTitle: day.dayTitle,
            descriptions: descriptionsFormArray,
            mainDestination: day.mainDestination,
            hotelName: day.hotelName,
            hotelLink: day.hotelLink,
            hotelType: day.hotelType,
            hotelLocation: day.hotelLocation,
            includedMeals: day.includedMeals,
            includedDrinks: day.includedDrinks,
            dayImage: [''],
          });
          this.daySafariImages.push(day.dayImage);
          this.days.push(dayGroup);
        });
      },
    });
  }

  onImagePreview({ event, type, dayId }: ImageParams): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'dayImage' && dayId !== undefined) {
          this.daySafariImages[dayId] = e.target.result;
          const existingIndex = this.selectedDayImages.findIndex(
            (image) => image.dayIndex == dayId
          );

          if (existingIndex > -1) {
            this.selectedDayImages[existingIndex].file = file;
          } else {
            this.selectedDayImages.push({ dayIndex: dayId, file });
          }
        } else {
          this.headerSafariImage = e.target.result;
          this.selectedSafariImage = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    // window.scrollTo({ top: 0 });
    this.safariId = this.activeRoute.snapshot.paramMap.get('safariId');
    if (this.safariId) {
      this.isEditMode = true;
      this.safariForm.reset();
      this.populateSafari(this.safariId);
    } else {
      this.addDay();
    }
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
    // if (!this.safariForm.invalid) {
    //   console.log(this.safariForm.value);
    //   return;
    // } else {
    console.log(this.safariForm.valid);
    const headerImage = this.selectedSafariImage
      ? this.supabase.supabaseUploader(
          this.selectedSafariImage,
          this.safariTag(this.safariForm.value.safariTitle)
        )
      : of(this.headerSafariImage);

    headerImage
      .pipe(
        switchMap((uploadSafariImage) => {
          this.safariForm.value.safariImage = uploadSafariImage;

          if (this.selectedDayImages.length > 0) {
            const uploadDayImages = this.selectedDayImages.map((dayImageFile) =>
              of(dayImageFile).pipe(
                delay(1500),
                concatMap((file) =>
                  this.supabase.supabaseUploader(
                    file.file,
                    this.safariTag(this.safariForm.value.safariTitle)
                  )
                )
              )
            );
            return forkJoin(uploadDayImages).pipe(
              switchMap((response) => {
                response.forEach((uploadedImageUrl, i) => {
                  const dayIndex = this.selectedDayImages[i].dayIndex;
                  this.safariForm.value.days[dayIndex].dayImage =
                    uploadedImageUrl;
                });
                return this.isEditMode
                  ? this.safariService.updateSafari(
                      this.safariId,
                      this.safariForm.value
                    )
                  : this.safariService.createSafari(this.safariForm.value);
              })
            );
          } else {
            return this.isEditMode
              ? this.safariService.updateSafari(
                  this.safariId,
                  this.safariForm.value
                )
              : this.safariService.createSafari(this.safariForm.value);
          }
        })
      )
      .subscribe({
        next: () => {
          if (this.isEditMode) {
            this.toastService.success('Safari successfully edited.');
          } else {
            this.toastService.success('Safari successfully created.');
          }
          this.router.navigate(['/catalogSafari']);
        },
        error: (err) => this.toastService.error(err),
      });
  }
}

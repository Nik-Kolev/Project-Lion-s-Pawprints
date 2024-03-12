import { carouselAnimation } from './../../../animations';
import { Slide } from './../slide.interface';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [carouselAnimation],
})
export class CarouselComponent implements OnInit {
  @Input() slides: Slide[] = [];
  @Input() autoPlay: boolean = true;
  currentSlide: number = 0;
  faArrowRight = faChevronRight;
  faArrowLeft = faChevronLeft;

  ngOnInit(): void {
    if (this.autoPlay) {
      setInterval(() => {
        this.nextImage();
      }, 5000);
    }
  }

  nextImage(): void {
    this.activateSlide(
      (this.currentSlide = (this.currentSlide + 1) % this.slides.length)
    );
  }

  previousImage(): void {
    this.activateSlide(
      (this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length)
    );
  }

  activateSlide(index: number): void {
    this.currentSlide = index;
  }
}

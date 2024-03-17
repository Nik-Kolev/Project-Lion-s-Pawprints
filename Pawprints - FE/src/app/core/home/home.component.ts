import { TopRatedComponent } from './top-rated/top-rated.component';
import { Slide } from './slide.interface';
import { CarouselComponent } from './carousel/carousel.component';
import { Component } from '@angular/core';
import { CtaComponent } from './cta/cta.component';
import { FeaturedComponent } from './featured/featured.component';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    CtaComponent,
    TopRatedComponent,
    FeaturedComponent,
    LatestBlogsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  slides: Slide[] = [
    {
      url: '../../../assets/carousel/ngorongoro.jpg',
      title: 'First Slide',
      description: 'Ngorongoro crater',
    },
    {
      url: '../../../assets/carousel/ngorongoro-crater.jpg',
      title: 'First Slide',
      description: 'Ngorongoro Crater',
    },
    {
      url: '../../../assets/carousel/serengeti.jpg',
      title: 'First Slide',
      description: 'Serengeti National Park',
    },
    {
      url: '../../../assets/carousel/tarangire.jpg',
      title: 'First Slide',
      description: 'Tarangire National Park',
    },
  ];
}

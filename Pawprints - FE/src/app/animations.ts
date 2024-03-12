import { trigger, transition, animate, style } from '@angular/animations';

export const carouselAnimation = trigger('carouselAnimation', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition('* => *', [animate('500ms', style({ opacity: 0 }))]),
]);

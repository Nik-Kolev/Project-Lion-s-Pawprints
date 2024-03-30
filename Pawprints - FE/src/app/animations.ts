import { trigger, transition, animate, style } from '@angular/animations';

export const carouselAnimation = trigger('carouselAnimation', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition('* => *', [animate('500ms', style({ opacity: 0 }))]),
]);

export const arrowAnimation = trigger('arrowAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
]);

export const displaySafari = trigger('displaySafari', [
  transition('* => *', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('300ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition('* => *', [
    animate(
      '300ms ease-in-out',
      style({ opacity: 0, transform: 'scale(0.9)' })
    ),
  ]),
]);

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceContent',
  standalone: true,
})
export class SliceContentPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').reverse().slice(3).reverse().join(' ');
  }
}

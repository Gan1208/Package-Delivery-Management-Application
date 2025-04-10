import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
  standalone: true
})
export class WeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value ?`${value * 1000}g`: "";
  }

}

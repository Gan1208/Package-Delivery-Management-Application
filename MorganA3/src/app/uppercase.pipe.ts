import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase',
  standalone: true
})
export class UppercasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value ? value.toUpperCase(): "";
  }

}

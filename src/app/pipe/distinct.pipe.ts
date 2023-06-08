import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinct'
})
export class DistinctPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    console.log(value)
    if (value && value.length > 0) {
      return value.filter((item, index) => value.indexOf(item) === index);
    }
    return value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(values: any[] | null | undefined, prop: string): any[] {
    if (values===null || values===undefined || values[0]===undefined || values[0]===null) {
      return []
    }
    if (typeof values[0][prop]==='number') {
      return values.sort((a,b) => {
        if (a[prop] < b[prop])
          return -1;
        if (a[prop] > b[prop])
          return 1;
        return 0;
      })
    }
    if (typeof values[0][prop]==='string') {
      return values.sort((a,b) => {
        if (a[prop].toUpperCase() < b[prop].toUpperCase())
        return -1;
      if (a[prop].toUpperCase() > b[prop].toUpperCase())
        return 1;
      return 0;
      })
    }
    return values
  }

}

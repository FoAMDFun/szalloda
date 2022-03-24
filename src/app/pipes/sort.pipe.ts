import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(values: readonly any[] | null | undefined, props: any): any[] {
    if (values===null || values===undefined || values[0]===undefined || values[0]===null) {
      return []
    }
    this.saveValues(values)
    if (typeof this.values[0][props]==='number') {
      return this.values.sort((a,b) => {
        if (a[props] < b[props])
          return -1;
        if (a[props] > b[props])
          return 1;
        return 0;
      })
    }else{
      return this.values
    }
  }
  private values:any[] = []
  private saveValues(values: readonly any[]){
    for (let i=0; i<values.length; i++){
      this.values.push(values[i]);
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(data: any, searchCol: string, searchValue: string): any {
    if(!data || !searchCol || !searchValue){
      return data;
    }
    return data.filter(data => data[searchCol].toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], itemsPerPage, page:number): any[] {
    if (page == null){
      page = 1
    }
    return [...value.slice(itemsPerPage * (page - +1), itemsPerPage * (page))];
  }

}

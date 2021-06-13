import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountPagesTable'
})
export class AmountPagesTablePipe implements PipeTransform {

  transform(actualPage:any[], data:any[], itemPerPage:any ): any[] {
    let totalPage = Math.floor(data.length/itemPerPage)+1
    return Array(totalPage).fill(0).map((x,i)=>i);
  }

}

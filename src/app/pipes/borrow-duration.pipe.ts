import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'borrowDuration'
})
export class BorrowDurationPipe implements PipeTransform {

  transform(from: Date | string, to: Date | string): string {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return 'Invalid dates';

    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }
}

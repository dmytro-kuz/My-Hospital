import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from './interfaces/doctor';

@Pipe({
  name: 'filterId',
})

export class FilterIdPipe implements PipeTransform {
  transform(doctors: Doctor[], id?: string): any {  
    if (id !== undefined) {
      return doctors.filter((doctor) => doctor._id == id);
    }
    else {
      return doctors
    }
  }
}

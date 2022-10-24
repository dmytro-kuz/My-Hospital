import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Doctor } from '../interfaces/doctor';
import { DoctorServiceService } from '../services/doctor-service.service';
@Component({
  selector: 'app-doctor-cards',
  templateUrl: './doctor-cards.component.html',
  styleUrls: ['./doctor-cards.component.scss'],
})
export class DoctorCardsComponent implements OnInit {
  constructor(private doctorService: DoctorServiceService) {}
  showLimit: any;
  slice: number = 8;
  isMoreDoctors?: boolean;

  doctorsList$: Observable<Doctor[]> = this.doctorService.doctorList$;

  ngOnInit(){ 
    this.doctorService.doctorsListLocal.value.length < 8 ? this.isMoreDoctors = false : this.isMoreDoctors = true;
  }

  getPlaceholder(): string {
    return '../../assets/def-img.jpg';
  }

  showMore(data: any) {
    console.log(data);
    
    this.doctorsList$
      .pipe(tap((doctors) => (this.showLimit = doctors.length)))
      .subscribe();
    this.slice += 4;
    if (this.slice >= this.showLimit) {
      this.isMoreDoctors = true;
    }
  }
}

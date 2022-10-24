import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Doctor } from '../interfaces/doctor';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorServiceService {
  route: string = 'doctors';
  tempDoctorList: any;
  searchDoctorListUnfilter?: any;

  doctorListFromDB$: Observable<Doctor[]> = this.getAllDoctors().pipe(
    tap((doctors) => {
      if (doctors.length) {
        this.doctorsListLocal.next(doctors);
      }
    })
  );

  doctorsListLocal: BehaviorSubject<Doctor[]> = new BehaviorSubject(
    [] as Doctor[]
  );

  doctorList$ = this.doctorsListLocal
    .asObservable()
    .pipe(
      switchMap((data) =>
        data.length ? this.doctorsListLocal : this.doctorListFromDB$
      )
    );

  constructor(private api: Api, private location: Location, private modalService: NgbModal) {}

  addNewDoctor(newDoctor: Doctor) {
    const tempValue = this.api.postApi(
      newDoctor,
      this.route
    ) as Observable<Doctor>;
    return tempValue.pipe(
      tap((doctor) => {
        this.doctorsListLocal.next([doctor, ...this.doctorsListLocal.value]);
      })
    );
  }

  getAllDoctors() {
    return this.api.getApi(this.route);
  }

  deleteDoctorById(id?: string): Observable<Doctor> {
    const tempValue = this.api.deleteApi(this.route, id) as Observable<Doctor>;
    return tempValue.pipe(
      tap((doctorId: any) =>
        this.doctorsListLocal.next(
          this.doctorsListLocal.value.filter((doc) => doc._id !== doctorId)
        )
      )
    );
  }

  editDoctorById(editDoctorForm: Doctor, id: string){
    const tempValue = this.api.putApi(editDoctorForm, id, this.route) as Observable<Doctor>;
    return tempValue.pipe(
      tap((editedDoctor) => {
        const appIndex = this.doctorsListLocal.value.findIndex((el) => el._id === editedDoctor._id)
        this.doctorsListLocal.value.splice(appIndex, 1, editedDoctor)
      })
    );
  }

  searchDoctor(searchString: string): any {
    if(this.searchDoctorListUnfilter == undefined){
      this.searchDoctorListUnfilter = this.doctorsListLocal.value
    }
    if(searchString == null || !searchString.length){
      return  this.doctorsListLocal.next(this.searchDoctorListUnfilter);
    }
    else{
      this.doctorsListLocal.next(this.doctorsListLocal.value.filter((doc:any) => doc.fullName.match(new RegExp(searchString, 'gi'))))
    }
  }

  openModal(content: any) {
    return this.modalService.open(content);
  }

}
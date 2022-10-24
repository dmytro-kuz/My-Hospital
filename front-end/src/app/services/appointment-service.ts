import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap } from 'rxjs';

import { Appointment } from '../interfaces/appointments';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  route: string = 'appointments';

  constructor(private api: Api) {}

  appointmentListDB$: Observable<Appointment[]> =
    this.getAllAppointments().pipe(
      tap((appointments) => {
        if (appointments.length) {
          this.appointmentListLocal.next(appointments);
        }
      })
    );

  appointmentListLocal: BehaviorSubject<Appointment[]> = new BehaviorSubject(
    [] as Appointment[]
  );

  appointmentList$ = this.appointmentListLocal
    .asObservable()
    .pipe(
      switchMap((data) =>
        data.length ? this.appointmentListLocal : this.appointmentListDB$
      )
    );

  addNewAppointment(newAppointment: Appointment) {
    const tempValue = this.api.postApi(
      newAppointment,
      this.route
    ) as Observable<Appointment>;
    this.appointmentList$
    return tempValue.pipe(
      tap((appointment) => {
        this.appointmentListLocal.next([
          ...this.appointmentListLocal.value,
          appointment,
        ]);
      })
    );
  }

  getAllAppointments() {
    return this.api.getApi(this.route);
  }

  deleteAppointmentById(id?: string): Observable<Appointment> {
    const tempValue = this.api.deleteApi(
      this.route,
      id
    ) as Observable<Appointment>;
    return tempValue.pipe(tap((appointmentId: any) => this.appointmentListLocal.next(
          this.appointmentListLocal.value.filter((app) => app._id == appointmentId.appId))
          ))
  }

  updateAppointment(updateApp: Appointment, id?: string){
    const tempValue = this.api.putApi(updateApp, id, this.route) as Observable<Appointment>;
    return tempValue.pipe(
      tap((appointment) => {
        const appIndex = this.appointmentListLocal.value.findIndex((el) => el._doc._id === appointment._doc._id)
        this.appointmentListLocal.value.splice(appIndex, 1, appointment)
      })
    );
  }

}

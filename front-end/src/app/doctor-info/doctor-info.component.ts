import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../interfaces/doctor';
import { DoctorServiceService } from '../services/doctor-service.service';
import { Observable, switchMap, withLatestFrom, delay, tap, subscribeOn } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../services/appointment-service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.scss'],
})
export class DoctorInfoComponent implements OnInit {
  myPatientForm?: FormGroup;
  showAlert: boolean = false;
  newPatientForm?: any;
  id?: string;
  doctorsList$: Observable<Doctor[]> = this.doctorService.doctorList$;
  currentDoctor: Doctor | undefined;
  updateApp: boolean = false;
  appId?: string

  constructor(
    private doctorService: DoctorServiceService,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myPatientForm = this.fb.group({
      doctor_id:[''],
      doctorFullName: ['', Validators.required],
      patientFullName: ['', [Validators.required, Validators.pattern(/[A-Z]{1}[a-zA-Z]{2,}\s{1}[A-Z]{1}[a-zA-Z]{2,}$/)]],
      problem: ['', [Validators.required, Validators.minLength(8)]],
      date: ['', Validators.required],
      done: [false],
    });

    this.listenToDoctorFullName();
    this.showNameOnInit();
    this.appointmentLocalFormUpdate();
  }

  showNameOnInit() {
    this.route.queryParams
      .pipe(withLatestFrom(this.doctorService.doctorsListLocal))
      .subscribe(([data, doctorsList]) => {
        this.id = data['id'];
        this.myPatientForm?.patchValue({
          doctorFullName:
            doctorsList.find((d) => d._id === data['id']) ? doctorsList.find((d) => d._id === data['id'])?.fullName : "Choose Doctor"
        });
      })
    }

  showSuccesAlert() {
    this.showAlert = !this.showAlert;
    setTimeout(() => {
      this.showAlert = !this.showAlert;
    }, 4000);
  }

  private listenToDoctorFullName() {
    this.myPatientForm
      ?.get('doctorFullName')
      ?.valueChanges.pipe(switchMap(() => this.doctorService.doctorsListLocal))
      .subscribe((doctors) => {
        this.currentDoctor = doctors.find(
          (doctor) =>
            doctor.fullName === this.myPatientForm?.get('doctorFullName')?.value
        );
      });
  }

  getIdToApp(id:any){
    this.myPatientForm?.patchValue({
      doctor_id: id
    })
  }

  appointmentLocalFormUpdate(){
    this.route.queryParams.pipe(withLatestFrom(this.appointmentService.appointmentListLocal)).subscribe(([params, appointmentListLocal]) => {
     if(params['app_id']) {
      this.updateApp = true;
      this.appId = params['app_id'];
      const tempWay = appointmentListLocal.find(app => app._doc._id === params['app_id'])?._doc;

      this.myPatientForm?.patchValue({
        patientFullName: tempWay?.patientFullName,
        problem: tempWay?.problem, 
        date: tempWay?.date
      })
     }
    })
 
  }

  onSubmit(form: FormGroup) {
    this.newPatientForm = form.value;
    
   if (this.updateApp){
    this.appointmentService.updateAppointment(form.value, this.appId).subscribe()
    this.updateApp = false;
   }
   else{
    this.appointmentService.addNewAppointment(form.value).subscribe()
   }
    form.reset();
    this.showSuccesAlert();
    this.myPatientForm?.patchValue({doctorFullName: "Choose Doctor"});
  }

  getPlaceholder() {
    return '../../assets/def-img.jpg';
  }
  
}

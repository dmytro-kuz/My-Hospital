import { Component, OnInit } from '@angular/core';
import { Appointment } from '../interfaces/appointments';
import { AppointmentService } from '../services/appointment-service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss'],
})
export class AppointmentInfoComponent implements OnInit {
  appointmentList$: Observable<Appointment[]> =
    this.appointmentService.appointmentList$;
  appointmentForm?: FormGroup;
  showAlert: boolean = false;
  switchEdit: number[] = [];
  switchEditRadio: number[] = [];


  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('appList', this.appointmentList$);
    
    if(this.appointmentService.appointmentListLocal.value.length <=1){
      this.appointmentService.appointmentListDB$
    }
    this.appointmentForm = this.formBuilder.group({
      done: [false],
      treatmentReview: []
    });
  }

  deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointmentById(id).subscribe();
  }

  getPlaceholder(): string {
    return '../../assets/def-img.jpg';
  }

  open(content: any) {
    return this.modalService.open(content);
  }

  onSubmit(form: any, id: string, indexApp: number) {
    if(form.value){
      this.appointmentService
      .updateAppointment(form.value, id)
      .subscribe()
      this.showAlert = !this.showAlert;
      setTimeout(() => {
        this.showAlert = false;
      }, 4000);
      form.reset();
    }
    this.switchEdit.splice(this.switchEdit.indexOf(indexApp), 1)
    this.switchEditRadio.splice(this.switchEditRadio.indexOf(indexApp), 1)
  }

  addEdit(indexApp: number){
    this.switchEdit.push(indexApp)
  }

  showEdit(indexApp: number){
    return this.switchEdit.every(apps => apps !== indexApp)
  }

  addEditDone(indexApp: number){
    this.switchEditRadio.push(indexApp)
  }

  showEditDone(indexApp: number){
    return this.switchEditRadio.every(apps => apps !== indexApp)
  }
  
}



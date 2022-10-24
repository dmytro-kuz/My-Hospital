 import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Doctor } from '../interfaces/doctor';
import { Specialization } from '../enum-specializations';
import { DoctorServiceService } from '../services/doctor-service.service'; 

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {
  
  @Input() doctor?: Doctor;
  constructor(private fb: FormBuilder, private doctorService: DoctorServiceService) { }
  myForm?: FormGroup;
  specialization = Specialization;
  chosenDoctor?: Doctor;


  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [],
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Z]{1}[a-zA-Z]{2,}\s{1}[A-Z]{1}[a-zA-Z]{2,}$/),
        ],
      ],
      specialization: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      img: [''],
    });
  }

  deleteDoctorById(id?: string) {
    this.doctorService.deleteDoctorById(id).subscribe()
  }

  editDoctorById(content: any, doctor: Doctor){
    this.myForm?.patchValue({
      id: doctor._id,
      fullName: doctor.fullName,
      specialization: doctor.specialization, 
      description: doctor.description,
      img: doctor.img
    })
    this.doctorService.openModal(content);
  }

  onSubmit(form: any){
    this.doctorService.editDoctorById(form.value, form.value.id).subscribe()
  }

  open(modalConfirm: any) {
    this.doctorService.openModal(modalConfirm)
  }

  getPlaceholder() : string {
    return '../../assets/def-img.jpg'
  } 
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Specialization } from '../enum-specializations';
import { DoctorServiceService } from '../services/doctor-service.service';

@Component({
  selector: 'app-app-modal-window',
  templateUrl: './app-modal-window.component.html',
  styleUrls: ['./app-modal-window.component.scss'],
})
export class AppModalWindowComponent implements OnInit {
  specialization = Specialization;
  myForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorServiceService
  ) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Z]{1}[a-zA-Z]{2,}\s{1}[A-Z]{1}[a-zA-Z]{2,}$/),
        ],
      ],
      specialization: ['Choose specialization', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      img: [''],
    });
  }

  openModal(content: any): void {
    this.doctorService.openModal(content);
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.doctorService
        .addNewDoctor(form.value)
        .subscribe((e: any) => console.log(e));
    }
    form.reset();
  }
}

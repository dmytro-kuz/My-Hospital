import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorServiceService } from './services/doctor-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchForm?: FormGroup;
  isSearch: boolean = false;
  href?:boolean = false;

  constructor(private formBuilder: FormBuilder, private doctorService: DoctorServiceService, private router: Router){}
  title = 'County Hospital';

  ngOnInit(): void {     
    this.checkHref()   
    this.searchForm = this.formBuilder.group({
      search: ['']
    })
  }
  checkHref(){
    window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1] === 'doctor-list' ? this.href = true : this.href = false;
  }

  onSubmit(form: FormGroup){
    this.doctorService.searchDoctor(form.value.search);
    this.isSearch = true;
    form.reset()
  }
  clearSearch(){
    this.doctorService.searchDoctor('')
  }
}

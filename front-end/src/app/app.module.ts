import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorCardsComponent } from './doctor-cards/doctor-cards.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { AppModalWindowComponent } from './app-modal-window/app-modal-window.component';
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterIdPipe } from './filter-id.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AppointmensInfoComponent } from './appointmens-info/appointmens-info.component';
import { AppointmentInfoComponent } from './appointment-info/appointment-info.component';
import { NothingFindComponent } from './nothing-find/nothing-find.component';
import { NgbdCarouselPause } from './carusel/carusel-pause';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DoctorCardsComponent,
    DoctorCardComponent,
    AppModalWindowComponent,
    DoctorInfoComponent,
    FilterIdPipe,
    AppointmensInfoComponent,
    AppointmentInfoComponent,
    NothingFindComponent,
    NgbdCarouselPause
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    HttpClientModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

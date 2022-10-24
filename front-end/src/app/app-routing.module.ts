import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorCardsComponent } from './doctor-cards/doctor-cards.component';
import { AppointmensInfoComponent } from './appointmens-info/appointmens-info.component';
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
// import { NothingFindComponent } from './nothing-find/nothing-find.component';

const routes: Routes = [
  { path: '', redirectTo: '/doctor-list', pathMatch: 'full' },
  { path: 'doctor-list', component: DoctorCardsComponent },
  { path: 'doctor-info', component: DoctorInfoComponent },
  { path: 'appointments-info', component: AppointmensInfoComponent },
  // { path: 'nothing-find', component: NothingFindComponent }
  // { path: '**', pathMatch:'full', redirectTo:'toast'},
  
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

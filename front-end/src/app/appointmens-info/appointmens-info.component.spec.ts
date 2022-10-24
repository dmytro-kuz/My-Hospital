import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmensInfoComponent } from './appointmens-info.component';

describe('AppointmensInfoComponent', () => {
  let component: AppointmensInfoComponent;
  let fixture: ComponentFixture<AppointmensInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmensInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmensInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalWindowComponent } from './app-modal-window.component';

describe('AppModalWindowComponent', () => {
  let component: AppModalWindowComponent;
  let fixture: ComponentFixture<AppModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingFindComponent } from './nothing-find.component';

describe('NothingFindComponent', () => {
  let component: NothingFindComponent;
  let fixture: ComponentFixture<NothingFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NothingFindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NothingFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

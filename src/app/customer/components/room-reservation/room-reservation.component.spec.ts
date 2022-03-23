import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationComponent } from './room-reservation.component';

describe('RoomReservationComponent', () => {
  let component: RoomReservationComponent;
  let fixture: ComponentFixture<RoomReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

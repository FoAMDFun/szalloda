import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMirrorComponent } from './room-mirror.component';

describe('RoomMirrorComponent', () => {
  let component: RoomMirrorComponent;
  let fixture: ComponentFixture<RoomMirrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomMirrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomMirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

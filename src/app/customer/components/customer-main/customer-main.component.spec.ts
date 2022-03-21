import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainComponent } from './customer-main.component';

describe('MainComponent', () => {
  let component: CustomerMainComponent;
  let fixture: ComponentFixture<CustomerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

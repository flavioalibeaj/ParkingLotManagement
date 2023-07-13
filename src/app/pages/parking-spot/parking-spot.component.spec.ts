import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpotComponent } from './parking-spot.component';

describe('ParkingSpotComponent', () => {
  let component: ParkingSpotComponent;
  let fixture: ComponentFixture<ParkingSpotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpotComponent]
    });
    fixture = TestBed.createComponent(ParkingSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

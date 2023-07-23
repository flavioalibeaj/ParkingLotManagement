import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlanComponent } from './single-plan.component';

describe('SinglePlanComponent', () => {
  let component: SinglePlanComponent;
  let fixture: ComponentFixture<SinglePlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePlanComponent]
    });
    fixture = TestBed.createComponent(SinglePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

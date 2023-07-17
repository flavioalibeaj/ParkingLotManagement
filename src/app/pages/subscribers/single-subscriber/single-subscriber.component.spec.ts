import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSubscriberComponent } from './single-subscriber.component';

describe('SingleSubscriberComponent', () => {
  let component: SingleSubscriberComponent;
  let fixture: ComponentFixture<SingleSubscriberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleSubscriberComponent]
    });
    fixture = TestBed.createComponent(SingleSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

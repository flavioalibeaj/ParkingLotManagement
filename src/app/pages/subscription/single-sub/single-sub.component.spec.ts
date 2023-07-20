import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSubComponent } from './single-sub.component';

describe('SingleSubComponent', () => {
  let component: SingleSubComponent;
  let fixture: ComponentFixture<SingleSubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleSubComponent]
    });
    fixture = TestBed.createComponent(SingleSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

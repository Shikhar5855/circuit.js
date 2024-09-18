import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatePropertyComponent } from './gate-property.component';

describe('GatePropertyComponent', () => {
  let component: GatePropertyComponent;
  let fixture: ComponentFixture<GatePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatePropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GatePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

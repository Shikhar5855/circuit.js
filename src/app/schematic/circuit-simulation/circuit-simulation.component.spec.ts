import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitSimulationComponent } from './circuit-simulation.component';

describe('CircuitSimulationComponent', () => {
  let component: CircuitSimulationComponent;
  let fixture: ComponentFixture<CircuitSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitSimulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

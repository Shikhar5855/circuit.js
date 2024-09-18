import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltagePropertyComponent } from './voltage-property.component';

describe('VoltagePropertyComponent', () => {
  let component: VoltagePropertyComponent;
  let fixture: ComponentFixture<VoltagePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoltagePropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VoltagePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

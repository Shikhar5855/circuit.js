import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitorPropertyComponent } from './capacitor-property.component';

describe('CapacitorPropertyComponent', () => {
  let component: CapacitorPropertyComponent;
  let fixture: ComponentFixture<CapacitorPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitorPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CapacitorPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

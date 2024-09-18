import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmosPropertyComponent } from './pmos-property.component';

describe('PmosPropertyComponent', () => {
  let component: PmosPropertyComponent;
  let fixture: ComponentFixture<PmosPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmosPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PmosPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

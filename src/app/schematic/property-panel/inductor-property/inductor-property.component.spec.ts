import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InductorPropertyComponent } from './inductor-property.component';

describe('InductorPropertyComponent', () => {
  let component: InductorPropertyComponent;
  let fixture: ComponentFixture<InductorPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InductorPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InductorPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

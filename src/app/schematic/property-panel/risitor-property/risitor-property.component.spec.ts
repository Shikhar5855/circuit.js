import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisitorPropertyComponent } from './risitor-property.component';

describe('RisitorPropertyComponent', () => {
  let component: RisitorPropertyComponent;
  let fixture: ComponentFixture<RisitorPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisitorPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RisitorPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirePropertyComponent } from './wire-property.component';

describe('WirePropertyComponent', () => {
  let component: WirePropertyComponent;
  let fixture: ComponentFixture<WirePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WirePropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WirePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

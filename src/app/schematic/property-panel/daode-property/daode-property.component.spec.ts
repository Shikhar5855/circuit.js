import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaodePropertyComponent } from './daode-property.component';

describe('DaodePropertyComponent', () => {
  let component: DaodePropertyComponent;
  let fixture: ComponentFixture<DaodePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaodePropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaodePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

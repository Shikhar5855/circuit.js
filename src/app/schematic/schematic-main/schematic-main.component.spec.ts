import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicMainComponent } from './schematic-main.component';

describe('SchematicMainComponent', () => {
  let component: SchematicMainComponent;
  let fixture: ComponentFixture<SchematicMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchematicMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchematicMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaFormsComponent } from './dyna-forms.component';

describe('DynaFormsComponent', () => {
  let component: DynaFormsComponent;
  let fixture: ComponentFixture<DynaFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynaFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynaFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

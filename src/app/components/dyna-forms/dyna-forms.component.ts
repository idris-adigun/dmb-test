import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatFormFieldModule,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ObserversModule } from '@angular/cdk/observers';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-dyna-forms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ObserversModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
  ],
  templateUrl: './dyna-forms.component.html',
  styleUrl: './dyna-forms.component.scss',
})
export class DynaFormsComponent {
  @Input() schema: any = [];
  @Input() formStyles?: { [key: string]: any };
  @Input() formAppearance: MatFormFieldAppearance = 'outline';
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  filteredOptions: { [key: string]: string[] } = {};

  fileData: { [key: string]: File } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.buildForm();
  }

  filterOptions(event: any, field: any): void {
    const value = event.target.value;
    console.log(value);
    const filterValue = value.toLowerCase();
    this.filteredOptions[field.data] = field.data.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  buildForm() {
    this.schema.fields.forEach((field: any) => {
      const control = this.fb.control(
        '',
        this.mapValidators(field.validators || {})
      );
      this.form.addControl(field.name, control);

      // Handle dependent fields
      if (field.dependsOn) {
        const dependency = field.dependsOn;
        if (dependency?.value) {
          this.form.get(dependency.field)?.valueChanges.subscribe((value) => {
            if (value === dependency.value) {
              this.form.get(field.name)?.enable();
            } else {
              this.form.get(field.name)?.disable();
              this.form.get(field.name)?.reset();
            }
          });
        } else {
          this.form.get(dependency.field)?.valueChanges.subscribe((value) => {
            if (value) {
              this.form.get(field.name)?.enable();
            } else {
              this.form.get(field.name)?.disable();
              this.form.get(field.name)?.reset();
            }
          });
        }
        this.form.get(field.name)?.disable(); // Initially disable
      }
    });
  }

  mapValidators(validators: any) {
    const mapped = [];
    if (validators.required) mapped.push(Validators.required);
    if (validators.email) mapped.push(Validators.email);
    if (validators.minLength)
      mapped.push(Validators.minLength(validators.minLength));
    return mapped;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.fileData[controlName] = file;
    }
  }

  getStyles(fieldName: string): any {
    return this.formStyles ? this.formStyles[fieldName] || {} : {};
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      Object.keys(this.fileData).forEach((key) => {
        formValue[key] = this.fileData[key];
      });
      this.formSubmit.emit(formValue);
    }
  }

  upload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const controlName = inputElement.name;
      this.fileData[controlName] = file;
      this.form.patchValue({ [controlName]: file });
    }
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DynaFormsComponent } from './components/dyna-forms/dyna-forms.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DynamicMatFormsModule } from 'dynamic-mat-forms';
import { min } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DynamicMatFormsModule,
    DynaFormsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dmb-test';
  formAppearance: MatFormFieldAppearance = 'outline'; // fill, outline
  formSchema = {
    formName: 'User Form',
    fields: [
      {
        name: 'text-input-field',
        type: 'text',
        label: 'Username',
        placeholder: 'Enter your Username',
        validators: { required: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'password-field',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        validators: {
          required: true,
          minLength: 6,
          maxLength: 10,
          pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])',
        },
        errorMessage: 'This field is required',
      },
      {
        name: 'email-field',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        validators: { required: true, email: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'datepicker-field',
        type: 'datepicker',
        label: 'Date of Birth',
        placeholder: 'Enter your date of birth',
        validators: { required: true },
        min: new Date('01/01/1900'),
        max: new Date('01/01/2021'),
        errorMessage: 'This field is required',
      },
      {
        name: 'radio-field-example',
        type: 'radio',
        label: 'Options',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ],
        validators: { required: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'autocomplete-field-one',
        type: 'autocomplete',
        label: 'Country',
        data: [
          'Canada',
          'United States',
          'Mexico',
          'Brazil',
          'Germany',
          'France',
          'Italy',
        ],
        errorMessage: 'This field is required',
      },
      {
        name: 'autocomplete-two',
        type: 'autocomplete',
        label: 'Country',
        data: [
          'Nigeria',
          'United States',
          'Mexico',
          'Brazil',
          'Germany',
          'France',
          'Italy',
        ],
        errorMessage: 'This field is required',
      },
      {
        name: 'checkbox-field',
        type: 'checkbox',
        label: 'Terms and Conditions',
        validators: { required: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        placeholder: 'Select a role',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ],
        validators: { required: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'slide-toggle-field',
        type: 'slide-toggle',
        label: 'Slide',
        min: 0,
        max: 100,
        validators: { required: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'file-field',
        type: 'file',
        label: 'Upload File',
        validators: { required: true },
        errorMessage: 'This field is required',
      },
      {
        name: 'adminCode',
        type: 'text',
        label: 'Admin Code',
        // dependsOn: { field: 'role', value: 'admin' },
        dependsOn: { field: 'role' },
        validators: { requiredWhen: { field: 'role', value: 'admin' } },
        errorMessage: 'This field is required',
      },
    ],
  };
  // Dynamic styles for the form
  formStyles = {
    username: {
      formField: { width: '100%', marginBottom: '0px', paddingBottom: '0px' },
      input: { color: 'blue', fontSize: '16px', paddingBottom: '0px' },
      error: { color: 'purple', fontSize: '12px', paddingTop: '0px' },
    },
    email: {
      formField: { width: '100%', marginBottom: '20px' },
      input: { color: 'green', fontSize: '16px' },
    },
    password: {
      formField: { width: '100%', marginBottom: '20px' },
      input: { color: 'red', fontSize: '16px' },
      error: { color: 'orange', fontSize: '12px' },
    },
    submitButton: {
      backgroundColor: 'purple',
      color: 'white',
      padding: '10px 20px',
    },
  };
  onFormSubmit(event: any) {
    console.log(event);
  }
}

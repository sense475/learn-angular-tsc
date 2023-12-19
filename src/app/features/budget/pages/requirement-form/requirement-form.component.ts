import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RequirementService } from '../../services/requirement.service';
import { Location } from '@angular/common';

function isTHMobile(mobileNo: string): boolean {
  return /^(06|08|09)/.test(mobileNo);
}

const thMobile = (c: AbstractControl): ValidationErrors | null => {
  return isTHMobile(c.getRawValue()) ? null : { thMobile: true };
};
@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './requirement-form.component.html',
  styleUrl: './requirement-form.component.css'
})
export default class RequirementFormComponent {

  fb= inject(NonNullableFormBuilder);

  requirementService = inject(RequirementService);
  // title = new FormControl<string>('', {nonNullable : true});
  title= this.fb.control('', {validators: Validators.required});
  contactMobileNo = this.fb.control('', [Validators.required,thMobile]);

  fg = this.fb.group({
    title: this.title,
    contactMobileNo: this.contactMobileNo
  });

  constructor(private location: Location) { 
    this.title.value
  }

  onSubmit(): void {
    this.requirementService
      .add(this.fg.getRawValue())
      .subscribe(v => console.log(v));
  }

  onBack(): void {
    this.location.back();
  }
}

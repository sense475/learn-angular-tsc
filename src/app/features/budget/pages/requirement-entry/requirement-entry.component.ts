import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Requirement } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';
import { MobileFormatPipe } from '../../../../shared/pipes/mobile-format.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  imports: [AsyncPipe,
    MobileFormatPipe,
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css'
})
export default class RequirementEntryComponent {

  reqService = inject(RequirementService);
  
  // observable way
  // url = "http://localhost:3000/requirements";
  // reqs = this.httpClient.get<Requirement[]>(this.url);

  //normal way
  reqs: Requirement[] = []

  //filter data
  filtered = this.reqs;

  isSmallTable = false;


  searchBox = new FormControl<string>('', {nonNullable : true});

  // signal way
  // reqs = toSignal(this.httpClient.get<Requirement[]>("http://localhost:3000/requirements"))

  constructor() { 
    this.reqService.list().subscribe((data) => (
      this.reqs = data,
      this.filtered = data
    ));
  
    this.searchBox.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(keyword => console.log(keyword))
    ).subscribe(keyword => 
      this.filtered = this.reqs.filter(req => req.title.includes(keyword)
      ));
      
    // const url = "http://localhost:3000/requirements";
    // this.httpClient.get<Requirement[]>(url).subscribe(data => this.reqs = data)
  }
}

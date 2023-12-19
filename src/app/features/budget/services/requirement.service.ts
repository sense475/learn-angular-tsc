import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requirement } from '../models/requirement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  httpClient = inject(HttpClient);
  url = "http://localhost:3000/requirements";
  constructor() { }

  list() :Observable<Requirement[]> {
    return this.httpClient.get<Requirement[]>(this.url)
  }

  add(requirement: Requirement) : Observable<Requirement> {
    return this.httpClient.post<Requirement>(this.url, requirement);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, of } from 'rxjs';

import * as users from '../../../assets/mock/users.json';
import * as userDetails from '../../../assets/mock/users-details.json';
import * as countries from '../../../assets/mock/countries.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data = users;
  userDetails = userDetails;
  countries = countries;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // return this.http.post('/api/people/list', {});
    return of(this.data.users)
  }

  getUserDetails(id: string): Observable<any> {
    console.log(id)
    // return this.http.get(`/api/people/${id}`)
    return of(this.userDetails.users.filter((item) => {
      return item.id === id;
    })[0])
  }

  getCountries(): Observable<any> {
    // return this.http.get(`/api/reference/countries`)
    return of(this.countries.data)
  }
}

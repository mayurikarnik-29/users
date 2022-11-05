import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = 'qwqwqwqwqwzddsdsd.trtrfdffdfdeerDEWS.xzxzxASSA';
  constructor() { }

  // After sign in store token recieved from server in local storage
  signIn() {
    localStorage.setItem('access_token', this.token);
  }

  signOut() {
    localStorage.removeItem('access_token');
  }

  //Create a getToken method to return this token from local storage
  getToken() {
    return localStorage.getItem('access_token');
  }
}

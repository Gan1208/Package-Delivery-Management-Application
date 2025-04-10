import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const API_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  isUserAuthenicated():boolean {
    return this.isAuthenticated;
  }

  userlogIn() {
    this.isAuthenticated = true;
  }

  getAuthStatus(){
    return this.http.get(API_URL + '/auth/status');
  }
}

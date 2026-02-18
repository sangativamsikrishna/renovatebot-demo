import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: any;
  token: string;
  constructor(private readonly storageService: StorageService,private KeycloakService:KeycloakService) {}

  
  setUserInformation(user: any) {
    localStorage.setItem('data', JSON.stringify(user)); 
    this.user = user;
  }
  getUserInformation() {
    return this.user;
  }
  setToken() {
    this.token = this.user.token;
  }
  getToken() {
    return this.token;
  }
}

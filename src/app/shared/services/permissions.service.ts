import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  authorities: string[];
  constructor() {}

  setAuthorities(authorities: string[]) {
    this.authorities = authorities;
  }

  getAuthorities() {
    return this.authorities;
  }

  hasAccess(authorities: string[]) {
    return true;
  }
}

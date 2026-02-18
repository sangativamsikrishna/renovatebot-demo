import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';

@Injectable({providedIn: 'root'})
export class MsalAuthService {
    constructor(private httpClient: HttpClient, private readonly authService: MsalService) { }

    login() {
        this.authService.loginRedirect();
    }
    
}
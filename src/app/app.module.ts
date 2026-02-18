import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA, APP_INITIALIZER
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from './shared/shared.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {initializeKeycloak} from './utils/app.init'
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration,
  BroadcastService
} from '@azure/msal-angular';
import { APP_BASE_HREF } from '@angular/common';
import { AppInitService } from './appinit.service';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './shared/helpers/jwt-interceptor';
import { KeycloakConfigService } from './KeycloakConfigService.service';
export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
function initApp(): any {
  // return () => config.loadConfigurations();
  var request = new XMLHttpRequest();
  request.open('GET', `${environment.restURL}auth/fetch/props`, false); // request application settings synchronous
  request.send(null);
  const response = JSON.parse(request.responseText);
  // localStorage.setItem('redirectUrl', response.redirecturl);
  
  // localStorage.setItem('postRedirectUrl', response.post_redirecturl);
  // localStorage.setItem('clientId', response.clientId);
  // localStorage.setItem('tenantId', response.tenantId);
  // localStorage.setItem('hostname', response.hostName);
  // localStorage.setItem('authotiy', response.authority);
  // localStorage.setItem('hostname', response.hostName);
  console.log('response', response); 
  let obj = {};
  if (response.tenantId) {
     obj = {
      auth: {
        // clientId: response.clientId,
        authority: "https://login.microsoftonline.com/" + response.tenantId,
        validateAuthority: true,
        redirectUri: response.redirecturl,
        postLogoutRedirectUri: response.post_redirecturl,
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    }
    localStorage.setItem('noAzure', 'false');
  } else {
    obj = {
      auth: {
        clientId: '3fdf4de9-cfdc-4465-a3d0-bfa0a1574fc8',
        authority: "https://login.microsoftonline.com/" + '3fdf4de9-cfdc-4465-a3d0-bfa0a1574fc8',
        validateAuthority: true,
        redirectUri: response.redirecturl,
        postLogoutRedirectUri: response.post_redirecturl,
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    }
    localStorage.setItem('noAzure', 'true');
  }
  return obj;
}

function MSALConfigFactory(): any {
  return initApp();
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "user.read",
      "openid",
      "profile",
      "api://d405cdb5-8c7e-4d16-b122-fef0847daa7b/access_as_user"
    ],
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    protectedResourceMap: [
      ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ],
    extraQueryParameters: {}
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    SharedModule,
    KeycloakAngularModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService,AppInitService],
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService, BroadcastService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

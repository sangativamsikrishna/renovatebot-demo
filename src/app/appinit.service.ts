import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './utils/app.init';

@Injectable({providedIn: 'root'})
export class AppInitService {
    value: any;
    
    constructor(private httpClient: HttpClient,private keycloak:KeycloakService) { }


    loadConfigurations() {
        // return () => config.loadConfigurations();
        var request = new XMLHttpRequest();
        request.open('GET', `${environment.restURL}auth/fetch/props`, false); // request application settings synchronous
        request.send(null);
        const response = JSON.parse(request.responseText);
        localStorage.setItem('redirectUrl', response.redirecturl);
        localStorage.setItem('domainName',response.realmName);
        localStorage.setItem("domainclientid",response.clientName)
        // localStorage.setItem('postRedirectUrl', response.post_redirecturl);
        // localStorage.setItem('clientId', response.clientId);
        // localStorage.setItem('tenantId', response.tenantId);
        // localStorage.setItem('hostname', response.hostName);
        // localStorage.setItem('authotiy', response.authority);
        // localStorage.setItem('hostname', response.hostName);
        console.log('response', response);
        // response['url'] = 'https://kc.clix.dev/auth/'
        // response['realm']="season",
        // response['clientid']="season-dev"
    //    let  keycloack = new KeycloakService();
        // setTimeout(() => {
          return response;
     
    //   15000);
        let obj = {};
        // if (response.tenantId) {
        //    obj = {
        //     auth: {
        //       clientId: response.clientId,
        //       authority: "https://login.microsoftonline.com/" + response.tenantId,
        //       validateAuthority: true,
        //       redirectUri: response.redirecturl,
        //       postLogoutRedirectUri: response.post_redirecturl,
        //       navigateToLoginRequestUrl: true,
        //     },
        //     cache: {
        //       cacheLocation: "localStorage",
        //       storeAuthStateInCookie: isIE, // set to true for IE 11
        //     },
        //   }
        //   localStorage.setItem('noAzure', 'false');
        // } else {
        //   obj = {
        //     auth: {
        //       clientId: '3fdf4de9-cfdc-4465-a3d0-bfa0a1574fc8',
        //       authority: "https://login.microsoftonline.com/" + '3fdf4de9-cfdc-4465-a3d0-bfa0a1574fc8',
        //       validateAuthority: true,
        //       redirectUri: response.redirecturl,
        //       postLogoutRedirectUri: response.post_redirecturl,
        //       navigateToLoginRequestUrl: true,
        //     },
        //     cache: {
        //       cacheLocation: "localStorage",
        //       storeAuthStateInCookie: isIE, // set to true for IE 11
        //     },
        //   }
        //   localStorage.setItem('noAzure', 'true');
        // }
        // return obj;
      }

    initializer(data): () => Promise<any> {
        let keycloakService = data
        // this.value = keycloakConfigService.getConfig()
        return (): Promise<any> => {
            return new Promise<void>(async (resolve, reject) => {
              try {
                await this.keycloak.init({
                    config: {
                        url: this.value.issuer,
                        realm: this.value.realm,
                        clientId: this.value.clientName
                    },
                  loadUserProfileAtStartUp: true,
                  initOptions: {
                    checkLoginIframe: true
                  },
                  bearerExcludedUrls: []
                }).then((a) => {
                  console.log(a); // this returns always false
                });
                resolve();
              } catch (error) {
                reject(error);
              }
            });
          };
    }
        //     .toPromise();
        // this.httpClient.get(environment.restURL + 'auth/fetch/props').subscribe((response: any) => {
        //     localStorage.setItem('redirectUrl', response.redirecturl);
        //     localStorage.setItem('postRedirectUrl', response.post_redirecturl);
        //     localStorage.setItem('clientId', response.clientId);
        //     localStorage.setItem('tenantId', response.tenantId);
        //     localStorage.setItem('hostname', response.hostName);
        //     localStorage.setItem('authotiy', response.authority);
        //     return response;
        // }, error => {

        // });
        // return 
    
    
}
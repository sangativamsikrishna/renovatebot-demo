import { HttpClient } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import * as Keycloak from 'keycloak-js';
import { filter,map } from 'rxjs/operators';
import { AppInitService } from '../appinit.service';
import { KeycloakConfigService } from '../KeycloakConfigService.service';

export function initializeKeycloak(keycloak: KeycloakService,keydata:AppInitService) {
  this.value = keydata.loadConfigurations()
  if(this.value.clientName == '' || this.value.realmName == ''){
    this.value.realmName = 'master',
    this.value.clientName = "tokenclient"
  }
  console.log(this.value)
    return () =>
      keycloak.init({
        config: {
          url: `${this.value.keyCloakUrl}/auth/`,
          realm: this.value.realmName,
          clientId: this.value.clientName,
        },
        initOptions: {
          checkLoginIframe:true,
          checkLoginIframeInterval:25,
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/publicpages','/domain','/forgot'],

      });
      
  }
  export function initializer(keycloakService: KeycloakService, keycloakConfigService: KeycloakConfigService): () => Promise<any> {
    this.value = keycloakConfigService.getConfig()
    return (): Promise<any> => {
        return new Promise<void>(async (resolve, reject) => {
          try {
            await keycloakService.init({
                config: {
                    url: this.value.issuer,
                    realm: this.value.realm,
                    clientId: this.value.clientId
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
// }
//   export function initializer(keycloakService: KeycloakService, keycloakConfigService: KeycloakConfigService): () => Promise<boolean> {
//     return ():Promise<boolean>  => keycloakConfigService.getConfig()
//         .pipe(
//             filter(config => config.enabled),
//             flatMap(config => {
//                 return keycloakService.init({
//                     config: {
//                         url: config.authServerUrl,
//                         realm: config.realm,
//                         clientId: config.resource,
//                     },
//                     initOptions: {
//                         onLoad: 'check-sso',
//                         checkLoginIframe: false
//                     }
//                 });
//             })).toPromise();
// }

//   keycloak.init({ onLoad: "login-required" }).then((auth) => {
//     if (!auth) {
//        window.location.reload();
//     } else {
//       console.log("Authenticated");
//     }

//     console.log("token", keycloak.token)
//     localStorage.setItem("token", keycloak.token);
//     localStorage.setItem("refresh-token", keycloak.refreshToken);
//     setTimeout(() => {
//        keycloak.updateToken(60).then((refreshed) => {
//          if(refreshed) {
//            console.debug('Token refreshed' + refreshed);
//          }else{
//          }
//        }).catch(() => {
//           console.error('Failed to refresh token');
//        });
//     }, 40000)
//  }).catch(() => {
//     console.error("Authenticated Failed");
//  });
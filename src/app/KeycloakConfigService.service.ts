import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakConfig } from "keycloak-js";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class KeycloakConfigService {
    private config: KeycloakConfig;
    value:any;

    constructor(private http: HttpClient,private keycloak:KeycloakService) {
    }


    getConfig() {
        if (this.config) {
            return of(this.config);
        } else {
            const configObservable = this.http.get(`${environment.restURL}auth/fetch/props`).subscribe(res => {
                return res
            });
            // configObservable.subscribe(config => this.config = config);
            // return configObservable;
        }
    }

    // getConfig(): Observable<KeycloakConfig> {
        
    //     debugger;
    //     if (this.config) {
    //         return of(this.config);
    //     } else {
    //         const configObservable = this.http.get(`${environment.restURL}auth/fetch/props`).subscribe(res => {
    //             // setTimeout(() => {
    //                return res;
    //             //   }, 15000);
    //         });
    //         // configObservable.subscribe(config => this.config = config);
    //         // console.log(this.config)
    //         // return configObservable;
    //     }
    // }
}
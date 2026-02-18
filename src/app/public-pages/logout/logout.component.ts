import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from 'src/app/utils/app.init';

@Component({
  selector: 'publicpages-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private KeycloakService:KeycloakService) { }

  ngOnInit(): void {
    // this.KeycloakService.init({
    //   config: {
    //     url: 'http://localhost:8080/auth',
    //     realm: 'Testrealm',
    //     clientId: 'clix_test',
    //   },
    //   initOptions: {
    //       checkLoginIframe:true,
    //       checkLoginIframeInterval:25
    //   },
    // })
    this.KeycloakService.clearToken();
    // console.log(this.KeycloakService.isLoggedIn())
    // this.KeycloakService.clearToken();
  const validurl = localStorage.getItem('redirectUrl')
    this.KeycloakService.logout(`${validurl}login`);
    localStorage.clear();
    sessionStorage.clear();
  }

}

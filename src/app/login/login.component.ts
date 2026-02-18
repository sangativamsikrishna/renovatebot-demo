import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PublicPagesService } from 'src/app/public-pages/public-pages.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { assetUrl } from 'src/single-spa/asset-url';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'is login page';
  loginForm: FormGroup;
  submitted: boolean;
  loginResponse = true;
  logo = assetUrl('/images/clixlogoDark.png');
  constructor(
    private publicPageService: PublicPagesService,
    private router: Router,
    private sharedService: SharedService,
    private storageService: StorageService,
    private authService: MsalService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+[a-zA-Z_.0-9]*\@\w+\.\w+/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ])
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  msalLogin() {
      const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
  
      if (isIE) {
        this.authService.loginRedirect();
      } else {
        this.authService.loginPopup();
      }
  }

  logIn(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginResponse = false;
    this.loginForm.value.password = btoa(this.loginForm.value.password);
    this.publicPageService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log('response', res);
        this.loginResponse = true;
        this.submitted = false;
        this.loginForm.reset();
        sessionStorage.setItem('permissions', res.permissions);
        this.storageService.setItem('UserName', res.userData.userName);
        this.storageService.setItem('role', res.userData.role);
        this.storageService.setItem('token', res.token);
        this.authenticationService.setUserInformation(res);
        this.router.navigateByUrl('/pipeline');
      },
      error => {
        this.sharedService.errorAlert(error.error.error.message);
        this.loginResponse = true;
      }
    );
  }
}

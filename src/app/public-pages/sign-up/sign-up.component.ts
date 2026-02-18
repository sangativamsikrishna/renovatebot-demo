import { Component, OnInit } from '@angular/core';
// import * as noUiSlider from 'nouislider';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { PublicPagesService } from '../public-pages.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { assetUrl } from 'src/single-spa/asset-url';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger } from 'msal';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  errorMsg: any;
  signUpButton: boolean = true;
  loggedIn: boolean;
  logo = assetUrl('/images/hand.svg');
  githubLogo = assetUrl('/images/git-hub.png');
  gitLablogo = assetUrl('/images/git-lab.png');
  bitbucketlogo = assetUrl('/images/bitbucket.png');
  emailLogo = assetUrl('/images/emailLogo.png');
  upWorklogo = assetUrl('/images/upWorklogo.png');
  domain_value: any;
  domainInfo: any;
  domainAvailable: boolean;
  domainNotAvailable : boolean;
  fieldTextType: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private publicService: PublicPagesService,
    private router: Router,
    private authService: MsalService,
    private broadcastService: BroadcastService,
    private sharedService: SharedService,
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) { }
  asseturl = (inp: string) => assetUrl(inp);
  ngOnInit(): void {
    // if(location.host != 'minrootfolder.clix.dev'){
    //   this.router.navigateByUrl('/publicpages/login');
    // }
    this.buildForm();
    var slider = document.getElementById('sliderRegular');
    // noUiSlider.create(slider, {
    //   start: 40,
    //   connect: false,
    //   range: {
    //     min: 0,
    //     max: 100
    //   }
    // });
    var slider2 = document.getElementById('sliderDouble');
    // noUiSlider.create(slider2, {
    //   start: [20, 60],
    //   connect: true,
    //   range: {
    //     min: 0,
    //     max: 100
    //   }
    // });
    this.checkoutAccount();
    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkoutAccount();
    });
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }
      console.log('Redirect Success: ', response);
    });
    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }));
  }
  checkoutAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }
  buildForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z]+$/)]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_]+([-+.'][a-z0-9_]+)*@[a-z0-9_]+([-.][a-z0-9_]+)*\.[a-z0-9_]+([-.][a-z0-9_]+)*$/)
        ]
      ],
      orgName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_ ]*$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]{8,}$/)
        ]
      ],
      domainName:['',[Validators.pattern(/^[a-zA-Z0-9]*$/)]]
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  orgNameInfo(event: any, type: any){
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9- ]/g, "");
    var org_name =  event.target.value;
    org_name = org_name
    .split(" ")
    .join("-")
    .replace(/^([-]*)/g, "")
    .replace(/([-]*)$/g, "")
    .toLowerCase();
    this.domain_value = event.target.value.replace(/^([-]*)/g, "").replace(/([-]*)$/g, "").toLocaleLowerCase();
    // if(type == 'organization'){
    //     this.signUpForm.controls.domainName.setValue(org_name);
    //    }
    // const obj = {
    //   domain :  this.domain_value + ".clix.dev"
    // }
    // this.publicService.checkDomainName(obj).subscribe((res:any) => {
    //   if(res.message == 'Domain Exists'){
    //     this.domainNotAvailable = false;
    //     this.domainAvailable = true;
    //   } else {
    //     this.domainNotAvailable = true;
    //     this.domainAvailable = false;
    //   }
    // }, error =>{

    // });
  }
 
  trimValue(event) {
     event.target.value = event.target.value.replace(/\s+/g, ''); 
    }
  signup() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUpButton = false;
    this.signUpForm.value.password = btoa(this.signUpForm.value.password);
    this.submitted = false;
    this.publicService.signup(this.signUpForm.value).subscribe(
      (res: any) => {
        this.signUpButton = true;
        this.signUpForm.reset();
        this.domainAvailable = false;
        this.domainNotAvailable = false;
        this.sharedService.successAlert('We are creating your account for you. Please check your email to find the confirmation & login details we sent to you.');
      },
      error => {
        this.sharedService.errorAlert(error.error.errors);
        this.signUpButton = true;
      }
    );
  }
  msalLogin() {
   // const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    this.authService.loginPopup().then((res: any) => {
      console.log(res);
      if (res.idToken.claims.sub) {
        //write one api
        sessionStorage.setItem("b2cId", res.idToken.claims.sub);
        sessionStorage.setItem("idToken", res.idToken.rawIdToken);
        this.azureLogin();
        // this.router.navigateByUrl('/pipeline');
      }
    });
  }
  azureLogin(){
    this.publicService.azureLogin().subscribe((res: any) => {
      console.log(res);
      // sessionStorage.setItem('permissions', res.data.userData.permissions);
      // this.storageService.setItem('UserName', res.data.userData.userName);
      // this.storageService.setItem('role', res.data.userData.role);
      // this.storageService.setItem('token', res.data.token);
      // this.storageService.setItem('organizationName', res.data.userData.organizationName);
      // this.authenticationService.setUserInformation(res);
      this.router.navigateByUrl('/pipeline');
    }, error => {
    });
  }
  
  checkDomainToLogin(){
    // const url = window.location.href
    // const data = this.router.replaceState(path:'/signup','')
    // if(location.hostname !=  "minrootfolder.clix.dev"){
      window.location.href = `/login/domain`;
      // return `${data}/login/domain`
    // } else {
      // this.router.navigateByUrl('/publicpages/login');
      // return `${data}/login`
      // window.location.href = `/login`
      // this.router.navigateByUrl('/publicpages/domain');
  //  }
    }
    loginclick(){
      window.location.href = `/login/domain`;
    }
    EnterSubmit(event: any) {
      if (event.keyCode == 13) {
          this.signup();
      }
    }
}
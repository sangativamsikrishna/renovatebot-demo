import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PublicPagesService } from '../public-pages.service';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger } from 'msal';
import { KeycloakService } from 'keycloak-angular';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    title = 'is login page';
    loginForm: FormGroup;
    otpvalue: any;
    submitted: boolean;
    loginResponse: boolean;
    isIframe: any;
    themeData: any = {}
    loggedIn: boolean;
    buttonDisable: boolean;
    logo = assetUrl('/images/hand.svg');
    isAzure: any;
    nootp: boolean;
    resend: boolean;
    constructor(
        private publicPageService: PublicPagesService,
        private router: Router,
        private sharedService: SharedService,
        private storageService: StorageService,
        private authService: MsalService,
        private broadcastService: BroadcastService,
        private authenticationService: AuthenticationService, private route: ActivatedRoute,private KeycloakService:KeycloakService
    ) {}

    ngOnInit(): void {
        this.getLoggedinUser();
        this.isAzure = localStorage.getItem('noAzure');
        this.buildLoginForm();
        // this.isIframe = window !== window.parent && !window.opener;

        // this.checkoutAccount();

        // this.broadcastService.subscribe('msal:loginSuccess', () => {
        //     this.checkoutAccount();
        // });

        // this.authService.handleRedirectCallback((authError, response) => {
        //     if (authError) {
        //         console.error('Redirect Error: ', authError.errorMessage);
        //         return;
        //     }
        // });
    }
    getLoggedinUser(){
        
        let usedetails = this.KeycloakService.getKeycloakInstance().idTokenParsed;
        console.log('userdetails',usedetails)
        let token = this.KeycloakService.getKeycloakInstance().token;
        console.log('token',token)
        localStorage.setItem('token',token)
        this.publicPageService.azureLogin().subscribe((res: any) => {
            res.data['token']=token;
            this.authenticationService.setUserInformation(res);
            // res.data.userData.permissions = "access_deployment_information,adding_members_to_the_project,adding_project_code_freeze,add_reviewers,add_user,assigning_roles,assigning_story,azure_sync,create_default_environments,creating_epics,creating_story,delete_department,delete_environemnt,delete_epic,delete_project_code_freeze,delete_story,delete_user,department_creation,department_list,edit_department,edit_environemnt,edit_epic,edit_members_to_the_project,edit_project_build_pipeline_configuration,edit_project_code_freeze,edit_story,edit_user,epic_list,exception_approval_for_suspending_deployment,folder_level_settings,import_users,infra_log_view,inventory,list_users,project_level_configuration,removing_members_to_the_project,rerun_infra,reset_password,role_delete,role_edit,role_list,roles_creation,running_builds_manually,setting_up_new_project_for_build_pipeline,story_list,view_build_list,view_code_freeze_projects_list,view_environemnt_lIst,view_list_of_Members_to_the_project,view_projects_list"
            localStorage.setItem('logout',JSON.stringify('false'))
            sessionStorage.setItem('permissions', res.data.userData.permissions);
            this.storageService.setItem('UserName', res.data.userData.userName);
            this.storageService.setItem('role', res.data.userData.role);
            this.storageService.setItem('token', res.data.token);
            this.storageService.setItem('organizationName', res.data.userData.organizationName);
            localStorage.setItem('data',JSON.stringify(res))
            this.route.queryParams.subscribe((value) => {
                if (value.utm_source) {
                    this.router.navigateByUrl('/usermanagement/profile/edit');
                } else {
                    this.router.navigateByUrl('/dashboard');
                }
            })

            document.getElementById('js-sidebarnav').style.display = 'block';
            if (localStorage.getItem('token')) {
                let orgName = localStorage.getItem('organizationName');
                document.getElementById('js-sidebarnav').style.display = 'block';
                document.getElementById('js-shortname').innerHTML = this.shortName(orgName);
                document.getElementById('js-orgname').innerHTML = orgName;
                document.getElementById('js-username').innerHTML = localStorage.getItem('UserName')
                document.getElementById('js-role').innerHTML = localStorage.getItem('role')
            } else {
                document.getElementById('js-sidebarnav').style.display = 'none';
            }
        }, error => {});
        let data = {
            data:{
               userData:usedetails 
            }
        }
        console.log('userrole',this.KeycloakService.getUserRoles());
        return usedetails
        
      }

    checkoutAccount() {
        this.loggedIn = !!this.authService.getAccount();
    }
    buildLoginForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
            ]),
            password: new FormControl('', [
                Validators.required,
                // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
            ])
        });
    }

    get f(): any {
        return this.loginForm.controls;
    }

    applyTheme(data: any) {
        if (data) {
            const keys = Object.keys(data);
            if (keys.length > 0) {
                keys.forEach((key: string) => {
                    const root = document.documentElement;
                    root.style.setProperty('--' + key, data[key]);
                })
            } else {
                console.log('Empty Object')
            }
        }
    }

    msalLogin() {
        const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

        if (isIE) {
            this.authService.loginRedirect();
        } else {
            this.authService.loginRedirect();
        }
    }

    azureMsalLogin() {
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
        }, error => {
            console.log('errror', error);
        });
    }
    azureLogin() {
        this.publicPageService.azureLogin().subscribe((res: any) => {
            res.data.azureInfo = true
            this.authenticationService.setUserInformation(res);
            this.router.navigateByUrl('/pipeline');
        }, error => {});
    }
    logIn(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loginResponse = false;
        const password = btoa(this.loginForm.value.password);
        const loginObj = {
            email: this.loginForm.value.email,
            password: password
        }
        this.buttonDisable = true;
        if (this.submitted) {
            this.publicPageService.login(loginObj).subscribe(
                (res: any) => {
                    this.loginResponse = true;
                    this.submitted = false;
                    // this.loginForm.reset();
                    // this.buttonDisable = false;
                    // sessionStorage.setItem('permissions', res.data.userData.permissions);
                    // this.storageService.setItem('UserName', res.data.userData.userName);
                    // this.storageService.setItem('role', res.data.userData.role);
                    // this.storageService.setItem('token', res.data.token);
                    // this.storageService.setItem('organizationName', res.data.userData.organizationName);
                    // this.authenticationService.setUserInformation(res);
                    // this.router.navigateByUrl('/dashboard');
                    // document.getElementById('js-sidebarnav').style.display = 'block';
                    // if (localStorage.getItem('token')) {
                    //     let orgName = localStorage.getItem('organizationName');
                    //     document.getElementById('js-sidebarnav').style.display = 'block';
                    //     document.getElementById('js-shortname').innerHTML = this.shortName(orgName);
                    //     document.getElementById('js-orgname').innerHTML = orgName;
                    //     document.getElementById('js-username').innerHTML = localStorage.getItem('UserName')
                    //     document.getElementById('js-role').innerHTML = localStorage.getItem('role')
                    // } else {
                    //     document.getElementById('js-sidebarnav').style.display = 'none';
                    // }
                    // this.applyTheme(res.data.themeInfo[0]);
                },
                error => {
                    this.submitted = false;
                    this.sharedService.errorAlert(`${error.error.errors}/invalid credentials`);
                    // this.loginResponse = true;
                    this.buttonDisable = false;
                }
            );
        }
    }
    otp() {
        if (this.otpvalue == null) {
            this.nootp = true;
            return;
        }
        const otpObj = {
            email: this.loginForm.value.email,
            otp: this.otpvalue
        }
        this.publicPageService.otp(otpObj).subscribe(
            (res: any) => {
                this.loginResponse = true;
                this.nootp = false;
                this.loginForm.reset();
                sessionStorage.setItem('permissions', res.data.userData.permissions);
                this.storageService.setItem('UserName', res.data.userData.userName);
                this.storageService.setItem('role', res.data.userData.role);
                this.storageService.setItem('token', res.data.token);
                this.storageService.setItem('organizationName', res.data.userData.organizationName);
                this.authenticationService.setUserInformation(res);
                this.route.queryParams.subscribe((value) => {
                    if (value.utm_source) {
                        this.router.navigateByUrl('/usermanagement/profile/edit');
                    } else {
                        this.router.navigateByUrl('/dashboard');
                    }
                })

                document.getElementById('js-sidebarnav').style.display = 'block';
                if (localStorage.getItem('token')) {
                    let orgName = localStorage.getItem('organizationName');
                    document.getElementById('js-sidebarnav').style.display = 'block';
                    document.getElementById('js-shortname').innerHTML = this.shortName(orgName);
                    document.getElementById('js-orgname').innerHTML = orgName;
                    document.getElementById('js-username').innerHTML = localStorage.getItem('UserName')
                    document.getElementById('js-role').innerHTML = localStorage.getItem('role')
                } else {
                    document.getElementById('js-sidebarnav').style.display = 'none';
                }
                this.applyTheme(res.data.themeInfo[0]);
                this.otpvalue = '';
            },
            error => {
                this.sharedService.errorAlert(`${error.error.errors}`);
                // this.loginResponse = true
                if (error.error.errors == 'InvalidOTP') {
                    this.resend = true;
                }
            }
        );
    }
    resendOtp() {
        this.otpvalue = '';
        this.publicPageService.resendOtp({ email: this.loginForm.value.email }).subscribe(
            (res: any) => {
                this.resend = false;

            }, error => {
                this.sharedService.errorAlert(`${error.error.errors}`)
            }
        )
    }
    shortName(orgName) {
        let shortString = orgName;
        if (shortString) {
            shortString = shortString.substring(0, 2).toUpperCase();
        } else {
            shortString = 'UN';
        }
        return shortString;
    }
    mainRoute() {
        const mainroute = `${location.host.replace(location.host, 'minrootfolder.clix.dev/publicpages')}`;
        window.location.href = `https://${mainroute}`;
    }
    register() {
        window.location.href = 'https://minrootfolder.clix.dev/publicpages';
    }
    EnterSubmit(event: any) {
        if (event.keyCode == 13) {
            this.logIn();
        }
    }
}
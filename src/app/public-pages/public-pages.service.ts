import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PublicPagesService {
  POST_LOGIN_URL = `${environment.restURL}auth/login`;
  POST_SIGNUP_URL = `${environment.restURL}auth/register`;
  POST_ForgotPassword_URL = `${environment.restURL}auth/forgotPassword`;
  CHECK_DOMAIN_URL = `${environment.restURL}auth/domain`;
  CHECK_EMAIL_URL = `${environment.restURL}auth/domain/forgot`;
  AZURE_LOGIN_URL = `${environment.restURL}azureauth/user/logininfo`
  POST_OTP_URL = `${environment.restURL}auth/otp/check`
  POST_RESEND_OTP = `${environment.restURL}auth/otp/resend`
  constructor(private http: HttpClient) {}
  //#region  for login
  login(loginData) {
    return this.http.post(this.POST_LOGIN_URL, loginData);
  }
  //#endregion
  //#region for sign-up
  signup(signUpData) {
    return this.http.post(this.POST_SIGNUP_URL, signUpData);
  }
  otp(otpData){
    return this.http.post(this.POST_OTP_URL,otpData)
  }
  //#endregion
  //#region for forgot-password
  forgotPassword(forgotPasswordData) {
    return this.http.post(this.POST_ForgotPassword_URL, forgotPasswordData);
  }
  //#endregion
 //#region for domainName
  checkDomainName(data){
    return this.http.post(this.CHECK_DOMAIN_URL, data);
  }
  //#endregion
   //#region for checkEmail
  checkEmailData(data: any){
    return this.http.post(this.CHECK_EMAIL_URL , data);
  }
  resendOtp(data:any){
    return this.http.post(this.POST_RESEND_OTP,data)
  }
    //#endregion
    azureLogin(){
    //   debugger;
      let header = new HttpHeaders().set(
        "Authorization",
        `Bearer ${localStorage .getItem("token")}` 
      );
      const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.AZURE_LOGIN_URL,'');
    }
}
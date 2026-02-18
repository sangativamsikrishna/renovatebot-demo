import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { PublicPagesService } from '../public-pages.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted: boolean = false;
  emailObj:any={};
  logo = assetUrl('/images/hand.svg');

  constructor(
    private publicPageService: PublicPagesService,
    private router: Router,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.ForgotPasswordForm();
  }
  ForgotPasswordForm(): void{
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        // Validators.pattern(/^[A-Za-z]+[a-zA-Z_.0-9]*\@\w+\.\w+/)
      ]),
     });

  }

  get f(): any {
    return this.forgotPasswordForm.controls;
  }
  submitEmail(): void{
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.emailObj.email =this.forgotPasswordForm.value.email
    this.publicPageService.forgotPassword(this.emailObj).subscribe(
      (res: any) => {
        if(res.message == 'Email sent successfully'){
          this.sharedService.successAlert(res.message);
          this.router.navigateByUrl('/login');
        } else {
          this.forgotPasswordForm.reset();
          this.sharedService.errorAlert(res.message);
        }
      },
      error => {
        this.sharedService.errorAlert(error.errors);
      }
    );
    
    this.submitted = false;
    // this.forgotPasswordForm.reset();
    // this.router.navigateByUrl('/publicpages/login');
  }
  mainRoute(){
    const mainroute = `${location.host.replace(location.host, 'minrootfolder.clix.dev/publicpages')}`;
    window.location.href = `https://${mainroute}`;
  }
}

import { Component, OnInit } from '@angular/core';
import { PublicPagesService } from '../public-pages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  public domainName: any;
  isShow: boolean = false;
  email: any;
  domainFrm : FormGroup;
  isSignOutButton : boolean = false;
  logo = assetUrl('/images/hand.svg');
  submitted: boolean;
  domainCheck: FormGroup;
  emailSubmitted: boolean;

  constructor(private publicPageService : PublicPagesService,private sharedService: SharedService,
    private router: Router,) { }

  ngOnInit(): void {
    this.domainForm();
    this.DomainCheck();
  }

  domainForm(): void {
    this.domainFrm = new FormGroup({
      domain_name: new FormControl('' ,[Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
    })
  }
  DomainCheck(){
    this.domainCheck = new FormGroup({
      domain_check: new FormControl('',[Validators.required])
    })
  }

  get f(): any {
    return this.domainFrm.controls;
  }
  get g(): any {
    return this.domainCheck.controls;
  }

  mainRoute(){
    // const mainroute = `${location.host.replace(location.host, 'minrootfolder.clix.dev/publicpages')}`;
    window.location.href = `https://${location.host}/signup`;  }
  
  checkDomain(){
    this.submitted = true;
    if(this.domainCheck.invalid){
      return
    }
    const domain =  this.domainCheck.value.domain_check + ".clix.dev";
    const obj = {
      domain :  this.domainCheck.value.domain_check + ".clix.dev"
    }
    this.publicPageService.checkDomainName(obj).subscribe((res:any) => {
      if(res.message == 'Domain Exists'){
        window.location.href = `https://${domain}/login`;
      } else {
        this.sharedService.errorAlert(res.message);
      }
    }, error => {
      this.submitted = false;
      this.sharedService.errorAlert(error.error.errors);
    });
  }
  forgotClixName(){
    this.isShow = !this.isShow
  }
  checkEmail(){
    this.emailSubmitted = true;
    if (this.domainFrm.invalid) {
      return;
    }
    const data = {
      email : this.domainFrm.controls.domain_name.value 
    }
    this.publicPageService.checkEmailData(data).subscribe((res: any) => {
      if(res.message == 'Email Sent'){
        this.sharedService.successAlert(res.message);
      } else {
        this.sharedService.errorAlert(res.message);
      }
    }, error => {
      this.emailSubmitted = false;
      this.sharedService.errorAlert('error');
    });
  }
  EnterSubmit(event: any) {
    if (event.keyCode == 13) {
        this.checkDomain();
        // this.checkEmail();
        // this.forgotClixName();
    }
  }
}

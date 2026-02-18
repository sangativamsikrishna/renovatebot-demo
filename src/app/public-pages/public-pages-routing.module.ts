import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DomainComponent } from './domain/domain.component';
import { AuthGuard } from '../shared/helpers/auth.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate : [AuthGuard]
  // },
  // {
  //   path: 'forgotPassword',
  //   component: ForgotPasswordComponent
  // },
  // {
  //   path:'logout',
  //   component:LogoutComponent
  // },
  // {
  //   path: 'domain',
  //   component: DomainComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule {}

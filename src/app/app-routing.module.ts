import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AuthGuard } from './utils/keycloak.guard';
​
const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () =>
      import('./public-pages/public-pages.module').then(
        m => m.PublicPagesModule
      ),
      canActivate: [AuthGuard]
  },
//   {
//     path: '**',
//     loadChildren: () =>
//       import('./public-pages/public-pages.module').then(
//         m => m.PublicPagesModule
//       ),
// ​
//   }
];
// const routes: Routes = [
//     {
//         path: 'publicpages',
//         children: [
//             {
//                 path: 'login',
//                 component: LoginComponent
//             },
//             {
//                 path: '',
//                 component: SignUpComponent
​
//             }
//         ]
//     }
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }] //enable providers for microfrontend
})
export class AppRoutingModule {}
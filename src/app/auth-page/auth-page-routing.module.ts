import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPagePage } from './auth-page.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPagePage
  },
  {
    path: 'register',
    loadChildren: () => import('../auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("../auth/login/login.module").then(
        (m) => m.LoginPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPagePageRoutingModule {}

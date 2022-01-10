import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout/layout.page';
import { AuthGuard } from './auth/auth/auth.guard';

const routes: Routes = [
  {
    // path: "",
    // loadChildren: () =>
    //   import("./layout/layout.module").then((m) => m.LayoutPageModule),
    path: "",
    component: LayoutPage,
    children: [
      {
        path: "home",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./pages/home/home.module").then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: "auth",
        data: {
          setLoginLayout: true
        },
        loadChildren: () => import('./auth-page/auth-page.module').then(m => m.AuthPagePageModule)
      },
      {
        path: "profil",
        loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'create-trip',
        loadChildren: () => import('./pages/create-trip/create-trip.module').then( m => m.CreateTripPageModule)
      },
      {
        path: 'create-place',
        loadChildren: () => import('./pages/create-place/create-place.module').then( m => m.CreatePlacePageModule)
      },
      //default route
      {
        path: "",
        redirectTo: "home", // Or whatever tabs is your default one
        pathMatch: "full",
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

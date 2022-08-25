import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { RedirectGuard } from './guards/redirect-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
     path: '404',
     component : PageNotFoundComponent
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule),
    canActivate: [RedirectGuard]
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  {
    path: 'users',
    component: ViewUsersComponent
  },
  {
    path: 'create',
    component: CreateUserComponent
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent
  },
  { 
    path: '**',   
    redirectTo: '/users', 
    pathMatch: 'full'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

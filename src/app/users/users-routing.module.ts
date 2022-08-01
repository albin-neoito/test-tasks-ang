import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { UsersComponent } from './users.component';

const userRoutes: Routes = [

    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                component: ViewUsersComponent
            },
            {
                path: 'create',
                component: CreateUserComponent
            },
            {
                path: ':id',
                component: UserDetailsComponent
            },
            {
                path: '**',
                redirectTo: '/users',
                pathMatch: 'full'
            }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

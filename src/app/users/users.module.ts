import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'angular-simple-tooltip';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    ViewUsersComponent,
    UserDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgxTrimDirectiveModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }

import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticateHttpInterceptor } from './HttpErrorInterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ViewUsersComponent,
    UserDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    NgxTrimDirectiveModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
      }
    ),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

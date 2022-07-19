import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable, throwError } from "rxjs";

@Injectable()
export class AuthenticateHttpInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) { }
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    this.router.navigate(['/404']);
                    return EMPTY;
                }
                return throwError(error);
            })
        );
    }

}
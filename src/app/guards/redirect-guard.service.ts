import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.LoginStatus) {
      this.router.navigate(['/users']);
    }
    return true;
  }
}

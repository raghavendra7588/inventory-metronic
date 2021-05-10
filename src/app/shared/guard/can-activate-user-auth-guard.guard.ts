import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})

export class CanActivateUserAuthGuardGuard implements CanActivate {

  returnValue: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    public toastr: ToastrService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      this.returnValue = true;
      return this.returnValue;
    }
    else {
      this.toastr.error('User is InActive. Kindly Take the Subscription');
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
      this.returnValue = true;
      return this.returnValue;
    }

  }

}

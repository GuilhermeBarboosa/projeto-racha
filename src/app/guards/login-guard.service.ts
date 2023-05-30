import { Observable } from 'rxjs';
import { NotifierService } from './../shared/notifier.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginServiceService } from './../service/login-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

constructor(
  private loginService: LoginServiceService,
  private router: Router,
  private notifier: NotifierService
) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  let url: string = state.url;
  return this.verifyLogin(next, url);
}
  verifyLogin(route: ActivatedRouteSnapshot, url: any): boolean {

    if (this.loginService.isLogin()) {
      return true;
    }
    this.notifier.ShowInfo("Você não está logado");
    this.router.navigate(['/login']);
    return false;
  }

}

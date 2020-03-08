import { monservice } from './monserice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardHome implements CanActivate {

  constructor(private route: Router, private service: monservice) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.service.getStorageUser().auth) {
            this.route.navigate(['/portail']);
          } else {
            return true
          }
    }
}

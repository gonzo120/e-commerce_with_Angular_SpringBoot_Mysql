import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setRoles(roles: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  public setToken(jwtToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  public clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles() && !!this.getToken();
  }

  public isAdmin(){
    const roles: any[]= this.getRoles();
    return roles[0].roleName ==='Admin';
  }
  
  public isUser(){
    const roles: any[]= this.getRoles();
    return roles[0].roleName ==='User';
  }
}

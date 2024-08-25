import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'http://localhost:9090/';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  headers = new HttpHeaders({
    'Authorization': 'Bearer ', // Reemplaza con tu token de autenticación
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  onSignin(LoginData: any): Observable<any> {
    console.log(LoginData);
    return this.http.post(this.baseUrl + 'authenticate', LoginData, {
      headers: this.requestHeader,
    });
  }
  onSignUp(LoginData: any): Observable<any> {
    console.log(LoginData);
    return this.http.post(this.baseUrl + 'registerNewUser', LoginData, {
      headers: this.requestHeader,
    });
  }
  public forUser() {
    return this.http.get(this.baseUrl + 'forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.http.get(this.baseUrl + 'forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } 
        }
      }
    } return isMatch;
  }
}

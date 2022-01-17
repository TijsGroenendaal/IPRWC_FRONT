import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { UserModel } from "./user.model";
import { Injectable } from "@angular/core";
import { StateService } from "../state.service";
import { Router } from "@angular/router";

@Injectable({
 providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private router: Router,
  ) {}

  public login(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(environment.apiUrl + '/auth/login', {
      username,
      password,
    });
  }

  public signup(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(environment.apiUrl + '/auth/signin', {
      username,
      password,
    })
  }

  public logout(): Observable<void> {
    return this.http.post<void>(environment.apiUrl + '/auth/logout', {});
  }

  public checkIfLoggedIn(): Observable<UserModel> {
    return this.http.get<UserModel>(environment.apiUrl + '/auth/user')
  }

  public redirectToHome(user: UserModel) {
    this.stateService.setUser(user);
    switch (user.role) {
      case 'customer':
        this.router.navigate(['shop']);
        break;
      case 'admin':
        this.router.navigate(['console'])
    }

  }
}

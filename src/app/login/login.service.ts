import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UserModel } from "./user.model";
import { Injectable } from "@angular/core";
import { StateService } from "../components/state.service";
import { Router } from "@angular/router";

@Injectable()
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

  public checkIfLoggedIn(): Observable<UserModel> {
    return this.http.get<UserModel>(environment.apiUrl + '/auth/user')
  }

  public redirectToHome(user: UserModel) {
    this.stateService.setUser(user);
    switch (user.role) {
      case 'customer':
        this.router.navigate(['home']);
        break;
      case 'admin':
        this.router.navigate(['console'])
    }

  }
}

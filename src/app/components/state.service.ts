import { UserModel } from "./login/user.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public observable: Subject<UserModel> = new Subject<UserModel>();

  getUser(): UserModel {
    return JSON.parse(localStorage.getItem('user') || '{}') as UserModel;
  }

  setUser(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    this.observable.next(user);
  }

  deleteUser() {
    localStorage.removeItem('user');
    this.observable.next(new UserModel("", "", "") );
  }
}

import {Component, ViewChild} from '@angular/core';
import {PassableInterface} from "../modal/passable.interface";
import {ModalComponent} from "../modal/modal.component";
import {StateService} from "../state.service";
import {UserModel} from "../login/user.model";
import {LoginService} from "../login/login.service";
import {SnackbarService} from "../snackbar/snackbar.service";
import {SnackbarType} from "../snackbar/snackbar-type.enum";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends PassableInterface<UserModel>{
  @ViewChild('modalComponent')
  modal: ModalComponent<AccountComponent>;
  public user: UserModel;

  constructor(
    private stateService: StateService,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
  ) {
    super();
    this.user = stateService.getUser();
    this.stateService.observable.subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  public logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.snackbarService.show("Logout Successfully", SnackbarType.SUCCESS);
        this.stateService.deleteUser();
        this.close();
      }
    });
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

}

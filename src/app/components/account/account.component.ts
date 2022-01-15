import { Component, ViewChild } from '@angular/core';
import { PassableInterface } from "../modal/passable.interface";
import { ModalComponent } from "../modal/modal.component";
import { StateService } from "../state.service";
import { UserModel } from "../../login/user.model";

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
  ) {
    super();
    this.user = stateService.getUser();
  }


}

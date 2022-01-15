import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { PassableInterface } from './passable.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent<T extends PassableInterface<any>> {
  display = true;

  constructor(private modalService: ModalService<T>) {}

  async close(): Promise<void> {
    this.display = false;

    await this.modalService.close();
  }
}

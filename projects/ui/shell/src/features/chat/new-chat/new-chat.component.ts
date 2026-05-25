import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ClaritySharedModule } from '@identora/ui';

@Component({
  selector: 'app-new-chat',
  imports: [CommonModule, FormsModule, ClaritySharedModule],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.scss'
})
export class NewChatComponent implements OnInit {
  @Output() onOK = new EventEmitter<any>();

  public visible = false;
  public modalBtnState = ClrLoadingState.DEFAULT;

  usuariosTeste: any[] = [];
  actualPage = 1;
  pagesNumber = 0;
  pageSize = 4;
  loading = true;

  ngOnInit(): void {}

  open(): void {
    this.loading = true;
    this.getData();
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  getData() {}

  async createChat(usuario: any) {
    this.modalBtnState = ClrLoadingState.LOADING;
    this.close();
    this.modalBtnState = ClrLoadingState.DEFAULT;
  }

  getPagesNumber(n: number) {
    this.pagesNumber = this.isInt(n / this.pageSize)
      ? n / this.pageSize
      : Math.ceil(n / this.pageSize);
    if (this.actualPage > this.pagesNumber) this.actualPage = this.pagesNumber;
    else if (this.actualPage === 0 && this.pagesNumber > 0) this.actualPage = 1;
  }

  isInt(n: number) { return Number(n) === n && n % 1 === 0; }
  isFloat(n: number) { return Number(n) === n && n % 1 !== 0; }
}

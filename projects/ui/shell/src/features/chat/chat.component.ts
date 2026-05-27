import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClaritySharedModule } from '@sp1ne/angular';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, ClaritySharedModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public msg = '';
  public search = '';
  public loading = true;
  public filteringChats = false;
  public channels: any[] = [];
  public updatedDataSub!: Subscription;
  public chatsView = this.channels;
  activeChat: any = null;

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.updatedDataSub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    let msgbox = document.querySelector('.msg_history');
    if (msgbox) msgbox.scrollTop = msgbox.scrollHeight;
  }

  getData() {}

  choseActive(chatSelected: any) {}

  sendMessage(channel_id: any, text: any) {}

  changedValue(value: any) {
    this.filteringChats = true;
    this.chatsView = this.channels.filter(chat =>
      chat.channel_name.toLowerCase().includes(value.toLowerCase())
    );
    this.filteringChats = false;
  }

  rollChatScroll() {
    setTimeout(() => {
      let msgbox = document.querySelector('.msg_history');
      if (msgbox) msgbox.scrollTop = msgbox.scrollHeight;
    }, 5);
  }

  atualizaDados(data: any) {
    try {
      let index = this.channels.findIndex(channel => channel.channel_id === data.channel_id);
      if (index !== -1) {
        this.channels[index].messages.push(data);
        this.rollChatScroll();
        this.changeDetectorRef.detectChanges();
      }
    } catch (error) {
      console.error('erro inserindo mensagem', error);
    }
  }
}

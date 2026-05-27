import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaritySharedModule } from '@sp1ne/angular';

@Component({
  selector: 'app-token',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss'
})
export class TokenComponent implements OnInit, OnDestroy {
  public token: any;

  ngOnInit(): void {
    this.getToken();
  }

  ngOnDestroy(): void {}

  getToken() {}

  showToken(token: any) {
    this.copyToClipboard(token);
  }

  copyToClipboard(script: any) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = script;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

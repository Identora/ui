import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaritySharedModule } from '@identora/ui';

@Component({
  selector: 'app-info',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit, OnDestroy {
  public options = null;

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}

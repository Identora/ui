import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClaritySharedModule } from '@sp1ne/angular';

@Component({
  selector: 'app-notifications',
  imports: [FormsModule, ClaritySharedModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public options = null;

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}

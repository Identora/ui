import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaritySharedModule } from '@identora/ui';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {}

  fileChangeEvent(event: any): void {}
}

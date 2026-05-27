import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ClaritySharedModule, Route } from '@sp1ne/angular';

@Component({
  selector: 'app-multipages',
  imports: [CommonModule, ClaritySharedModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './multipage.component.html',
})
export class MultipagesComponent implements OnInit {

  constructor(public routers: Router) {}

  @Input() routed!: Route;
  @Input() router: any;
  @Input() loading!: Boolean;

  ngOnInit(): void {}
}

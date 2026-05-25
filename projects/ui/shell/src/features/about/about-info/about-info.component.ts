import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaritySharedModule } from '@identora/ui';
import { APP_PACKAGE_INFO, PackageInfo } from '../../../tokens';

@Component({
  selector: 'about-info',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './about-info.component.html',
  styleUrl: './about-info.component.scss'
})
export class AboutInfoComponent implements OnInit {
  public packagejson: PackageInfo = {};

  constructor(@Optional() @Inject(APP_PACKAGE_INFO) private packageInfo: PackageInfo | null) {}

  ngOnInit() {
    this.packagejson = this.packageInfo ?? {};
  }
}

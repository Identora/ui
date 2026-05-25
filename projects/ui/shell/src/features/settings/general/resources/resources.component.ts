import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClaritySharedModule } from '@identora/ui';

@Component({
  selector: 'app-resources',
  imports: [FormsModule, ClaritySharedModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent implements OnInit, OnDestroy {
  public options = null;

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}

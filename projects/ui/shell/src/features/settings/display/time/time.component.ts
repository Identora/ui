import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ClaritySharedModule } from '@sp1ne/angular';

export interface TimeZoneSelect {
  view: string;
  value: string;
}

@Component({
  selector: 'app-time',
  imports: [CommonModule, ReactiveFormsModule, ClaritySharedModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit, OnDestroy {
  public settingsForm!: FormGroup;
  public offsetTmz: TimeZoneSelect[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.offsetTmz.sort();
  }

  ngOnDestroy(): void {}

  initForm() {
    this.settingsForm = this.formBuilder.group({
      timezone: [''],
      showlogs: [false],
    });
  }
}

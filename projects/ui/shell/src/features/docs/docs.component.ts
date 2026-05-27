import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaritySharedModule } from '@sp1ne/angular';

export interface DocItem {
  doc_icon: string;
  doc_name: string;
  doc_info: string;
  doc_path: string;
}

@Component({
  selector: 'app-docs',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent implements OnInit {
  @Input() logger: any;
  @Input() docs: DocItem[] = [];

  year = new Date().getFullYear();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  goToDoc(url: string) {
    this.http.get('http://localhost:3000/auth/init', {
      headers: new HttpHeaders({
        Authorization: 'Bearer 1234',
        backToOrigin: window.location.href
      }),
      withCredentials: true
    }).subscribe({
      next: () => { window.open(`http://localhost:3000${url}`, '_blank'); },
      error: () => { alert('Falha na autenticação'); }
    });
  }
}

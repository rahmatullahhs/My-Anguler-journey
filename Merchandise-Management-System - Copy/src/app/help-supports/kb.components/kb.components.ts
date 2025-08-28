import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kb.components',
  standalone: false,
  templateUrl: './kb.components.html',
  styleUrl: './kb.components.css'
})
export class KbComponents implements OnInit{
articles: KbComponents[] = [];
  searchTerm: string = '';
  title: any;
summary: any;
id: any|string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<KbComponents[]>('assets/kb-data.json').subscribe(data => {
      this.articles = data;
    });
  }

  filteredArticles(): KbComponents[] {
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

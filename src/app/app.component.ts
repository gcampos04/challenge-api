import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  opened: boolean = false;
  title = 'challenge-api';

  constructor(
    private titleService: Title,
    private router: Router,
    private activeRouted: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const defaultTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child = this.activeRouted.firstChild;
          return child?.snapshot.data['title'] ?? defaultTitle;
        })
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }

  toggle() {
    this.opened = !this.opened;
  }
}

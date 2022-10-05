import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  opened: boolean = false;
  title = 'challenge-api';

  toggle() {
    this.opened = !this.opened;
  }
}

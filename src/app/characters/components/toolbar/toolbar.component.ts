import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CharactersService } from 'src/app/characters/services/characters.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private _charactersService: CharactersService) {}

  timer: any;
  search(inputSearch: HTMLInputElement) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this._charactersService.searchCharacters(inputSearch.value);
    }, 500);
  }
}

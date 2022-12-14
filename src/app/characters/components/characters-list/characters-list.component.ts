import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/characters/components/modal/modal.component';

import { allCharacters } from '../../model/character';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  //Variaveis
  offset: number = 9;

  allCharacters: allCharacters[] = [];

  allSeries: any;
  allComics: any;

  isLoading: boolean = true;

  //Decorators
  @ViewChild('container') container!: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const heightContainer = this.container.nativeElement.scrollHeight;
    const toolbar = document.documentElement.scrollHeight - heightContainer;
    const scroll = document.documentElement.scrollTop + toolbar;
    const documentheight = document.documentElement.scrollHeight - 725;

    if (
      scroll >= documentheight / 2 &&
      !this._charactersService.haveRequest &&
      !this._charactersService.searching
    ) {
      this._charactersService.getAllCharacters(this.offset, 9);
      this.offset += 9;
    }
  }

  constructor(
    private _charactersService: CharactersService,
    private liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {
    this._charactersService.getAllCharacters(0, 9);
  }

  searchState: boolean = false;

  ngOnInit(): void {
    this.getCharacters();
  }

  onOpenModalSeries(idCharacter: number, nameCharacter: string) {
    this.isLoading = true;
    this._charactersService.getCharacterSeries(idCharacter).subscribe(
      (res: any) => {
        this.allSeries = res?.data?.results;
        const dialogRef = this.dialog.open(ModalComponent, {
          data: {
            name: nameCharacter,
            info: this.allSeries,
            type: 'series',
            length: this.allSeries.length,
          },
        });
        this.isLoading = false;
        this.liveAnnouncer.announce('Open character series list.');
        dialogRef.afterClosed().subscribe((result) => {
          this.liveAnnouncer.announce('Closed character series list.');
        });
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  onOpenModalComics(idCharacter: number, nameCharacter: string) {
    this.isLoading = true;
    this._charactersService.getCharacterComics(idCharacter).subscribe(
      (res: any) => {
        this.isLoading = true;
        this.allComics = res?.data?.results;
        const dialogRef = this.dialog.open(ModalComponent, {
          data: {
            name: nameCharacter,
            info: this.allComics,
            type: 'comics',
            length: this.allComics.length,
          },
        });
        this.isLoading = false;
        this.liveAnnouncer.announce('Open character comics list.');
        dialogRef.afterClosed().subscribe((result) => {
          this.liveAnnouncer.announce('Closed character comics list.');
        });
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  getCharacters() {
    this._charactersService.characters$.subscribe((res: any) => {
      if (res) {
        res.length !== 0
          ? this.liveAnnouncer.announce('Search return completed.')
          : this.liveAnnouncer.announce('Character not found.');
        this.isLoading = false;
        if (this.searchState != this._charactersService.searching) {
          this.searchState = this._charactersService.searching;
          this.allCharacters = [];
        }

        if (!this._charactersService.searching) {
          this.allCharacters.push(...res);
        } else {
          this.allCharacters = res;
        }
      }
    });
  }
}

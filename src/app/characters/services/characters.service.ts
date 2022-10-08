import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LoadingService } from 'src/app/shared/components/loading/services/loading.service';
import { ErrorMsgEnum } from 'src/app/shared/enum/error-msg';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private timestamp: number = new Date().getTime();
  private hash: string;
  private apiUrl: string = 'https://gateway.marvel.com/v1/public/characters';
  private authUrl: string;

  public haveRequest: boolean = false;
  public searching: boolean = false;

  characters = new BehaviorSubject<any>(null);

  get characters$() {
    return this.characters.asObservable();
  }

  constructor(
    private http: HttpClient,
    private _loadingService: LoadingService,
    public dialog: MatDialog,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.hash = Md5.hashStr(
      this.timestamp + environment.privateK + environment.publicK
    );
    this.authUrl = `${this.apiUrl}?ts=${this.timestamp}&apikey=${environment.publicK}&hash=${this.hash}`;
  }

  onError(errorMsg: string, reloading: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.liveAnnouncer.announce('Closed modal error.');
      if (reloading) window.location.reload();
    });
  }

  getAllCharacters(offset: number, limit: number) {
    this.haveRequest = true;

    const finalUrl = `${this.authUrl}&limit=${limit}&offset=${offset}`;
    const result: any = this.http.get(finalUrl);

    let subject = result
      .pipe(
        tap(() => {
          this.haveRequest = false;
          this._loadingService.hide();
        })
      )
      .subscribe(
        (res: any) => {
          this.characters.next(res.data.results);
        },
        (err: any) => {
          this.onError(ErrorMsgEnum.loadingList, true);
        }
      );
  }

  searchCharacters(search: string) {
    this._loadingService.show();

    if (search == '') {
      this.getAllCharacters(0, 9);
      return (this.searching = false);
    }

    this.haveRequest = true;
    this.searching = true;
    const finalUrl = `${this.authUrl}&nameStartsWith=${search}&limit=9`;
    const result: any = this.http.get(finalUrl);

    let subject = result
      .pipe(
        tap(() => {
          this.haveRequest = false;
          this._loadingService.hide();
        })
      )
      .subscribe(
        (res: any) => {
          this.characters.next(res.data.results);
        },
        (err: any) => {
          this.onError(ErrorMsgEnum.loadingList, true);
        }
      );
    return;
  }

  getCharacterSeries(idCharacter: number) {
    this._loadingService.show();

    const finalUrl = `${this.apiUrl}/${idCharacter}/series?ts=${this.timestamp}&apikey=${environment.publicK}&hash=${this.hash}`;
    const result: any = this.http.get(finalUrl);

    return result.pipe(
      tap({
        next: () => {
          this.haveRequest = false;
          this._loadingService.hide();
        },
        error: () => {
          this.haveRequest = false;
          this._loadingService.hide();
          this.onError(ErrorMsgEnum.loadingCharacterSeries, false);
        },
      })
    );
  }

  getCharacterComics(idCharacter: number) {
    this._loadingService.show();

    const finalUrl = `${this.apiUrl}/${idCharacter}/comics?ts=${this.timestamp}&apikey=${environment.publicK}&hash=${this.hash}`;
    const result: any = this.http.get(finalUrl);

    return result.pipe(
      tap({
        next: () => {
          this.haveRequest = false;
          this._loadingService.hide();
        },
        error: () => {
          this.haveRequest = false;
          this._loadingService.hide();
          this.onError(ErrorMsgEnum.loadingCharacterComics, false);
        },
      })
    );
  }
}

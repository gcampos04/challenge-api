import { series } from './../model/character';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs';

import { CharactersService } from './characters.service';
import { LoadingService } from 'src/app/shared/components/loading/services/loading.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpTestingController: HttpTestingController;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  let _loadingService: LoadingService;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [CharactersService],
      imports: [MatDialogModule, HttpClientTestingModule, NoopAnimationsModule],
    });
    service = TestBed.inject(CharactersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    _loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check have Request contiton searchCharacters', function () {
    service.searchCharacters('3-d');
    expect(service.haveRequest).toBeTrue();
  });

  it('check have Request contiton getCharacterSeries', function () {
    service.getCharacterSeries(1);
    expect(service.haveRequest).toBeFalse();
  });

  it('check have Request contiton getCharacterComics', function () {
    service.getCharacterComics(1);
    expect(service.haveRequest).toBeFalse();
  });

  it('makes expected calls getCharacterSeries', function () {
    spyOn(service, 'getCharacterSeries').and.callThrough();
    service.getCharacterSeries(1);
    expect(service.getCharacterSeries).toHaveBeenCalled();
  });

  it('makes expected calls searchCharacters', function () {
    spyOn(service, 'searchCharacters').and.callThrough();
    service.searchCharacters('3-d');
    expect(service.searchCharacters).toHaveBeenCalled();
  });

  it('makes expected calls getCharacterComics', function () {
    spyOn(service, 'getCharacterComics').and.callThrough();
    service.getCharacterComics(1);
    expect(service.getCharacterComics).toHaveBeenCalled();
  });
});

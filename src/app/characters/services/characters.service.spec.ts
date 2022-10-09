import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpTestingController: HttpTestingController;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, MatDialog, Overlay],
      imports: [MatDialogModule, HttpClientTestingModule, NoopAnimationsModule],
    });
    service = TestBed.inject(CharactersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check have Request contiton searchCharacters', function () {
    service.searchCharacters('3-d');
    expect(service.haveRequest).toBeTrue();
  });
});

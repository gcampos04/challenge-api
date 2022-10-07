import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(CharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

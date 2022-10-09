import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be hide', () => {
    expect(service.hide()).toEqual(undefined);
  });
  it('should be show', () => {
    expect(service.show()).toEqual(undefined);
  });
});

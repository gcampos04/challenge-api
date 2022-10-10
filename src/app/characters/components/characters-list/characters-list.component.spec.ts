import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import {
  mockCharacterComicsResponse,
  mockCharacterSeriesResponse,
  mockGetAllCharactersResponse,
} from 'src/app/mocks/characters.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharactersService } from '../../services/characters.service';
import { ModalComponent } from '../modal/modal.component';

import { CharactersListComponent } from './characters-list.component';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  let _charactersService: CharactersService;

  let idCharacter = 1010903;
  let nameCharacter = 'Teste Name Character';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersListComponent, ModalComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    _charactersService = TestBed.inject(CharactersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal about series of characters', () => {
    let idCharacter = 1010903;
    let nameCharacter = 'Teste Name Character';

    spyOn(_charactersService, 'getCharacterSeries')
      .withArgs(idCharacter)
      .and.returnValue(of(mockCharacterSeriesResponse));

    component.onOpenModalSeries(idCharacter, nameCharacter);

    expect(component.allSeries).toEqual(
      mockCharacterSeriesResponse.data.results
    );
  });

  it('should open modal about series of characters erro', () => {
    spyOn(_charactersService, 'getCharacterSeries')
      .withArgs(idCharacter)
      .and.returnValue(throwError(() => new Error('erro')));

    component.onOpenModalSeries(idCharacter, nameCharacter);

    expect(component.isLoading).toBeFalse();
  });

  it('should open modal about comics of characters', () => {
    spyOn(_charactersService, 'getCharacterComics')
      .withArgs(idCharacter)
      .and.returnValue(of(mockCharacterComicsResponse));

    component.onOpenModalComics(idCharacter, nameCharacter);

    expect(component.allComics).toEqual(
      mockCharacterComicsResponse.data.results
    );
  });

  it('should open modal about comics of characters erro', () => {
    spyOn(_charactersService, 'getCharacterComics')
      .withArgs(idCharacter)
      .and.returnValue(throwError(() => new Error('erro')));

    component.onOpenModalComics(idCharacter, nameCharacter);

    expect(component.isLoading).toBeFalse();
  });

  it('should test HostListener', () => {
    component.onWindowScroll();
    expect(component.offset).toBe(9);
  });
});

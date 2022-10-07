import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CharactersListComponent } from './characters-list.component';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersListComponent],
      providers: [HttpClient, HttpHandler, MatDialog, Overlay],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CharactersService } from '../../services/characters.service';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let _charactersService: CharactersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        AppComponent,
        HttpClient,
        HttpHandler,
        MatDialog,
        Overlay,
        { provide: ActivatedRoute, useValue: ActivatedRoute },
      ],
      imports: [MatDialogModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    _charactersService = TestBed.inject(CharactersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search through methodh', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    component.search(input);

    expect(component.search(input)).toBeUndefined();
  });

  it('should render time in charactersService', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    component.timer = 500;
    jasmine.clock().install();
    component.search(input);
    jasmine.clock().tick(5000);
    expect(component.timer).toBeTruthy();
  });
});

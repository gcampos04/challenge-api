import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './components/modal/modal.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [CharactersListComponent, ModalComponent, ToolbarComponent],
  imports: [CommonModule, CharactersRoutingModule, SharedModule],
})
export class CharactersModule {}

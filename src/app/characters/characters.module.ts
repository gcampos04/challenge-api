import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CharactersListComponent],
  imports: [CommonModule, CharactersRoutingModule, SharedModule],
})
export class CharactersModule {}

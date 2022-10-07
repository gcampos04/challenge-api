import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ToolbarComponent, LoadingComponent, ModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, MaterialModule, ModalComponent],
})
export class SharedModule {}

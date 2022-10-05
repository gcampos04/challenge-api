import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [ToolbarComponent, LoadingComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, MaterialModule],
})
export class SharedModule {}

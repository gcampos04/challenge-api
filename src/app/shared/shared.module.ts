import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';

import { LoadingComponent } from './components/loading/loading.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, MaterialModule, A11yModule],
  exports: [MaterialModule, LoadingComponent],
})
export class SharedModule {}

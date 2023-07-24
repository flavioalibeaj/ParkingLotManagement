import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleLogComponent } from './single-log/single-log.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialogModule } from '@angular/material/dialog';
// import { ModalComponent } from './modal/modal.component';






@NgModule({
  declarations: [
    LogsComponent,
    SingleLogComponent,
    // ModalComponent,
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    // MatDialogModule
  ]
})
export class LogsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SingleLogComponent } from './single-log/single-log.component';



@NgModule({
  declarations: [
    LogsComponent,
    SingleLogComponent,
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class LogsModule { }

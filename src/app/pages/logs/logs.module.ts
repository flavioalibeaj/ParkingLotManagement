import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  ]
})
export class LogsModule { }

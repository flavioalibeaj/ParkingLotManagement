import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs.component';
import { NewLogComponent } from './new-log/new-log.component';

const routes: Routes = [
  { path: "", component: LogsComponent },
  { path: "new", component: NewLogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }

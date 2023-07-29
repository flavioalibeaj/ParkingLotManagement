import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs.component';
import { SingleLogComponent } from './single-log/single-log.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: LogsComponent
      },
      {
        path: ":code",
        component: SingleLogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }

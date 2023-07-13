import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "logs", loadChildren: () => import("./logs/logs.module").then(m => m.LogsModule) },
  { path: "subscribers", loadChildren: () => import("./subscribers/subscribers.module").then(m => m.SubscribersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

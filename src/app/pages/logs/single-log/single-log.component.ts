import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-single-log',
  templateUrl: './single-log.component.html'
})
export class SingleLogComponent implements OnInit {

  logCode!: string
  log!: Logs
  isDangerShown: boolean = false
  errorMessage?: string
  alertTimeout: any

  constructor(private activeRoute: ActivatedRoute, private logService: LogsService, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.logCode = params['code']
      this.getData()
    })
  }


  getData() {
    this.logService.getOne(this.logCode).subscribe({
      next: (value: Logs) => {
        this.log = value
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  navigate(id: number) {
    this.router.navigate([`subscriptions/${id}`])
  }

  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    }, 3000)
  }

}

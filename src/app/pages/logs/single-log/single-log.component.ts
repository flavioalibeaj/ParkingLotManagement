import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-single-log',
  templateUrl: './single-log.component.html',
  styleUrls: ['./single-log.component.css']
})
export class SingleLogComponent implements OnInit {

  logCode!: string
  log!: Logs
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  errorMessage?: string
  successMessage?: string
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
        console.log("Error Retrieving Log", err)
        this.errorMessage = err
        this.errorAlert(this.errorMessage)
        // throw err
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
    })
  }

  successAlert(success?: string) {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 2500)
  }

}

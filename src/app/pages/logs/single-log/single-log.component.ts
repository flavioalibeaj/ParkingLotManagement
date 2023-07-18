import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activeRoute: ActivatedRoute, private logService: LogsService) {
    this.activeRoute.queryParams.subscribe(data => {
      console.log(data)
    })
  }

  ngOnInit() {
    // this.activeRoute.params.subscribe(params => {
    //   this.logCode = params['code']
    // })

  }

  getData() {
    this.logService.getOne(this.logCode).subscribe({
      next: (value: Logs) => {
        this.log = value
      },
      error: (err) => {
        console.log("Error retrieving Log")
        throw err
      }
    })
  }

}

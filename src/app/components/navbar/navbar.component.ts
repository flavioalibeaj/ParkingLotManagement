import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  searchForm!: FormGroup

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(null)
    })
  }

  search() {
    console.log(this.searchForm.value)
    this.searchService.dataPassingEvent(this.searchForm.get('searchTerm')?.value)
  }

  @Input() title!: string

}

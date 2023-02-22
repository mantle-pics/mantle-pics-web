import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-search',
  templateUrl: './info-search.component.html',
  styleUrls: ['./info-search.component.scss']
})
export class InfoSearchComponent {
  address?: string

  constructor(private router: Router) { }

  next() {
    this.router.navigate([`/info/${this.address}`])
  }
}

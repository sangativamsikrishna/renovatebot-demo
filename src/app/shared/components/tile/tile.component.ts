import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() label: string;
  @Input() icon: string;
  @Input('href') routerLink: string;
  // @Input() routerLink: string;
  // @Input() enableAddNew: boolean;
  // @Input() addNewAuthority: string;
  @Input() listViewAuthority: string;
  addNewRouterLink: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;
    this.listViewAuthority = `${currentUrl + '/' + this.routerLink}`;
    this.addNewRouterLink = `${this.routerLink}/form`;
  }
}

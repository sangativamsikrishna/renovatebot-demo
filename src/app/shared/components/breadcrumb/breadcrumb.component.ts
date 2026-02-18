import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from 'ng6-breadcrumbs/lib/breadcrumbs.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<IBreadcrumb>;

  private currentBreadcrumbs: Array<IBreadcrumb>;
  constructor() {}

  ngOnInit(): void {}
}

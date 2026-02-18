import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input('columns') columnsList: any = [];
  @Input('rows') rowsList: any = [];
  @Input('title') title: string;
  @Input('addNewUrl') addNewUrl: string;
  tableOffset: any = 0;
  today: number = Date.now();
  temp = [];
  rows = [];
  columns = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.columns = this.columnsList;
    this.rows = this.rowsList;
  }

  onChange(event: any): void {
    this.tableOffset = event.offset;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.tableOffset = 0;
  }
}

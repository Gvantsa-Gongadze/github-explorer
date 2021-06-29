import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Repository } from 'src/app/app.types';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.scss']
})
export class TabularComponent implements OnInit {
  @Input()
  set repoList(repos: Repository[]) {
    this.dataSource.data = repos;
  }
  dataSource = new MatTableDataSource<Repository>([]);
  displayedColumns: string[] = [ 'position', 'name', 'owner', 'language', 'button' ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

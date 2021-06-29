import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/app.types';

@Component({
  selector: 'app-card-format',
  templateUrl: './card-format.component.html',
  styleUrls: ['./card-format.component.scss']
})
export class CardFormatComponent implements OnInit {

  @Input() repoList: Repository[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}

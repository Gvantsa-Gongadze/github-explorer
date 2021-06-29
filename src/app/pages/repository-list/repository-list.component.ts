import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiRepositoryService } from '../../api-repository.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Repository } from 'src/app/app.types';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit, OnDestroy {

  querySub!: Subscription;
  filterSub: Subscription;
  formatSub: Subscription;
  routeSub!: Subscription;

  search = new FormControl('', [ Validators.required ]);
  fromat = new FormControl('tabular');

  repoList: Repository[] = [];
  totalRepositories = 0;
  fromatValue = 'tabular';
  pageCounter = 1;
  isLoading = false;

  constructor(
    private apiReposirotyService: ApiRepositoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filterSub = this.search.valueChanges.pipe(
      tap(() => this.isLoading = true),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((input: string) => {
      const queryParams: Params = { search: input };
      this.router.navigate([], { queryParams });

      if (input) {
        this.pageCounter = 1;
        this.getReopsitoryList(input);
      } else {
        this.pageCounter = 1;
        this.repoList = [];
        this.isLoading = false;
      }
    });
    this.formatSub = this.fromat.valueChanges.subscribe((value) => {
      this.fromatValue = value;
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      if (params.search){
        this.pageCounter = 1;
        this.search.setValue(params.search);
        this.getReopsitoryList(params.search);
      }
    });
  }

  getReopsitoryList(input: string): void {
    this.isLoading = true;
    this.querySub = this.apiReposirotyService.queryRepositories(input, this.pageCounter).subscribe((value) => {
      this.repoList = value.items;
      this.totalRepositories = value.total_count;
      this.isLoading = false;
    });
  }
  onPaginateChange(event: PageEvent): void {
    const input = this.search.value || this.route.snapshot.queryParams.search || null;
    if (event.pageIndex > (event.previousPageIndex ?? 0)) {
      this.pageCounter ++;
    } else {
      this.pageCounter --;
    }
    if (input) {
      this.getReopsitoryList(input);
    }
  }

  ngOnDestroy(): void {
    if (this.filterSub){
      this.filterSub.unsubscribe();
    }
    if (this.querySub){
      this.querySub.unsubscribe();
    }
    if (this.formatSub){
      this.formatSub.unsubscribe();
    }
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}

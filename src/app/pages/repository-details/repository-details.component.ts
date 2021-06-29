import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Repository, RepositoryParams } from 'src/app/app.types';
import { ApiRepositoryService } from '../../api-repository.service';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit, OnDestroy {

  routeSub!: Subscription;
  repoDetailSub!: Subscription;

  repoParams!: RepositoryParams;
  repoData!: Repository;

  constructor(
    private route: ActivatedRoute,
    private apiReposirotyService: ApiRepositoryService
  ) {}

  ngOnInit(): void {
    this.routeSub = (this.route.queryParams as Observable<RepositoryParams>).subscribe((params) => {
      this.repoParams = params;
    });
    this.getRepoDetais();
  }

  getRepoDetais(): void {
    this.repoDetailSub = this.apiReposirotyService
    .getRepositoryDetails(this.repoParams.owner, this.repoParams.repo)
    .subscribe((value: Repository) => {
      this.repoData = value;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
    if (this.repoDetailSub){
      this.repoDetailSub.unsubscribe();
    }
  }
}

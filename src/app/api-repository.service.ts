import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryRepositoriesReponse, RepositoryDetailsReponse } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class ApiRepositoryService {

  constructor(private httpClient: HttpClient) { }

  queryRepositories(input: string, page: number = 1): Observable<QueryRepositoriesReponse> {
    return this.httpClient.get('https://api.github.com/search/repositories', {
      params: {
        q: input,
        page: page.toString(),
        per_page: '10'
      },
      headers: {
        Authorization: environment.AuthToken
      }
    }) as Observable<QueryRepositoriesReponse>;
  }

  getRepositoryDetails(owner: string, repo: string): Observable<RepositoryDetailsReponse>  {
    return this.httpClient.get(`https://api.github.com/repos/${owner}/${repo}`) as Observable<RepositoryDetailsReponse>;
  }
}

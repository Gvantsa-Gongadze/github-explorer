import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoryDetailsComponent } from './pages/repository-details/repository-details.component';
import { RepositoryListComponent } from './pages/repository-list/repository-list.component';

const routes: Routes = [
  { path: '', component: RepositoryListComponent },
  { path: ':id', component: RepositoryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

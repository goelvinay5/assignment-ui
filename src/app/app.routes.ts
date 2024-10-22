import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs', component: BlogListComponent }
];

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://localhost:7067/api/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlog(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }
  createBlog(blog: Blog): Observable<any> {
    return this.http.post(`${this.apiUrl}`, blog);
  }

  updateBlog(Blog: Blog): Observable<void> {
    console.log("updateBlog");
    return this.http.put<void>(`${this.apiUrl}/${Blog.id}`, Blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

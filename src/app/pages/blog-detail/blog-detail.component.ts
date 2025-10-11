import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../blogs/blogs.component'; // Re-use the BlogPost interface

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: BlogPost | undefined;
  loading = true;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId = params.get('id');
      if (blogId) {
        this.fetchBlogDetail(blogId);
      } else {
        this.error = 'Blog ID not provided.';
        this.loading = false;
      }
    });
  }

  fetchBlogDetail(id: string): void {
    this.http.get<BlogPost>(`${environment.apiUrl}/blogs/${id}`).subscribe({
      next: (data) => {
        this.blog = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching blog details:', err);
        this.error = 'Failed to load blog details.';
        this.loading = false;
      }
    });
  }
}
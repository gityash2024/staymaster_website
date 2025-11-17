import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  relatedBlogs: BlogPost[] = [];
  loading = true;
  error: string | undefined;
  expandedFaqs: boolean[] = [];
  showBackToTop = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId = params.get('id');
      if (blogId) {
        this.fetchBlogDetail(blogId);
        this.fetchRelatedBlogs();
      } else {
        this.error = 'Blog ID not provided.';
        this.loading = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  fetchBlogDetail(id: string): void {
    this.http.get<BlogPost>(`${environment.apiUrl}/blogs/${id}`).subscribe({
      next: (data) => {
        this.blog = data;
        this.loading = false;
        // Initialize FAQ expansion state
        if (this.blog.qa_section) {
          this.expandedFaqs = new Array(this.blog.qa_section.length).fill(false);
        }
      },
      error: (err) => {
        console.error('Error fetching blog details:', err);
        this.error = 'Failed to load blog details.';
        this.loading = false;
      }
    });
  }

  fetchRelatedBlogs(): void {
    this.http.get<BlogPost[]>(`${environment.apiUrl}/blogs`).subscribe({
      next: (data) => {
        // Get 3 random related blogs (excluding current blog)
        this.relatedBlogs = data
          .filter(blog => blog.id !== this.blog?.id)
          .slice(0, 3);
      },
      error: (err) => {
        console.error('Error fetching related blogs:', err);
      }
    });
  }

  toggleFaq(index: number): void {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
  }

  getTags(keywords: string): string[] {
    return keywords.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.blog?.title || '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.blog?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.blog?.title || '');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
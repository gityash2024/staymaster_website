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

  formatBlogContent(content: string): string {
    // Remove consecutive <br> tags
    content = content.replace(/(<br\s*\/?>){2,}/gi, '<br>');
    
    // Remove empty paragraphs
    content = content.replace(/<p>\s*<\/p>/gi, '');
    
    // Ensure images are responsive and properly styled
    content = content.replace(/<img/gi, '<img loading="lazy"');
    
    // Add proper spacing around headings
    content = content.replace(/(<h[1-6]>)/gi, '<div style="margin-top: 1.5em;">$1');
    content = content.replace(/(<\/h[1-6]>)/gi, '$1</div>');
    
    // Ensure lists are properly indented
    content = content.replace(/<(ul|ol)>/gi, '<$1 style="padding-left: 2rem;">');
    
    // Add proper styling to blockquotes
    content = content.replace(/<blockquote>/gi, '<blockquote style="border-left: 4px solid #009688; padding: 1em 2em; background: #f8f9fa;">');
    
    return content;
  }

  fetchBlogDetail(id: string): void {
    this.http.get<BlogPost>(`${environment.apiUrl}/blogs/${id}`).subscribe({
      next: (data) => {
        // Format the blog content before displaying
        if (data.content) {
          data.content = this.formatBlogContent(data.content);
        }
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

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
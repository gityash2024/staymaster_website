import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { environment } from 'src/environments/environment'; // Import environment

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author_id: number;
  featured_image: string;
  category: string;
  meta_tags: string;
  keywords: string;
  qa_section: { question: string; answer: string }[];
  active: boolean;
  created_at: string;
  updated_at: string;
  written_by?: string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, AfterViewInit, OnDestroy { // Implement OnInit
  /** Today */
  today: Date = new Date();
  /** Calculated card width incl. gap */
  private cardWidth = 0;
  /** UI categories rendered below the hero section **/
  categories: string[] = []; // Will be fetched dynamically

  selectedCategory = 'Latest'; // Default or first category

  /** Featured banner post **/
  featuredPost: BlogPost | undefined; // Will be fetched dynamically

  /** Horizontal carousel logic **/
  private _postsContainer?: ElementRef<HTMLDivElement>;

  @ViewChild('postsContainer', { static: false })
  set postsContainer(element: ElementRef<HTMLDivElement> | undefined) {
    this._postsContainer = element;
    if (this._postsContainer && this._postsContainer.nativeElement) {
      const firstCard = this._postsContainer.nativeElement.querySelector('.post-card') as HTMLElement;
      if (firstCard) {
        this.cardWidth = firstCard.offsetWidth + 30; // 30px is the gap defined in SCSS
        console.log('postsContainer setter - cardWidth:', this.cardWidth);
        console.log('postsContainer setter - postsContainer offsetWidth:', this._postsContainer.nativeElement.offsetWidth);
        console.log('postsContainer setter - postsContainer scrollWidth:', this._postsContainer.nativeElement.scrollWidth);
      }
      // Only start carousel if there are blogs and more than CARDS_PER_PAGE
      if (this.blogs.length > this.CARDS_PER_PAGE) {
        this.slideInterval = setInterval(() => this.nextSlide(), this.slideDuration);
      }
    }
  }

  get postsContainer(): ElementRef<HTMLDivElement> | undefined {
    return this._postsContainer;
  }
  currentSlide = 0;
  private slideInterval?: any;
  private readonly slideDuration = 4000; // ms
  private readonly CARDS_PER_PAGE = 5; // Number of cards to show per slide

  blogs: BlogPost[] = []; // Renamed from posts to blogs for clarity

  get numPages(): number {
    return Math.ceil(this.blogs.length / this.CARDS_PER_PAGE);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBlogs();
    this.fetchCategories();
  }

  ngAfterViewInit(): void {
    // Logic moved to postsContainer setter
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    if (!this.postsContainer || !this.postsContainer.nativeElement || this.blogs.length === 0) return;

    const numPages = Math.ceil(this.blogs.length / this.CARDS_PER_PAGE);
    this.currentSlide = (this.currentSlide + 1) % numPages;

    const scrollAmount = this.CARDS_PER_PAGE * this.cardWidth;
    console.log('nextSlide - currentSlide:', this.currentSlide);
    console.log('nextSlide - scrollAmount (CARDS_PER_PAGE * cardWidth):', scrollAmount);
    console.log('nextSlide - target scrollLeft:', this.currentSlide * scrollAmount);
    console.log('nextSlide - postsContainer offsetWidth:', this.postsContainer.nativeElement.offsetWidth);
    console.log('nextSlide - postsContainer scrollWidth:', this.postsContainer.nativeElement.scrollWidth);

    this.postsContainer.nativeElement.scrollTo({
      left: this.currentSlide * scrollAmount,
      behavior: 'smooth'
    });
  }

  fetchBlogs(): void {
    this.http.get<BlogPost[]>(`${environment.apiUrl}/blogs`).subscribe({ // Assuming /blogs endpoint
      next: (data) => {
        this.blogs = data;
        if (this.blogs.length > 0) {
          this.featuredPost = this.blogs[0]; // Set the first blog as featured
        }
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      }
    });
  }

  fetchCategories(): void {
    // Assuming a backend endpoint for categories, or derive from blogs
    // For now, let's derive unique categories from fetched blogs
    // In a real app, you'd have a dedicated /categories endpoint
    this.http.get<any[]>(`${environment.apiUrl}/blogs/categories`).subscribe({ // Corrected endpoint
      next: (data) => {
        // Assuming data is an array of category objects with a 'name' property
        this.categories = ['Latest', ...new Set(data)];
        if (this.categories.length > 0 && !this.selectedCategory) {
          this.selectedCategory = this.categories[0];
        }
      },
      error: (err) => {
        console.warn('Error fetching categories, deriving from blogs:', err);
        // Fallback: derive categories from blogs if backend endpoint not available
        this.categories = ['Latest', ...new Set(this.blogs.map(blog => blog.category))];
        if (this.categories.length > 0 && !this.selectedCategory) {
          this.selectedCategory = this.categories[0];
        }
      }
    });
  }

  /** Change the active category tab */
  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}
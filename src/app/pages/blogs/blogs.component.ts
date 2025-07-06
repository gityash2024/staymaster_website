import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements AfterViewInit, OnDestroy {
  /** Today */
  today: Date = new Date();
  /** Calculated card width incl. gap */
  private cardWidth = 0;
  /** UI categories rendered below the hero section **/
  categories: string[] = [
    'Latest',
    'Destinations',
    'What the Press Say',
    'Weekend Gateaways',
    'Things To Do',
    'Experiences',
    'One Day Trips'
  ];

  selectedCategory = 'Latest';

  /** Featured banner post **/
  featuredPost: BlogPost = {
    title: 'Stay in Style: Discover Our Hand-Picked Luxury Villas',
    date: '20 Jun 2024',
    excerpt:
      "From sun-kissed beaches to misty hill escapes, explore Staymaster's curated collection of private vacation homes designed for unforgettable gatherings.",
    image: 'assets/images/featured_post.jpg'
  };

  /** Horizontal carousel logic **/
  @ViewChild('postsContainer', { static: false }) postsContainer?: ElementRef<HTMLDivElement>;
  currentSlide = 0;
  private slideInterval?: any;
  private readonly slideDuration = 4000; // ms

  ngAfterViewInit(): void {
    // Auto-slide every few seconds
    setTimeout(() => {
      const firstCard = this.postsContainer?.nativeElement.querySelector('.post-card') as HTMLElement;
      if (firstCard) {
        this.cardWidth = firstCard.offsetWidth + 30; // include gap (30px)
      }
      this.slideInterval = setInterval(() => this.nextSlide(), this.slideDuration);
    });
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    if (!this.postsContainer) return;
    this.currentSlide = (this.currentSlide + 1) % this.posts.length;
    const width = this.cardWidth || 320;
    this.postsContainer.nativeElement.scrollTo({
      left: this.currentSlide * width,
      behavior: 'smooth'
    });
  }

  /** Remaining blog cards **/
  posts: BlogPost[] = [
    {
      title: 'Top 5 Beachfront Homes in Goa',
      date: '11 Jun 2024',
      excerpt:
        "Wake up to ocean views and private pools at these guest-favourite Staymaster properties along Goa's iconic coastline.",
      image: 'assets/images/post1.jpg'
    },
    {
      title: 'Weekend Escapes Near Mumbai',
      date: '28 May 2024',
      excerpt:
        'Short drive, big memories: cosy mountain cabins, riverside villas, and heritage estates perfect for a 2-night reset.',
      image: 'assets/images/post2.jpg'
    },
    {
      title: 'Why Investors Love Staymaster',
      date: '18 May 2024',
      excerpt:
        "Guaranteed returns, professional management, and happy guests—see how our owners grow wealth through vacation rentals.",
      image: 'assets/images/post3.jpg'
    },
    {
      title: 'Best Pool Villas for Family Reunions',
      date: '05 May 2024',
      excerpt:
        'Celebrate togetherness in spacious villas loaded with kid-friendly amenities, private chefs and sparkling pools.',
      image: 'assets/images/post1.jpg'
    },
    {
      title: 'A Guide to Pet-Friendly Stays',
      date: '22 Apr 2024',
      excerpt:
        "Don't leave your furry friends behind! Discover our top-rated, pet-friendly homes with space for everyone to play.",
      image: 'assets/images/post2.jpg'
    },
    {
      title: 'Digital Nomad Havens in the Hills',
      date: '10 Apr 2024',
      excerpt:
        'High-speed Wi-Fi meets scenic views. Find your perfect work-from-anywhere base with Staymaster.',
      image: 'assets/images/post3.jpg'
    }
  ];

  /** Change the active category tab */
  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}

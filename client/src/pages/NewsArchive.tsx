import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";

export default function NewsArchive() {
  const [selectedYear, setSelectedYear] = useState("2025");

  const years = ["2025", "2024", "2023"];

  const newsArticles = [
    {
      id: 1,
      year: "2025",
      date: "March 15, 2025",
      category: "Program Launch",
      title: "New Youth Leadership Academy Opens in Monrovia",
      excerpt: "MCEFL launches state-of-the-art leadership training facility to serve 500 young leaders annually.",
      image: "fas fa-graduation-cap",
      color: "from-secondary to-blue-800"
    },
    {
      id: 2,
      year: "2025",
      date: "February 28, 2025",
      category: "Community Impact",
      title: "Empower Her Program Reaches 1,000 Girls Milestone",
      excerpt: "Celebrating the empowerment of 1,000 young girls across 15 communities in Liberia.",
      image: "fas fa-female",
      color: "from-pink-500 to-purple-600"
    },
    {
      id: 3,
      year: "2025",
      date: "January 20, 2025",
      category: "Partnership",
      title: "MCEFL Partners with International Youth Foundation",
      excerpt: "Strategic partnership brings new resources and expertise to our youth development programs.",
      image: "fas fa-handshake",
      color: "from-accent to-green-700"
    },
    {
      id: 4,
      year: "2024",
      date: "December 10, 2024",
      category: "Event",
      title: "Annual Youth Summit Brings Together 300 Leaders",
      excerpt: "Young leaders from across Liberia gather to share ideas and build networks for change.",
      image: "fas fa-users",
      color: "from-indigo-500 to-purple-700"
    },
    {
      id: 5,
      year: "2024",
      date: "November 5, 2024",
      category: "Achievement",
      title: "MCEFL Alumni Win National Youth Innovation Awards",
      excerpt: "Three program graduates recognized for outstanding contributions to community development.",
      image: "fas fa-trophy",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 6,
      year: "2024",
      date: "October 15, 2024",
      category: "Program Update",
      title: "Educational Support Program Expands to Rural Communities",
      excerpt: "Reaching 200 additional orphaned children with school supplies and academic support.",
      image: "fas fa-book-reader",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 7,
      year: "2024",
      date: "August 22, 2024",
      category: "Initiative",
      title: "New Mentorship Program Connects Youth with Industry Leaders",
      excerpt: "100 mentorship pairs formed to guide career development and professional growth.",
      image: "fas fa-user-graduate",
      color: "from-blue-600 to-cyan-700"
    },
    {
      id: 8,
      year: "2023",
      date: "December 18, 2023",
      category: "Milestone",
      title: "MCEFL Celebrates 5 Years of Impact",
      excerpt: "Five years of empowering youth and transforming communities across Liberia.",
      image: "fas fa-birthday-cake",
      color: "from-pink-600 to-rose-700"
    },
    {
      id: 9,
      year: "2023",
      date: "September 30, 2023",
      category: "Recognition",
      title: "Organization Receives National Youth Development Award",
      excerpt: "Government recognizes MCEFL's outstanding contribution to youth empowerment.",
      image: "fas fa-award",
      color: "from-yellow-600 to-amber-700"
    },
    {
      id: 10,
      year: "2023",
      date: "June 15, 2023",
      category: "Program Launch",
      title: "Policy & Advocacy Training Program Kicks Off",
      excerpt: "Empowering young people to engage in policy processes and civic participation.",
      image: "fas fa-balance-scale",
      color: "from-indigo-600 to-violet-700"
    }
  ];

  const filteredArticles = newsArticles.filter(article => article.year === selectedYear);

  return (
    <div className="py-20 bg-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-testid="news-archive-header">
          <Link href="/news-events" className="text-secondary hover:underline text-sm mb-2 inline-block">
            ← Back to News & Events
          </Link>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            News Archive
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore our journey through the years. Read about our milestones, achievements, and the impact we've made together.
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex gap-3 justify-center mb-12" data-testid="year-filters">
          {years.map((year) => (
            <Button
              key={year}
              onClick={() => setSelectedYear(year)}
              variant={selectedYear === year ? "default" : "outline"}
              className={selectedYear === year ? "bg-secondary text-secondary-foreground" : ""}
              data-testid={`filter-year-${year}`}
            >
              {year}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" data-testid="news-grid">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden card-hover" data-testid={`news-article-${article.id}`}>
              <div className={`h-48 bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                <i className={`${article.image} text-white text-6xl`}></i>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                <Button variant="ghost" className="text-secondary font-semibold hover:underline p-0" data-testid={`read-more-${article.id}`}>
                  Read More <i className="fas fa-arrow-right ml-1"></i>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-br from-secondary to-accent text-white rounded-2xl p-8 md:p-12 mb-16" data-testid="newsletter-section">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-envelope-open-text text-3xl"></i>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-6">
              Subscribe to our newsletter to receive the latest news, updates, and stories of impact directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
                data-testid="newsletter-email-input"
              />
              <Button className="bg-white text-secondary hover:bg-white/90 font-semibold" data-testid="newsletter-subscribe-button">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-background rounded-2xl p-8 md:p-12" data-testid="news-archive-cta">
          <h2 className="font-heading font-bold text-3xl mb-4">Be Part of Our Next Story</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Every article represents lives transformed and communities strengthened. Join us in creating tomorrow's success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 font-semibold" data-testid="get-involved-cta-button">
                <i className="fas fa-hands-helping mr-2"></i>
                Get Involved
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="px-8 py-3 font-semibold" data-testid="donate-cta-button">
                <i className="fas fa-heart mr-2"></i>
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

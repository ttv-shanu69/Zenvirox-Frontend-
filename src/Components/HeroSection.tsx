import Image from "next/image";
import Link from "next/link";
import api from "../../Services/api";

// Types
type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Blog = {
  _id: string;
  title: string; 
  content: string;
  createdAt: string;
  featuredImage: string;
  views: number;
  category: string | Category;
  slug: string;
};

type PopularPost = {
  id: number;
  rank: number;
  title: string;
  date: string;
  source: string | null;
  category: string;
  readTime: string;
  slug: string;
  views: number;
  featuredImage?: string;
};

// Fetch all categories to map IDs to names
const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get("/Categories");
    console.log("Categories API Response:", res.data); 
    
    let categories: Category[] = [];
    if (res.data && Array.isArray(res.data.categories)) {
      categories = res.data.categories;
    } else if (Array.isArray(res.data)) {
      categories = res.data;
    }
    
    return categories;
  } catch (error) {
    console.error("Cannot fetch categories!", error);
    return [];
  }
};

// Fetch Featured Posts
const fetchFeaturedPosts = async (): Promise<Blog[]> => {
  try {
    const res = await api.get("/Blogs/featuredPosts");
    let blogs: Blog[] = [];
    
    if (res.data && Array.isArray(res.data.blogs)) {
      blogs = res.data.blogs;
    } else if (Array.isArray(res.data)) {
      blogs = res.data;
    }
    
    return blogs;
  } catch (error) {
    console.error("Cannot fetch featured posts!", error);
    return [];
  }
};

// Fetch Latest Posts
const fetchLatestPosts = async (): Promise<Blog[]> => {
  try {
    const res = await api.get("/Blogs/latestPosts");
    let blogs: Blog[] = [];
    
    if (res.data && Array.isArray(res.data.blogs)) {
      blogs = res.data.blogs;
    } else if (Array.isArray(res.data)) {
      blogs = res.data;
    }
    
    return blogs;
  } catch (error) {
    console.error("Cannot fetch latest posts!", error);
    return [];
  }
};

const fetchPopularPosts = async (): Promise<PopularPost[]> => {
  try {
    const res = await api.get("/Blogs/popularPosts");
    console.log("Popular posts response:", res.data);
    
    // Adjust based on your API response structure
    const posts = res.data.blogs || res.data || [];
    
    // Add rank numbers based on order
    return posts.map((post: any, index: number) => ({
      id: post._id || index,
      rank: index + 1,
      title: post.title,
      date: new Date(post.createdAt || post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      source: post.source || null,
      category: post.category?.name || "General",
      readTime: post.readTime || `${Math.ceil((post.content?.length || 0) / 1000)} min read`,
      slug: post.slug,
      views: post.views || 0,
      featuredImage: post.featuredImage || ""
    }));
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
};

// Helper function to get category name from ID
const getCategoryName = (category: string | Category | undefined, categories: Category[]): string => {
  if (!category) return 'Uncategorized';
  
  if (typeof category === 'object' && category.name) {
    return category.name;
  }
  
  if (typeof category === 'string') {
    const found = categories.find(c => c._id === category);
    return found?.name || 'Uncategorized';
  }
  
  return 'Uncategorized';
};

export default async function HeroSection() {
  const [featuredPosts, latestPosts, categories, popularPosts] = await Promise.all([
    fetchFeaturedPosts(),
    fetchLatestPosts(),
    fetchCategories(),
    fetchPopularPosts()
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!featuredPosts || featuredPosts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-center py-10 text-gray-500">No featured posts found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Section Title */}
        {/* <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-[#35928d]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black">Latest Stories</h2>
          <p className="text-gray-500 mt-2">Discover our most recent articles</p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR - POPULAR POSTS WITH IMAGE CARDS */}
          <aside className="lg:col-span-3">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-black uppercase tracking-wider">
                  <span className="border-l-3 border-[#35928d] pl-3">Popular This Week</span>
                </h3>
                <Link 
                  href="/popular"
                  className="text-xs text-[#35928d] hover:underline"
                >
                  View all
                </Link>
              </div>
              
              {popularPosts.length > 0 ? (
                <div className="space-y-4">
                  {popularPosts.slice(0, 4).map((post: PopularPost, index: number) => {
                    return (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                        <div className="relative h-48 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                          {/* Background Image */}
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          
                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />
                          
                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            {/* Rank Badge */}
                            <div className="inline-block mb-2">
                              <span className="text-xs font-bold text-white bg-[#35928d] px-2 py-0.5 rounded">
                                #{post.rank}
                              </span>
                            </div>
                            
                            {/* Category */}
                            <p className="text-xs text-white/70 mb-1">{post.category}</p>
                            
                            {/* Title */}
                            <h4 className="font-bold text-white text-sm leading-tight line-clamp-2 group-hover:text-[#35928d] transition-colors">
                              {post.title}
                            </h4>
                            
                            {/* Views & Date */}
                            <div className="flex items-center gap-2 mt-2">
                              <p className="text-xs text-white/50">
                                {post.views.toLocaleString()} views
                              </p>
                              <span className="text-white/30 text-xs">•</span>
                              <p className="text-xs text-white/50">
                                {post.readTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No popular posts available</p>
              )}

              {/* Newsletter Signup - Small */}
              
            </div>
          </aside>

          {/* MAIN CONTENT - Featured Posts */}
          <main className="lg:col-span-6 space-y-12">
            {featuredPosts.map((post: Blog) => {
              const categoryName = getCategoryName(post.category, categories);
              
              return (
                <article
                  key={post._id}
                  className="border-b border-gray-200 pb-8 last:border-0 group"
                >
                  {/* Image */}
                  {post.featuredImage && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-[#35928d] text-white text-xs font-medium rounded">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>•</span>
                    <span>Views: {post.views || 0}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-3 group-hover:text-[#35928d] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {cleanContent(post.content, 200)}
                  </p>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#35928d] font-medium group/link"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </main>

          {/* RIGHT SIDEBAR - Latest Posts (Traditional List) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-8">
              
              {/* Latest Posts Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-black uppercase tracking-wider">
                    <span className="border-l-3 border-[#35928d] pl-3">Latest</span>
                  </h3>
                  <Link 
                    href="/"
                    className="text-xs text-[#35928d] hover:underline"
                  >
                    View all
                  </Link>
                </div>
                
                {latestPosts.length > 0 ? (
                  <div className="space-y-4">
                    {latestPosts.slice(0, 5).map((post: Blog) => {
                      const categoryName = getCategoryName(post.category, categories);
                      
                      return (
                        <article key={post._id} className="group">
                          <Link href={`/blog/${post.slug}`} className="block">
                            <div className="flex gap-3">
                              {/* Small Thumbnail */}
                              {post.featuredImage && (
                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                  <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              )}
                              
                              {/* Content */}
                              <div className="flex-1">
                                <div className="text-xs text-gray-400 mb-1">
                                  {formatDate(post.createdAt)}
                                </div>
                                <h4 className="font-semibold text-black group-hover:text-[#35928d] transition-colors line-clamp-2 text-sm">
                                  {post.title}
                                </h4>
                                <div className="text-xs text-gray-400 mt-1">
                                  {post.views || 0} views
                                </div>
                                <div className="text-xs text-[#35928d] mt-1">
                                  {categoryName}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No latest posts available</p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 my-6"></div>

              {/* Popular Tags */}
              <div className="mt-6 bg-gradient-to-br from-[#35928d]/5 to-transparent rounded-xl p-5 border border-[#35928d]/10">
                <div className="text-2xl mb-2">📧</div>
                <h4 className="font-bold text-black mb-1">Weekly Newsletter</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Get the latest posts delivered to your inbox
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20 transition-all"
                  />
                  <button className="w-full bg-[#35928d] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#2a7a76] transition-colors">
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <hr className="mx-15" />
    </div>
  );
}

const cleanContent = (html: string, maxLength: number = 150) => {
  if (!html) return '';
  
  if (typeof window !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || '';
    text = text.replace(/\s+/g, ' ').trim();
    
    if (text.length > maxLength) {
      text = text.substring(0, maxLength) + '...';
    }
    return text;
  }
  
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').substring(0, maxLength) + '...';
};
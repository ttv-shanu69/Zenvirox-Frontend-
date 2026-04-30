// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import api from "../../Services/api";

// Types
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
};

type BlogPost = {
  _id: string;
  title: string; 
  slug: string;
  content: string; // Added content property
  excerpt?: string;
  date: string;
  views: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  readTime: string;
  featuredImage: string;
  featured: boolean;
  author?: {
    name: string;
  };
  createdAt: string;
};

// Fetch Popular Posts from backend
const fetchPopularPosts = async (): Promise<PopularPost[]> => {
  try {
    const res = await api.get("/Blogs/popularPosts");
    console.log("Popular posts response:", res.data);
    
    const posts = res.data.blogs || res.data || [];
    
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
      views: post.views || 0
    }));
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
};

// Fetch All Blogs from backend
const fetchAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const res = await api.get("/Blogs");
    console.log("All blogs response:", res.data);
    
    const blogs = res.data.blogs || res.data || [];
    
    return blogs.map((blog: any) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content || "", // Added content
      excerpt: blog.excerpt || (blog.content ? blog.content.substring(0, 160) + "..." : "No excerpt available"),
      date: new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      views: blog.views || 0,
      category: blog.category || { _id: "", name: "General", slug: "general" },
      readTime: blog.readTime || `${Math.ceil((blog.content?.length || 0) / 1000)} min read`,
      featuredImage: blog.featuredImage || "",
      featured: blog.featured || false,
      author: blog.author,
      createdAt: blog.createdAt
    }));
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Clean content function
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

export default async function HomePage() {
  const [popularPosts, allPosts] = await Promise.all([
    fetchPopularPosts(),
    fetchAllBlogs()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 pt-10 pb-25">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#35928d]/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#35928d]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#35928d]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-0.5 bg-[#35928d]"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Insights & Stories
            <span className="text-[#35928d]">.</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover expert insights, wellness tips, and the latest trends in 
            stress relief, home maintenance, and mindful living.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-sm">
            <span className="text-gray-400">Wellness</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">Stress Relief</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">Mindfulness</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - POPULAR POSTS LIST */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#35928d]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1.5 1.5 0 01-3 0v-.5zM10 7a1.5 1.5 0 013 0v3a1.5 1.5 0 01-3 0V7zM10 12.5a1.5 1.5 0 013 0v.5a1.5 1.5 0 01-3 0v-.5z" />
                  </svg>
                  POPULAR THIS WEEK
                </h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  Trending
                </span>
              </div>
              
              {popularPosts.length > 0 ? (
                <div className="space-y-3">
                  {popularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group cursor-pointer relative"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="flex gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-[#35928d]/5">
                          {/* Rank Number */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-[#35928d]/10 group-hover:to-[#35928d]/5 transition-all duration-300">
                              <span className="text-lg font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent group-hover:from-[#35928d] group-hover:to-[#35928d]">
                                {post.rank}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {post.source && (
                                <span className="text-xs font-medium text-[#35928d] bg-[#35928d]/10 px-2 py-0.5 rounded-full">
                                  {post.source}
                                </span>
                              )}
                              <span className="text-xs text-gray-400">{post.readTime}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#35928d] transition-colors line-clamp-2 text-sm mb-1">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No popular posts available</p>
              )}

              {/* View All Button */}
              <div className="mt-6 text-center">
                <Link 
                  href="/popular"
                  className="inline-flex items-center gap-2 text-[#35928d] text-sm font-medium hover:gap-3 transition-all group"
                >
                  View All Popular Articles
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN - ALL BLOGS */}
          <main className="lg:col-span-8">
            {allPosts.length > 0 ? (
              <div className="space-y-6">
                {allPosts.map((post) => (
                  <article 
                    key={post._id} 
                    className="group border-b border-gray-100 pb-6 last:border-0 hover:pb-5 transition-all"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        
                        {/* Image Section */}
                        <div className="relative h-44 md:h-32 rounded-lg overflow-hidden bg-gray-100">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          {post.featured && (
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 bg-[#35928d] text-white text-xs font-medium rounded">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content Section */}
                        <div className="md:col-span-2">
                          {/* Meta Info */}
                          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2 flex-wrap">
                            <span>{formatDate(post.createdAt)}</span>
                            <span>•</span>
                            <span>{post.views.toLocaleString()} views</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span className="text-[#35928d]">{post.category?.name || "General"}</span>
                          </div>
                          
                          {/* Title */}
                          <h2 className="text-lg md:text-xl font-bold text-black mb-2 group-hover:text-[#35928d] transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          
                          {/* Excerpt - FIXED: Using post.content or post.excerpt */}
                          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                            {cleanContent(post.content || post.excerpt || "", 200)}
                          </p>
                          
                          {/* Author & Read More */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              By {post.author?.name || "Editor"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[#35928d] text-sm font-medium group-hover:gap-2 transition-all">
                              Read more
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-black mb-2">No articles found</h3>
                <p className="text-gray-500">Check back soon for new content.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
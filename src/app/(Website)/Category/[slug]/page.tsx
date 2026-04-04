import api from "../../../../../Services/api"
import Link from "next/link"
import Image from "next/image"

const fetchPostsByCategory = async (slug: string) => {
  try {
    const res = await api.get(`/Blogs/Category/${slug}`)
    console.log("Posts:", res.data)
    return res.data.posts || res.data || []
  } catch (error) {
    console.log("Posts not found!", error)
    return []
  }
}

type Blog = {
  _id: string;
  title: string;
  content: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  createdAt: string;
  featuredImage: string;
  views: number;
  excerpt?: string;
  readTime?: string;
  slug: string;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to get read time from content
const getReadTime = (content: string) => {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const { slug } = await params
  
  console.log("Category slug:", slug)
  
  if (!slug) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">Category slug is missing</p>
          <Link href="/" className="mt-4 inline-block text-[#35928d] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const posts: Blog[] = await fetchPostsByCategory(slug)

  // Format the category name for display
  const categoryDisplayName = slug.replace(/-/g, ' ').split(' ').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-0.5 bg-[#35928d] mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 capitalize">
            {categoryDisplayName}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our collection of articles about {categoryDisplayName.toLowerCase()}
          </p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-[#35928d]/10 text-[#35928d] rounded-full text-sm font-medium">
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#35928d]/20"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Category Badge - Fixed to show category name */}
                    {post.category && post.category.name && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-[#35928d] text-white text-xs font-medium rounded shadow-md">
                          {post.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-5">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <span>{post.views || 0} views</span>
                      <span>•</span>
                      <span>{getReadTime(post.content)}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#35928d] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    {post.excerpt ? (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.content?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>
                    )}
                    
                    {/* Read More Link */}
                    <div className="inline-flex items-center gap-1 text-[#35928d] text-sm font-medium group-hover:gap-2 transition-all">
                      Read Article
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
            <p className="text-gray-500 mb-6">
              No posts available in the {categoryDisplayName} category yet.
            </p>
            <Link 
              href="/"
              className="inline-block px-6 py-2 bg-[#35928d] text-white rounded-lg hover:bg-[#2a7a76] transition-colors"
            >
              Browse all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
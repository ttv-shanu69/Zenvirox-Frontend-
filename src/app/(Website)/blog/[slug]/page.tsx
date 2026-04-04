// app/blog/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import api from "../../../../../Services/api";

// Fetch blog post by slug
const fetchPostBySlug = async (slug: string) => {
  try {
    const res = await api.get(`/Blogs/${slug}`);
    console.log("Blog post response:", res.data);
    
    // Your controller returns { success: true, blog: {...} }
    return res.data.blog || res.data;
  } catch (error) {
    console.log("Blog post not found!", error);
    return null;
  }
};

// Fetch related posts by category
const fetchRelatedPosts = async (categoryId: string, currentPostId: string) => {
  try {
    const res = await api.get(`/Blogs/Category/${categoryId}`);
    const posts = res.data.posts || res.data || [];
    return posts.filter((p: any) => p._id !== currentPostId).slice(0, 3);
  } catch (error) {
    console.log("Related posts not found!", error);
    return [];
  }
};

// Blog Type
type Blog = {
  _id: string;
  title: string;
  content: string;
  slug: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  createdAt: string;
  updatedAt?: string;
  featuredImage: string;
  views: number;
  excerpt?: string;
  author?: {
    name: string;
    title: string;
    bio: string;
    avatar?: string;
  };
  tags?: string[];
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
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

// Helper function to safely get author name
const getAuthorName = (author: any): string => {
  if (!author) return "Editor";
  if (typeof author === 'string') return author;
  if (author.name) return author.name;
  return "Editor";
};

// Helper function to safely get author title
const getAuthorTitle = (author: any): string => {
  if (!author) return "Content Writer";
  if (author.title) return author.title;
  return "Content Writer";
};

// Helper function to safely get author bio
const getAuthorBio = (author: any): string => {
  if (!author) return "Passionate about sharing insights and knowledge with our readers.";
  if (author.bio) return author.bio;
  return "Passionate about sharing insights and knowledge with our readers.";
};

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const { slug } = await params;
  
  console.log("Blog slug from URL:", slug);
  
  if (!slug) {
    notFound();
  }

  const post: Blog = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  console.log("Post author data:", post.author); // Debug log

  // Fetch related posts if category exists
  let relatedPosts: Blog[] = [];
  if (post.category?._id) {
    relatedPosts = await fetchRelatedPosts(post.category._id, post._id);
  }

  // Safely get author information
  const authorName = getAuthorName(post.author);
  const authorTitle = getAuthorTitle(post.author);
  const authorBio = getAuthorBio(post.author);
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Default tags if not provided
  const tags = post.tags || [post.category?.name || "Blog"];

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white">
      {/* Simple Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div className="h-full bg-[#35928d] w-0" id="progressBar" />
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#35928d] transition">Home</Link>
            <span>/</span>
            <Link 
              href={`/category/${post.category?.slug || 'all'}`} 
              className="hover:text-[#35928d] transition"
            >
              {post.category?.name || 'Blog'}
            </Link>
            <span>/</span>
            <span className="text-[#35928d]">Reading</span>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#35928d]/10 text-[#35928d] rounded-full text-sm font-medium">
              {post.category?.name || 'Article'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#35928d] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {authorInitial}
              </div>
              <div>
                <p className="font-semibold text-black">{authorName}</p>
                <p className="text-xs">{authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {getReadTime(post.content)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views || 0} views
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-10">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">No Image Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Article Content */}
       {/* Article Content - FIXED for overflow */}
<div 
  className="prose prose-lg max-w-none 
    prose-headings:text-black prose-headings:font-bold 
    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 
    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 
    prose-p:text-gray-700 prose-p:leading-relaxed 
    prose-a:text-[#35928d] prose-a:break-words
    prose-strong:text-black 
    prose-ul:text-gray-700 prose-li:mb-2
    prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg
    prose-table:block prose-table:overflow-x-auto
    prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap
    prose-code:break-words
    overflow-x-auto break-words"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/category/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#35928d] hover:text-white transition-all"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Share this article:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition">
                𝕏
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4267B2] hover:text-white transition">
                f
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0077B5] hover:text-white transition">
                in
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Updated: {formatDate(post.updatedAt || post.createdAt)}</span>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-[#35928d] rounded-full flex items-center justify-center text-white font-bold text-xl">
              {authorInitial}
            </div>
            <div>
              <h4 className="font-bold text-black text-lg mb-1">{authorName}</h4>
              <p className="text-sm text-[#35928d] mb-2">{authorTitle}</p>
              <p className="text-gray-600 text-sm">{authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost._id} 
                  href={`/blog/${relatedPost.slug}`} 
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
                    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-[#35928d] font-medium mb-2">
                        {relatedPost.category?.name || 'Article'}
                      </div>
                      <h4 className="font-semibold text-black group-hover:text-[#35928d] transition line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <div className="mt-2 text-xs text-gray-400">
                        {formatDate(relatedPost.createdAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-[#35928d] to-[#2a7a76] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Never Miss an Article</h3>
          <p className="text-white/80 mb-6">Get the latest wellness tips delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-[#35928d] font-semibold rounded-xl hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </article>

      {/* Simple scroll progress script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              const winScroll = document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - window.innerHeight;
              const scrolled = (winScroll / height) * 100;
              const progressBar = document.getElementById('progressBar');
              if (progressBar) {
                progressBar.style.width = scrolled + '%';
              }
            });
          `,
        }}
      />
    </div>
  );
}
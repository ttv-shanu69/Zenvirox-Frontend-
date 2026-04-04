"use client";

import { useState, useEffect } from "react";
import api from "../../../../Services/api";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

function Blogs() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
  try {
    const res = await api.get("/Blogs");

    // Access the blogs array inside the response
    if (Array.isArray(res.data.blogs)) {
      setBlogs(res.data.blogs);
    } else {
      console.error("Unexpected response:", res.data);
      setBlogs([]);
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    setBlogs([]);
  } finally {
    setLoading(false);
  }
};

    const handleDelete = async (id:string) => {

    const confirmDelete = confirm("Delete this blog?");

    if(!confirmDelete) return;

    try {

      await api.delete(`/Blogs/${id}`);

      fetchBlogs();

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">All Posts</h2>
        <p>Loading posts...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 min-h-screen">
  {/* Header Section */}
  <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="w-full px-6 py-6">
      <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
      <p className="text-gray-500 mt-1 text-sm">Browse through our collection of articles and updates</p>
    </div>
  </div>

  {/* Posts List - Full Width */}
  <div className="w-full px-6 py-6">
    {blogs.length === 0 ? (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-gray-500 text-lg">No posts found.</p>
        <p className="text-gray-400 text-sm mt-2">Check back later for new content</p>
      </div>
    ) : (
      <div className="w-full max-w-none">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mb-4 border border-gray-200 cursor-pointer group"
          >
            <div className="p-6">
              {/* Title Section with Icon */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 mt-2 mb-3">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    
                    {/* {blog.author && (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {blog.author}
                      </span>
                    )} */} 
                    
                    {/* {blog.category && (
                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {blog.category}
                      </span>
                    )} */}
                  </div>
                  
                  {/* Content Preview */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {blog.content.length > 300
                      ? blog.content.substring(0, 50) + "..."
                      : blog.content}
                  </p>
                  
                  {/* Footer with Read More */}
                 <div className="flex items-center justify-between pt-3 border-t border-gray-100">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </div>
    <span className="text-sm text-gray-500">
      {Math.ceil(blog.content.length / 150)} min read
    </span>
  </div>

  <div className="flex items-center gap-4">
    <span className="text-blue-600 font-medium group-hover:text-blue-700 group-hover:underline flex items-center gap-1 cursor-pointer transition-colors">
      Read More
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </span>
    
    <button
      onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}
      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(blog._id)}
      className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
    >
      Delete
    </button>
  </div>
</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
  );
}

export default Blogs;
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../Services/api";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
}

export default function SearchPage() {

  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get(`/Blogs/search?q=${query}`);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchBlogs();
  }, [query]);

  if (loading) return <p className="text-center mt-10">Searching...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-bold mb-6">
        Search results for: "{query}"
      </h1>

      {blogs.length === 0 && (
        <p>No articles found.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 hover:shadow-md transition">

            <img
              src={blog.featuredImage}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="mt-3 font-semibold text-lg">
              {blog.title}
            </h2>

          </div>
        ))}

      </div>

    </div>
  );
}
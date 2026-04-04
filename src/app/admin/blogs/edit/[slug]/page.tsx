"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import api from "../../../../../../Services/api";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function EditBlog() {
 
  const { slug } = useParams();

  const editorRef = useRef(null);
  const quillRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    const res = await api.get("/Categories");
    setCategories(res.data.categories);
  };

  // Fetch blog
  const fetchBlog = async () => {

    const res = await api.get(`/Blogs/${slug}`);

    const blog = res.data.blog;

    setTitle(blog.title);

    if (quillRef.current) {
      quillRef.current.root.innerHTML = blog.content;
    }

  };

  useEffect(() => {

    fetchCategories();

    if (editorRef.current && !quillRef.current) {

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Edit blog content...",
      });

    }

    fetchBlog();

  }, []);

  const handleUpdate = async (e:any) => {

    e.preventDefault();

    const content = quillRef.current.root.innerHTML;

    await api.put(`/blogs/${slug}`, {
      title,
      category,
      content
    });

    alert("Blog updated successfully");

  };

  return (

    <div className="w-full px-8 py-6 space-y-6">

      <h1 className="text-3xl font-bold">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-6">

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>

          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >

            <option value="">Select Category</option>

            {categories.map((cat:any)=>(
              <option key={cat._id} >
                {cat.name}
              </option>
            ))}

          </select>
        </div>

        {/* Content Editor */}
        <div>
          <label className="font-semibold mb-2 block">
            Blog Content
          </label>

          <div
            ref={editorRef}
            className="bg-white"
            style={{height:"350px"}}
          ></div>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Update Blog
        </button>

      </form>

    </div>
  );
}
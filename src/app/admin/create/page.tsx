"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import api from "../../../../Services/api";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Category {
  _id: string;
  name: string;
  slug: string;
}

function CreatePosts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [isfeatured, setIsFeatured] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/Categories");
      let cats = [];

      if (Array.isArray(res.data.categories)) {
        cats = res.data.categories;
      } else if (res.data.categories && typeof res.data.categories === "object") {
        cats = [res.data.categories];
      }

      setCategories(cats);
    } catch (err) {
      console.error(err);
      setCategories([]);
    }
  };

  const handleImageChange = (file: File) => {
    setFeaturedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("tags", tags);
      formData.append("author", author);
      formData.append("isfeatured", String(isfeatured)); 
      if (featuredImage) formData.append("featuredImage", featuredImage);

      const res = await api.post("/Blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      alert("Post created successfully!");

      // Reset form
      setTitle("");
      setCategory("");
      setContent("");
      setTags("");
      setAuthor("");
      setIsFeatured(false); 
      setFeaturedImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) &&
              categories.map((cat: Category) => {
                const name = typeof cat.name === "string" ? cat.name : "";
                const id = typeof cat._id === "string" ? cat._id : "";
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold">Featured Image</label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            <p className="text-gray-500">Drag & Drop image here or click to upload</p>
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={(e) =>
                e.target.files && handleImageChange(e.target.files[0])
              }
              className="hidden"
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Preview</p>
              <img src={preview} className="w-60 rounded shadow" alt="Preview" />
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-semibold">Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>

        {/* Tags + Author */}
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <div className="flex-1">
            <label className="block mb-2 font-semibold">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-semibold">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </div>

        {/* Featured Checkbox - Fixed */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-semibold">
            <input
              type="checkbox"
              checked={isfeatured} 
              onChange={(e) => setIsFeatured(e.target.checked)}  
              className="w-5 h-5 border border-gray-300 rounded"
            />
            Featured this post?
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default CreatePosts;
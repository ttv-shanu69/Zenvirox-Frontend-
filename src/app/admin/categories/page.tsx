"use client";

import api from "../../../../Services/api";
import { useState, useEffect } from "react";

interface Category {
  _id: String,
  name: String,
  slug: String
}

function Categories() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([])

  const HandleSubmit = async(e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true)

    const res = await api.post("/Categories", { name })
    console.log(res.data)

    alert("Category Created Successfully!")

    setName("")
    setLoading(false)
  }

  const FetchCategories = async () => {
  try {
    const res = await api.get("/Categories");

    // Access the blogs array inside the response
    if (Array.isArray(res.data.categories)) {
      setCategories(res.data.categories);
    } else {
      console.error("Unexpected response:", res.data);
      setCategories([]);
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    setCategories([]);
  } finally {
    setLoading(false);
  }
};

 const handleDelete = async (id:string) => {

    const confirmDelete = confirm("Delete this Category?");

    if(!confirmDelete) return;

    try {

      await api.delete(`/Categories/${id}`);

      FetchCategories();

    } catch (error) {
      console.error(error);
    }
  };
  
useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Create Category</h1>

      <form
        onSubmit={HandleSubmit}
        className="bg-white shadow p-6 rounded-lg space-y-4"
      >

        <div>
          <label className="block mb-2 font-semibold">
            Category Name
          </label>

          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "Creating..." : "Create"}
        </button>

      </form>

      <div className="">

      </div>

      <div className="space-y-4 mt-12">
      <div className="w-full px-6 py-8">
  {/* Header Section */}
  <div className="max-w-7xl mx-auto mb-8">
    <h1 className="text-3xl font-semibold text-gray-900">All Categories</h1>
    <p className="text-gray-500 mt-2">Browse through our collection of categories</p>
  </div>

  {/* Categories List - Full Width */}
  <div className="w-full">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Optional: Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
        <div className="md:col-span-8">Category Name</div>
        <div className="md:col-span-4 text-right">Details</div>
      </div>
 
      {/* Categories */}
      {categories.map((cat: any, index: number) => (
        <div
          key={cat._id}
          className="group hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
        >
          <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Left Section - Category Info */}
            <div className="flex items-center space-x-4 flex-1">
              {/* Icon */}
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium text-lg">{cat.name}</h3>
              </div>
            </div>

            {/* Right Section - Meta Info & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-4 ml-14 md:ml-0">
              {/* Category Count - Optional */}
              {cat.count !== undefined && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {cat.count} items
                </span>
              )}
              
              {/* View Button */}
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button >

              <button
              onClick={() => handleDelete(cat._id)}
               className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
                Delete
              </button>
 
            </div>
          </div>
        </div>
      ))}

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <p className="text-gray-500">No categories found</p>
        </div>
      )}
    </div>
  </div>
</div>
    </div>

    </div>
  )
}

export default Categories 
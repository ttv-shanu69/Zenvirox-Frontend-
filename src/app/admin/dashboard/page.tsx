"use client";

import { useEffect, useState } from "react";
import api from "../../../../Services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Blog {
  _id: string;
  title: string;
  category: Category | string;
  views: number;
  createdAt: string;
}

interface Category {
  _id: String;
  name: String;
  slug: String;
}

export default function Dashboard() {
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []); // No auth check needed - middleware handles it

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/Blogs");
      console.log("Blogs response:", res.data);
      
      if (Array.isArray(res.data.blogs)) {
        setRecentPosts(res.data.blogs);
      } else {
        console.error("Unexpected response:", res.data);
        setRecentPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setRecentPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/Categories");
      console.log("Categories response:", res.data);
      
      if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories);
      } else {
        console.error("Unexpected response:", res.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

  // Calculate total views
  const totalViews = recentPosts.reduce((sum, post) => sum + (post.views || 0), 0);

  // Chart data: Views per recent post
  const chartData: ChartData<"bar", number[], string> = {
    labels: recentPosts.map((post) => post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title),
    datasets: [
      {
        label: "Views",
        data: recentPosts.map((post) => post.views || 0),
        backgroundColor: recentPosts.map((_, idx) => `rgba(${59 + (idx % 10) * 20}, 130, 246, 0.8)`),
        borderRadius: 8,
        barThickness: 40,
        maxBarThickness: 60,
      },
    ],
  };

  // Chart options
  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Recent Posts Views",
        font: {
          size: 20,
          weight: "bold" as const,
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1E40AF",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 6,
      },
      datalabels: {
        anchor: "end" as const,
        align: "end" as const,
        color: "#1E40AF",
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: (value: number) => value.toLocaleString(),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 500, color: "#374151", font: { weight: "bold" as const } },
        grid: { color: "#E5E7EB" },
      },
      x: {
        ticks: { 
          color: "#374151", 
          font: { weight: "bold" as const },
          maxRotation: 45,
          minRotation: 45
        },
        grid: { display: false },
      },
    },
    animation: { duration: 1000, easing: "easeOutQuart" },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold mt-2 text-[#35928d]">{recentPosts.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <h3 className="text-gray-500 text-sm font-medium">Categories</h3>
          <p className="text-3xl font-bold mt-2 text-[#35928d]">{categories.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <h3 className="text-gray-500 text-sm font-medium">Total Views</h3>
          <p className="text-3xl font-bold mt-2 text-[#35928d]">{totalViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#35928d] mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        ) : recentPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent posts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-gray-600 font-semibold">Title</th>
                  <th className="p-3 text-gray-600 font-semibold">Category</th>
                  <th className="p-3 text-gray-600 font-semibold">Date</th>
                  <th className="p-3 text-gray-600 font-semibold">Views</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.slice(0, 10).map((post) => (
                  <tr key={post._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{post.title}</td>
                    <td className="p-3">
                      {typeof post.category === "object" && post.category ? post.category.name : post.category || "Uncategorized"}
                    </td>
                    <td className="p-3">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold">{post.views?.toLocaleString() || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentPosts.length > 10 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Showing 10 of {recentPosts.length} posts
              </p>
            )}
          </div>
        )}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Views Chart</h2>
        {!loading && recentPosts.length > 0 ? (
          <div className="h-[400px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No data to display chart</p>
        )}
      </div>
    </div>
  );
}
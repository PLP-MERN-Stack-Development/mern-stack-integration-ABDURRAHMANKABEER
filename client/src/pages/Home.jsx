import React, { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import PostCard from "../components/PostCard";

const POSTS_PER_PAGE = 6; // adjust as you like

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await PostService.getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top when changing page
  };

  return (
    <section className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>

      {currentPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;

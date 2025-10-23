import React, { useState, useMemo } from 'react';
import BlogPostCard from './BlogPostCard';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  Star,
  Calendar,
  Tag
} from 'lucide-react';

const BlogList = ({
  // Blog posts data
  posts = [],
  
  // Layout configuration
  layout = "grid", // 'grid', 'list'
  columns = 3, // 1-3 columns for grid layout
  
  // Featured post
  showFeatured = true,
  featuredPost = null,
  featuredLayout = "hero", // 'hero', 'card', 'banner'
  
  // Category filtering
  showCategoryFilter = true,
  categories = [],
  defaultCategory = "all",
  
  // Sorting options
  showSort = true,
  sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" }
  ],
  defaultSort = "newest",
  
  // Pagination
  showPagination = true,
  postsPerPage = 6,
  showLoadMore = false,
  loadMoreText = "Load More Posts",
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedSort, setSelectedSort] = useState(defaultSort);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filteredPosts = posts;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filteredPosts = posts.filter(post => 
        post.data.category === selectedCategory
      );
    }
    
    // Sort posts
    filteredPosts.sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return new Date(b.data.date) - new Date(a.data.date);
        case "oldest":
          return new Date(a.data.date) - new Date(b.data.date);
        case "title":
          return a.data.title.localeCompare(b.data.title);
        case "title-desc":
          return b.data.title.localeCompare(a.data.title);
        default:
          return 0;
      }
    });
    
    return filteredPosts;
  }, [posts, selectedCategory, selectedSort]);
  
  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex);
  
  // Get unique categories from posts
  const availableCategories = useMemo(() => {
    const cats = [...new Set(posts.map(post => post.data.category).filter(Boolean))];
    return [{ value: "all", label: "All Categories" }, ...cats.map(cat => ({ value: cat, label: cat }))];
  }, [posts]);
  
  // Layout classes
  const getLayoutClasses = () => {
    if (layout === "list") {
      return "space-y-6";
    }
    
    switch (columns) {
      case 1:
        return "grid-cols-1 max-w-2xl mx-auto gap-8";
      case 2:
        return "grid-cols-1 md:grid-cols-2 gap-8";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
    }
  };
  
  // Featured post layout
  const getFeaturedLayoutClasses = () => {
    switch (featuredLayout) {
      case "hero":
        return "mb-12";
      case "card":
        return "mb-8";
      case "banner":
        return "mb-6";
      default:
        return "mb-12";
    }
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  // Handle sort change
  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setCurrentPage(1);
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  };
  
  // Render featured post
  const renderFeaturedPost = () => {
    if (!showFeatured || !featuredPost) return null;
    
    const featuredClasses = getFeaturedLayoutClasses();
    
    if (featuredLayout === "hero") {
      return (
        <div className={`${featuredClasses} relative overflow-hidden rounded-lg`}>
          <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
            {featuredPost.data.image && (
              <img
                src={featuredPost.data.image}
                alt={featuredPost.data.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center mb-4">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Featured Post</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {featuredPost.data.title}
                </h2>
                {featuredPost.data.description && (
                  <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                    {featuredPost.data.description}
                  </p>
                )}
                <div className="flex items-center justify-center space-x-4 text-sm">
                  {featuredPost.data.date && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.data.date).toLocaleDateString()}
                    </div>
                  )}
                  {featuredPost.data.category && (
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {featuredPost.data.category}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className={featuredClasses}>
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm font-semibold text-gray-600">Featured Post</span>
        </div>
        <BlogPostCard
          post={featuredPost}
          cardStyle="elevated"
          className="border-2 border-yellow-200"
        />
      </div>
    );
  };
  
  // Render filters
  const renderFilters = () => {
    if (!showCategoryFilter && !showSort) return null;
    
    return (
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          {showCategoryFilter && (
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {availableCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
          
          {/* Sort Options */}
          {showSort && (
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>
        
        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedPosts.length)} of {filteredAndSortedPosts.length} posts
        </div>
      </div>
    );
  };
  
  // Render pagination
  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;
    
    const pages = [];
    const maxVisiblePages = 5;
    
    // Calculate page range
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };
  
  // Render load more button
  const renderLoadMore = () => {
    if (!showLoadMore || currentPage >= totalPages) return null;
    
    return (
      <div className="text-center mt-12">
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            loadMoreText
          )}
        </button>
      </div>
    );
  };
  
  return (
    <section className={`${backgroundColor} ${padding}`}>
      <div className={`${containerMaxWidth} mx-auto`}>
        {/* Featured Post */}
        {renderFeaturedPost()}
        
        {/* Filters */}
        {renderFilters()}
        
        {/* Blog Posts */}
        <div className={layout === "grid" ? `grid ${getLayoutClasses()}` : getLayoutClasses()}>
          {currentPosts.map((post, index) => (
            <BlogPostCard
              key={post.filePath || index}
              post={post}
              cardStyle="default"
            />
          ))}
        </div>
        
        {/* No posts message */}
        {currentPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        {renderPagination()}
        
        {/* Load More */}
        {renderLoadMore()}
      </div>
    </section>
  );
};


export default BlogList;

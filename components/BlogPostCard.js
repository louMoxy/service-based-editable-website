import Link from 'next/link';
import ArrowIcon from './ArrowIcon';

const BlogPostCard = ({
  post,
  showImage = true,
  showCategory = true,
  showDate = true,
  showDescription = true,
  cardStyle = "default", // 'default', 'elevated', 'outlined'
  imageAspectRatio = "aspect-video", // 'aspect-square', 'aspect-video', 'aspect-[4/3]'
  className = ""
}) => {
  
  const getCardClasses = () => {
    const baseClasses = "group transition-all duration-300 overflow-hidden";
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white rounded-lg shadow-lg hover:shadow-xl`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 rounded-lg`;
      default:
        return `${baseClasses} bg-white rounded-lg shadow-md hover:shadow-lg`;
    }
  };

  return (
    <article className={`${getCardClasses()} ${className}`}>
      {/* Post Image */}
      {showImage && post.data.image && (
        <div className={`${imageAspectRatio} overflow-hidden`}>
          <img
            src={post.data.image}
            alt={post.data.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Post Content */}
      <div className="p-6">
        {/* Post Meta */}
        <div className="flex items-center justify-between mb-4">
          {showDate && post.data.date && (
            <time className="text-sm text-gray-500 font-medium">
              {new Date(post.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
          {showCategory && post.data.category && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {post.data.category}
            </span>
          )}
        </div>

        {/* Post Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-200">
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
            href={`/posts/[slug]`}
            className="block"
          >
            {post.data.title}
          </Link>
        </h3>

        {/* Post Description */}
        {showDescription && post.data.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.data.description}
          </p>
        )}

        {/* Read More Link */}
        <Link
          as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
          href={`/posts/[slug]`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          Read More
          <ArrowIcon className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;

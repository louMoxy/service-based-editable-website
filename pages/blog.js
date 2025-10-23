import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Layout, { GradientBackground } from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Blog({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={`Blog - ${globalData.name}`} description={globalData.blogTitle} />
      <Breadcrumbs />
      <main className="w-full my-12 max-w-7xl mx-auto px-8">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {globalData.blogTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tips, and stories from our coaching journey
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <BlogPostCard
              key={post.filePath}
              post={post}
              cardStyle="default"
              showImage={true}
              showCategory={true}
              showDate={true}
              showDescription={true}
            />
          ))}
        </div>

        {/* No Posts Message */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No posts yet</h2>
            <p className="text-gray-500">Check back soon for new content!</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}

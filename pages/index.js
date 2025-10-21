import { getPosts } from '../utils/mdx-utils';
import Hero from '../components/Hero';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ContentSection from '../components/ContentSection';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import ImageGallery from '../components/ImageGallery';
import FAQ from '../components/FAQ';
import SocialLinks from '../components/SocialLinks';
import NetlifyForm from '../components/NetlifyForm';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      
      {/* Hero Section */}
      <Hero
        headline="Transform Your Business with Expert Coaching"
        subheadline="Unlock your potential and achieve breakthrough results with personalized coaching strategies designed for your success."
        primaryButtonText="Book a Free Discovery Call"
        primaryButtonLink="/contact"
        secondaryButtonText="View Coaching Packages"
        secondaryButtonLink="/packages"
        heroImage="/images/hero-image.jpg"
        overlayOpacity="bg-black/50"
      />
      <NetlifyForm />
      <Carousel />      

      <ContentSection
        title="Our Services"
        subtitle="Discover what we can do for you"
        columns={2}
        column1={
          {
            type: 'text',
            title: 'Service 1',
            content: 'Description of service 1',
            image: null,
            ctaText: null,
            ctaLink: null
          }
        }
        column2={
          {
            type: 'text',
            title: 'Service 2',
            content: 'Description of service 2',
            image: null,
            ctaText: null,
            ctaLink: null
          }
        }
        column3={
          {
            type: 'text',
            title: 'Service 3',
            content: 'Description of service 3',
            image: null,
            ctaText: null,
            ctaLink: null
          }
        }
      />
      <SocialLinks />

      <Stats
        title="Our Impact"
        subtitle="Numbers that speak for themselves"
        cards={
          [
            {
              title: 'Happy Clients',
              subtitle: 'Satisfied customers',
              description: 'Clients who have transformed their lives with our coaching',
              number: 500,
              suffix: '+',
              prefix: '',
              icon: 'Users',
              image: null,
              animationDuration: 2000
            }
          ]
        }
      />    

      <Testimonials
        title="What Our Clients Say"
        subtitle="Real stories from real people who have transformed their lives"
        layout="grid"
        columns={2}
        testimonials={
          [
            {
              quote: 'This coaching program completely transformed my business. I went from struggling to make ends meet to generating six-figure revenue in just 8 months.',
              name: 'Sarah Johnson',
              business: 'E-commerce Entrepreneur',
              rating: 5
            },
            {
              quote: 'The personalized approach and expert guidance helped me overcome my biggest challenges and achieve goals I never thought possible.',
              name: 'Michael Chen',
              business: 'Tech Startup Founder',
              rating: 5
            }
          ]
        }
      />
      <ImageGallery
        title=""
        subtitle=""
        columns={3}
        aspectRatio="wide"
        showTitles={false}
        lightbox={true}
        showDescriptions={false}
        hoverEffect="overlay"
        images={
          [
            {
              src: '/images/gallery-1.jpg',
              alt: 'Gallery Image 1',
              title: 'Image Title',
              description: 'Optional description text',
            },
            {
              src: '/images/gallery-2.jpg',
              alt: 'Gallery Image 2',
              title: 'Another Image',
              description: 'More details about this image',
            }
          ]
        }
      />
      <FAQ />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}

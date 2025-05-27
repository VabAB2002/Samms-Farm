import { safeFetch, urlFor } from '@/lib/sanity/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Sanity query to fetch a specific blog post by slug
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "categories": categories[]->title,
    "authorName": author->name,
    "authorImage": author->image,
    "authorBio": author->bio
  }`;
  
  const post = await safeFetch(query, { slug });
  
  // Return mock data if post not found or Sanity credentials are missing
  if (!post) {
    return {
      _id: 'mock-post',
      title: slug === 'welcome-to-samms-farm' ? 'Welcome to Samm\'s Farm Blog' : 'Blog Post Not Found',
      slug: { current: slug },
      publishedAt: new Date().toISOString(),
      body: 'This is a placeholder post content. Add your Sanity credentials to fetch real blog content.',
      categories: ['Farm Life'],
      authorName: 'The Samm\'s Farm Team',
      authorBio: 'We are passionate about sustainable farming and community.'
    };
  }
  
  return post;
}

// Generate metadata for the post
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return {
    title: `${post?.title || 'Blog Post'} | Samm's Farm`,
    description: post?.body?.[0]?.children?.[0]?.text?.substring(0, 160) || "Read our latest blog post"
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12 md:py-20">
          <section className="container mx-auto px-4">
            <div className="text-center py-12 bg-cream-50 rounded-lg">
              <h2 className="text-2xl font-serif text-brown-800 mb-2">Post Not Found</h2>
              <p className="text-brown-700 mb-6">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/blog" className="inline-block px-6 py-2 bg-terracotta-600 text-white rounded-md hover:bg-terracotta-700 transition-colors">
                Back to Blog
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-brown-700 hover:text-terracotta-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to All Posts
            </Link>
          </div>
          
          <div className="mb-8">
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4">
                {post.categories.map((category: string, index: number) => (
                  <span key={index} className="inline-block bg-terracotta-100 text-terracotta-800 text-xs px-2 py-1 rounded mr-2">
                    {category}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-brown-800 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-6">
              {post.authorImage && (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={urlFor(post.authorImage).width(80).height(80).url()} 
                    alt={post.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-brown-800 font-medium">{post.authorName}</div>
                <div className="text-brown-500 text-sm">{formatDate(post.publishedAt)}</div>
              </div>
            </div>
          </div>
          
          {post.mainImage && (
            <div className="rounded-lg overflow-hidden mb-12">
              <img 
                src={urlFor(post.mainImage).width(1200).url()} 
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brown-800 prose-p:text-brown-700 prose-a:text-terracotta-600 prose-a:no-underline hover:prose-a:underline">
            {/* This is a placeholder for the post content - in a real app, you would use a Sanity block content renderer here */}
            <div dangerouslySetInnerHTML={{ __html: "This is where the Sanity rich text content would be rendered. In a complete implementation, you would use the @sanity/block-content-to-react package to render the post.body field." }} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-brown-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-serif text-brown-800 mb-2">About the Author</h3>
                <div className="flex items-start">
                  {post.authorImage && (
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={urlFor(post.authorImage).width(128).height(128).url()} 
                        alt={post.authorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-brown-800 font-medium mb-1">{post.authorName}</div>
                    <p className="text-brown-700 text-sm">{post.authorBio || "A passionate contributor to Samm's Farm."}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-brown-800 mb-2">Share This Post</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-brown-600 hover:text-terracotta-600 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="text-brown-600 hover:text-terracotta-600 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="text-brown-600 hover:text-terracotta-600 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-brown-200">
            <h2 className="text-2xl font-serif text-brown-800 mb-6">You Might Also Enjoy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* This would be populated with related posts in a real implementation */}
              <div className="bg-cream-50 p-6 rounded-lg">
                <h3 className="text-lg font-serif text-brown-800 mb-2">Related posts would appear here</h3>
                <p className="text-brown-700 text-sm">In a full implementation, this section would show related posts based on categories or tags.</p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

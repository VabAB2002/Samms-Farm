import { safeFetch } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Sanity query to fetch blog posts
async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "categories": categories[]->title,
    "authorName": author->name,
    "authorImage": author->image
  }`;
  
  const posts = await safeFetch(query);
  
  // Return mock data if no posts are found or Sanity credentials are missing
  if (!posts || posts.length === 0) {
    return [
      {
        _id: 'mock-post-1',
        title: 'Welcome to Samm\'s Farm Blog',
        slug: { current: 'welcome-to-samms-farm' },
        publishedAt: new Date().toISOString(),
        excerpt: 'This is a placeholder post. Add your Sanity credentials to fetch real blog content.',
        categories: ['Farm Life'],
        authorName: 'The Samm\'s Farm Team'
      }
    ];
  }
  
  return posts;
}

export const metadata = {
  title: "Samm's Farm Blog",
  description: "Stories and insights from our farm, restaurant, and sustainable living practices."
};

export default async function BlogPage() {
  // Fetch blog posts from Sanity
  const posts = await getBlogPosts();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-medium text-brown-800 mb-4">
              From the Farm
            </h1>
            <div className="w-24 h-[2px] bg-terracotta-600 mx-auto mb-6" />
            <p className="text-xl text-brown-700 max-w-2xl mx-auto">
              Stories and insights from our farm, restaurant, and sustainable living practices.
            </p>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-cream-50 rounded-lg">
              <h2 className="text-2xl font-serif text-brown-800 mb-2">No Posts Yet</h2>
              <p className="text-brown-700">
                We're working on our first blog posts. Check back soon for stories from the farm!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link 
                  href={`/blog/${post.slug.current}`} 
                  key={post._id}
                  className="group"
                >
                  <article className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col hover:shadow-lg transition-shadow">
                    {post.mainImage && (
                      <div className="h-56 overflow-hidden">
                        <img 
                          src={urlFor(post.mainImage).width(500).height(300).url()} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-4">
                        {post.categories && post.categories.length > 0 && (
                          <span className="inline-block bg-terracotta-100 text-terracotta-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                            {post.categories[0]}
                          </span>
                        )}
                        <span className="text-brown-500 text-sm">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className="text-xl font-serif text-brown-800 mb-2 group-hover:text-terracotta-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-brown-600 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center mt-auto">
                        {post.authorImage && (
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                            <img 
                              src={urlFor(post.authorImage).width(50).height(50).url()} 
                              alt={post.authorName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="text-sm text-brown-700">{post.authorName}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-16 bg-cream-100 p-8 rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif text-brown-800 mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-brown-700 max-w-xl mx-auto">
                Stay updated with the latest stories, farm events, and seasonal recipes delivered to your inbox.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <Link href="/newsletter" className="block w-full py-3 bg-terracotta-600 text-white text-center rounded-md hover:bg-terracotta-700 transition-colors">
                Join Our Newsletter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

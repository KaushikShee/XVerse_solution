import { readDbAsync } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest insights on software development, technology trends, and digital innovation from XVerse Solutions.',
  openGraph: {
    title: 'Blog | XVerse Solutions',
    description: 'Latest insights on software development, technology trends, and digital innovation.',
    url: '/blog',
  },
  twitter: {
    title: 'Blog | XVerse Solutions',
    description: 'Latest insights on software development, technology trends, and digital innovation.',
  },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const db = await readDbAsync();
  const { homepageContent, blogPosts } = db;
  const published = blogPosts.filter(p => p.status === 'published').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      <Header companyName={homepageContent.companyName} />
      <main>
        <section className="wa-page-banner">
          <div className="wa-container">
            <h1>Our <span className="wa-gradient-text">Blog</span></h1>
            <p>Insights, trends, and stories from the world of software development</p>
          </div>
        </section>

        <section className="wa-section wa-section-dark">
          <div className="wa-container">
            {published.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p style={{ fontSize: '1.25rem', color: 'var(--wa-text-muted)' }}>No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: 1000, margin: '0 auto' }}>
                {published.map((post, index) => (
                  <RevealOnScroll key={post.id} delay={Math.min(index + 1, 3)}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="blog-card">
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--wa-accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--wa-text-primary)' }}>
                          {post.title}
                        </h2>
                        <p style={{ color: 'var(--wa-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                          {post.excerpt}
                        </p>
                        <span style={{ color: 'var(--wa-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                          Read More →
                        </span>
                      </div>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer content={homepageContent} />
    </>
  );
}

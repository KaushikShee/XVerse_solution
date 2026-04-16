import { readDb } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = readDb();
  const post = db.blogPosts.find(p => p.slug === slug);
  return {
    title: post ? `${post.title} | XVerse Solutions Blog` : 'Post Not Found',
    description: post?.excerpt || '',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const db = readDb();
  const post = db.blogPosts.find(p => p.slug === slug && p.status === 'published');

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header companyName={db.homepageContent.companyName} />
      <main>
        <section className="wa-page-banner" style={{ paddingBottom: '3rem' }}>
          <div className="wa-container">
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              <Link href="/blog" style={{ color: 'var(--wa-primary)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
                ← Back to Blog
              </Link>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{post.title}</h1>
              <p style={{ marginTop: '1rem' }}>
                By {post.author} • {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        <section className="wa-section wa-section-dark" style={{ paddingTop: '2rem' }}>
          <div className="wa-container">
            <div className="blog-content" style={{ maxWidth: 700, margin: '0 auto' }} dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </section>
      </main>
      <Footer content={db.homepageContent} />
    </>
  );
}

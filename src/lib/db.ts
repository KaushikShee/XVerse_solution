import fs from 'fs';
import path from 'path';
import { put, list } from '@vercel/blob';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const BLOB_FILENAME = 'xverse-db.json';

// =============================================
// Type Definitions
// =============================================

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  bgColor1: string;
  bgColor2: string;
  iconColor: string;
  liveLink?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  color1: string;
  color2: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientPosition: string;
  companyName: string;
  reviewText: string;
  starRating: number;
  avatarInitials: string;
  avatarColor1: string;
  avatarColor2: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBtn1Text: string;
  heroBtn1Link: string;
  heroBtn2Text: string;
  heroBtn2Link: string;
  heroTech: string;
  stat1Number: string;
  stat1Suffix: string;
  stat1Label: string;
  stat2Number: string;
  stat2Suffix: string;
  stat2Label: string;
  stat3Number: string;
  stat3Suffix: string;
  stat3Label: string;
  stat4Number: string;
  stat4Suffix: string;
  stat4Label: string;
  servicesLabel: string;
  servicesTitle: string;
  servicesDescription: string;
  projectsLabel: string;
  projectsTitle: string;
  projectsDescription: string;
  teamLabel: string;
  teamTitle: string;
  teamDescription: string;
  testimonialsLabel: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  companyName: string;
  companyTagline: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  copyrightText: string;
  socialLinkedin: string;
  socialGithub: string;
  socialTwitter: string;
  socialDribbble: string;
  aboutIntro: string;
  aboutMission: string;
  aboutVision: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface Database {
  users: AdminUser[];
  services: Service[];
  projects: Project[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  homepageContent: HomepageContent;
  blogPosts: BlogPost[];
  contactSubmissions: ContactSubmission[];
}

// =============================================
// Default Seed Data
// =============================================

function getDefaultData(): Database {
  return {
    users: [],
    services: [
      {
        id: '1',
        title: 'Web Development',
        icon: '💻',
        description: 'Full-stack web applications built with React, Next.js, Node.js, and modern frameworks. Scalable, secure, and performant solutions.',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Mobile Apps',
        icon: '📱',
        description: 'Native iOS, Android, and cross-platform apps with React Native & Flutter. Beautiful interfaces with seamless user experiences.',
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'UI/UX Design',
        icon: '🎨',
        description: 'User-centered design with Figma. Wireframes, prototypes, and design systems that convert visitors into customers.',
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Cloud Solutions',
        icon: '☁️',
        description: 'AWS, Azure, and GCP architecture. Serverless, microservices, and cloud-native solutions for enterprise scale.',
        order: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'eCommerce Development',
        icon: '🛒',
        description: 'Shopify, WooCommerce, and custom eCommerce platforms. Payment integration, inventory management, and scalable storefronts.',
        order: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'AI/ML Solutions',
        icon: '🤖',
        description: 'Machine learning models, AI integrations, and intelligent automation. Transform data into actionable insights.',
        order: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    projects: [
      {
        id: '1',
        title: 'FinTrack Pro',
        category: 'FinTech',
        description: 'A comprehensive banking dashboard with real-time analytics, transaction monitoring, and AI-powered insights.',
        tags: ['React', 'Node.js', 'AWS'],
        bgColor1: '#1a1a2e',
        bgColor2: '#16213e',
        iconColor: '#6366f1',
        liveLink: '#',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'HealthSync',
        category: 'Healthcare',
        description: 'Healthcare management platform connecting patients, doctors, and pharmacies with secure data sharing.',
        tags: ['React Native', 'Python', 'HIPAA'],
        bgColor1: '#1a2e1a',
        bgColor2: '#0d3d0d',
        iconColor: '#10b981',
        liveLink: '#',
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'EcoMarket',
        category: 'E-Commerce',
        description: 'Sustainable e-commerce marketplace featuring eco-friendly products with carbon footprint tracking.',
        tags: ['Next.js', 'Stripe', 'PostgreSQL'],
        bgColor1: '#2e1a2e',
        bgColor2: '#3d1a3d',
        iconColor: '#8b5cf6',
        liveLink: '#',
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'TravelMate',
        category: 'Travel',
        description: 'AI-powered travel companion app with personalized itineraries, booking integration, and local recommendations.',
        tags: ['React Native', 'AI/ML', 'GCP'],
        bgColor1: '#1a2e3d',
        bgColor2: '#0d3d4d',
        iconColor: '#22d3ee',
        liveLink: '#',
        order: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    teamMembers: [
      {
        id: '1',
        name: 'Alex Chen',
        role: 'Founder & Lead Developer',
        bio: '10+ years building scalable applications. Former tech lead at major startups. Passionate about clean code and mentoring.',
        initials: 'AC',
        color1: '#6366f1',
        color2: '#8b5cf6',
        linkedin: '#',
        github: '#',
        twitter: '#',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Sarah Mitchell',
        role: 'UI/UX Design Lead',
        bio: 'Award-winning designer with expertise in user research, prototyping, and design systems. Figma and motion design specialist.',
        initials: 'SM',
        color1: '#f472b6',
        color2: '#8b5cf6',
        linkedin: '#',
        github: '',
        twitter: '#',
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Marcus Johnson',
        role: 'Full-Stack Developer',
        bio: 'Cloud architecture expert specializing in AWS and Kubernetes. Open source contributor and performance optimization enthusiast.',
        initials: 'MJ',
        color1: '#22d3ee',
        color2: '#6366f1',
        linkedin: '#',
        github: '#',
        twitter: '#',
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Emma Williams',
        role: 'Project Manager',
        bio: 'PMP certified with agile expertise. Ensures seamless delivery from concept to launch while keeping teams motivated and clients happy.',
        initials: 'EW',
        color1: '#10b981',
        color2: '#22d3ee',
        linkedin: '#',
        github: '',
        twitter: '#',
        order: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    testimonials: [
      {
        id: '1',
        clientName: 'James Davidson',
        clientPosition: 'CEO',
        companyName: 'TechCorp Industries',
        reviewText: 'The team delivered beyond our expectations. They transformed our outdated platform into a modern, scalable solution that has increased our efficiency by 40%. Highly recommend!',
        starRating: 5,
        avatarInitials: 'JD',
        avatarColor1: '#6366f1',
        avatarColor2: '#8b5cf6',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        clientName: 'Lisa Park',
        clientPosition: 'Founder',
        companyName: 'StartupXYZ',
        reviewText: "Exceptional quality and attention to detail. They understood our vision from day one and translated it into a beautiful, functional product. The team's communication was outstanding.",
        starRating: 5,
        avatarInitials: 'LP',
        avatarColor1: '#f472b6',
        avatarColor2: '#8b5cf6',
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        clientName: 'Michael Roberts',
        clientPosition: 'CTO',
        companyName: 'Enterprise Inc',
        reviewText: "Professional and innovative approach. They didn't just build what we asked for—they challenged our assumptions and delivered something even better. A true technology partner.",
        starRating: 5,
        avatarInitials: 'MR',
        avatarColor1: '#22d3ee',
        avatarColor2: '#6366f1',
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    homepageContent: {
      heroBadge: '🚀 Trusted by 80+ Companies Worldwide',
      heroTitle: 'We Build Digital Products That Matter',
      heroSubtitle: 'A team of passionate developers, designers, and strategists crafting exceptional software solutions that transform businesses and delight users.',
      heroBtn1Text: 'Explore Our Services',
      heroBtn1Link: '/services',
      heroBtn2Text: 'Start a Project',
      heroBtn2Link: '/contact',
      heroTech: 'Powered by: React • Node.js • AWS • Flutter • Python • PostgreSQL',
      stat1Number: '150',
      stat1Suffix: '+',
      stat1Label: 'Projects Delivered',
      stat2Number: '80',
      stat2Suffix: '+',
      stat2Label: 'Happy Clients',
      stat3Number: '25',
      stat3Suffix: '+',
      stat3Label: 'Team Members',
      stat4Number: '4',
      stat4Suffix: '+',
      stat4Label: 'Years Experience',
      servicesLabel: 'What We Do',
      servicesTitle: 'Services That Drive Growth',
      servicesDescription: 'From concept to deployment, we deliver end-to-end solutions tailored to your unique business needs.',
      projectsLabel: 'Our Work',
      projectsTitle: 'Featured Projects',
      projectsDescription: 'A selection of our recent work showcasing innovation, design excellence, and technical expertise.',
      teamLabel: 'Our Team',
      teamTitle: 'Meet the Experts',
      teamDescription: 'Talented individuals passionate about technology, design, and delivering exceptional results.',
      testimonialsLabel: 'Testimonials',
      testimonialsTitle: 'What Our Clients Say',
      testimonialsDescription: "Don't just take our word for it. Here's what our clients have to say about working with us.",
      ctaHeading: 'Ready to Build Something Amazing?',
      ctaDescription: "Let's discuss your project and see how we can help bring your ideas to life. Free consultation, no strings attached.",
      ctaButtonText: 'Get in Touch →',
      companyName: 'XVerse Solutions',
      companyTagline: 'Crafting exceptional digital experiences since 2020. We turn complex ideas into elegant, scalable solutions.',
      companyEmail: 'hello@xverse.solutions',
      companyPhone: '+1 (555) 123-4567',
      companyAddress: 'San Francisco, CA',
      copyrightText: '© 2024 XVerse Solutions. All rights reserved.',
      socialLinkedin: '#',
      socialGithub: '#',
      socialTwitter: '#',
      socialDribbble: '#',
      aboutIntro: 'XVerse Solutions is a forward-thinking software development agency dedicated to building innovative digital products. We combine cutting-edge technology with creative design to deliver solutions that drive business growth and user engagement.',
      aboutMission: 'To empower businesses worldwide by delivering exceptional software solutions that are innovative, scalable, and user-centric. We believe in the power of technology to transform ideas into reality.',
      aboutVision: 'To become the most trusted technology partner for businesses seeking digital transformation, known for our commitment to quality, innovation, and client success.',
    },
    blogPosts: [
      {
        id: '1',
        title: 'The Future of Web Development in 2024',
        slug: 'future-web-development-2024',
        excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
        content: '<p>The web development landscape is constantly evolving. In 2024, we see several key trends emerging that will shape how we build digital experiences.</p><h2>AI-Powered Development</h2><p>Artificial intelligence is becoming an integral part of the development process, from code generation to testing and optimization.</p><h2>Edge Computing</h2><p>More applications are moving computation closer to the user, resulting in faster, more responsive experiences.</p><h2>WebAssembly</h2><p>WebAssembly continues to mature, enabling high-performance applications in the browser that were previously impossible.</p>',
        author: 'Alex Chen',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    contactSubmissions: [],
  };
}

// =============================================
// Storage Layer
// =============================================

const IS_VERCEL = !!process.env.BLOB_READ_WRITE_TOKEN;

// --- Local File System (Development) ---

function localRead(): Database {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(getDefaultData(), null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return getDefaultData();
  }
}

function localWrite(data: Database): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Local write failed:', e);
  }
}

// --- Vercel Blob (Production) ---

// Cached blob URL to avoid repeated list() calls within same request
let cachedBlobUrl: string | null = null;

async function blobRead(): Promise<Database> {
  try {
    // Try cached URL first (same request optimization)
    if (cachedBlobUrl) {
      const res = await fetch(cachedBlobUrl, { cache: 'no-store' });
      if (res.ok) {
        return await res.json() as Database;
      }
      // URL might be stale, clear and fall through
      cachedBlobUrl = null;
    }

    const { blobs } = await list({ prefix: BLOB_FILENAME });
    if (blobs.length > 0) {
      cachedBlobUrl = blobs[0].url;
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      if (res.ok) {
        return await res.json() as Database;
      }
    }
  } catch (e) {
    console.error('Blob read failed:', e);
  }
  return getDefaultData();
}

async function blobWrite(data: Database): Promise<void> {
  try {
    // Overwrite directly — put with addRandomSuffix:false replaces existing
    const blob = await put(BLOB_FILENAME, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false,
    });
    cachedBlobUrl = blob.url;
    console.log('Blob write success:', blob.url);
  } catch (e) {
    console.error('Blob write failed:', e);
    throw e; // Propagate error so callers know write failed
  }
}

// =============================================
// Public API
// =============================================

/**
 * Read database - sync version for backward compat.
 * On Vercel this returns default data (use readDbAsync instead).
 */
export function readDb(): Database {
  if (!IS_VERCEL) {
    return localRead();
  }
  return getDefaultData();
}

/**
 * Read database - async version. Always reads fresh data from blob.
 */
export async function readDbAsync(): Promise<Database> {
  if (!IS_VERCEL) {
    return localRead();
  }
  return await blobRead();
}

/**
 * Write database - sync version for backward compat.
 */
export function writeDb(data: Database): void {
  if (!IS_VERCEL) {
    localWrite(data);
    return;
  }
  blobWrite(data).catch(e => console.error('Async blob write failed:', e));
}

/**
 * Write database - async version. Ensures data is persisted before returning.
 */
export async function writeDbAsync(data: Database): Promise<void> {
  if (!IS_VERCEL) {
    localWrite(data);
    return;
  }
  await blobWrite(data);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}


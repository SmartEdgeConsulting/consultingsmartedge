import { MetadataRoute } from 'next'
import { client } from "@/src/sanity/client";
import { Article, jobProps } from '@/types';

export const revalidate = 3600 // Updates sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://consultingsmartedge.com'
  
  try {
    // Fetch all dynamic content from Sanity
    const [articles, careers] = await Promise.all([
      // Blog articles
      client.fetch(`
        *[_type == "articles" && !(_id in path("drafts.**"))]{ 
          "slug": slug.current, 
          publishedAt
        }
      `),
      
      // Available career listings only
      client.fetch(`
        *[_type == "careers" && available == true && !(_id in path("drafts.**"))]{ 
          "slug": slug.current,
          publishedAt
        }
      `),
    ])

    const sitemap: MetadataRoute.Sitemap = []

    // Homepage - highest priority
    sitemap.push({
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })

    // Main static pages
    const staticPages = [
      // Primary pages
      { path: '/about', changeFreq: 'monthly' as const, priority: 0.9 },
      { path: '/services', changeFreq: 'monthly' as const, priority: 0.9 },
      { path: '/contact', changeFreq: 'monthly' as const, priority: 0.8 },
      
      // Service pages
      { path: '/services/bootcamp', changeFreq: 'monthly' as const, priority: 0.8 },
      { path: '/services/bootcamp/registration', changeFreq: 'monthly' as const, priority: 0.7 },
      { path: '/services/research', changeFreq: 'monthly' as const, priority: 0.8 },
      
      // Other important pages
      { path: '/automated-data-lab', changeFreq: 'monthly' as const, priority: 0.8 },
      { path: '/blog', changeFreq: 'daily' as const, priority: 0.9 },
      { path: '/careers', changeFreq: 'weekly' as const, priority: 0.8 },
      { path: '/events', changeFreq: 'weekly' as const, priority: 0.8 },
      { path: '/consultation', changeFreq: 'monthly' as const, priority: 0.7 },
      { path: '/insights', changeFreq: 'weekly' as const, priority: 0.7 },
    ]

    staticPages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
      })
    })

    // Individual blog articles
    articles.forEach((article: Article) => {
      sitemap.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified:
           article.publishedAt 
            ? new Date(article.publishedAt)
            : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })

    // Individual career application pages (only available jobs)
    careers.forEach((career: jobProps) => {
      sitemap.push({
        url: `${baseUrl}/careers/${career._id}/apply`,
        lastModified: career.publishedAt ? new Date(career.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

    return sitemap
    
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // If something fails, at least return the homepage
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      }
    ]
  }
}
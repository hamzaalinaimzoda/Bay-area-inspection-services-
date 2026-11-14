import { Link } from "wouter";
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { getPost, blogPosts, type InlineNode } from "@/data/blog";
import { site } from "@/data/site";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderInline(item: string | InlineNode[], key: string | number) {
  if (typeof item === "string") return item;
  return (
    <span key={key}>
      {item.map((node, i) =>
        typeof node === "string" ? (
          node
        ) : (
          <Link key={i} href={node.href} className="text-primary underline underline-offset-2 hover:text-secondary transition-colors font-medium">
            {node.text}
          </Link>
        )
      )}
    </span>
  );
}

export default function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);

  if (!post) {
    return (
      <Layout>
        <Seo title="Article Not Found" description="The requested article could not be found." />
        <div className="container mx-auto px-4 max-w-3xl py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find that article. Browse the blog instead.</p>
          <Link href="/blog" className={cn(buttonVariants(), "bg-primary text-white")}>
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const postUrl = `${site.domain}/blog/${post.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.hero.startsWith("http") ? post.hero : `${site.domain}${post.hero}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": post.author,
        "url": site.domain,
      },
      "publisher": {
        "@type": "Organization",
        "name": site.name,
        "url": site.domain,
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl,
      },
      "url": postUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": site.domain },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${site.domain}/blog` },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl },
      ],
    },
  ];

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} jsonLd={jsonLd} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <article className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10 shadow-sm">
            {/* The LCP element on every post. It is already preloaded; eager +
                high fetch priority stops the browser deprioritising it behind
                the CSS and JS it discovers at the same time. */}
            <img
              src={post.hero}
              alt={post.heroAlt}
              width={1600}
              height={1200}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900">
            {post.intro.map((p, i) => (
              <p key={`intro-${i}`} className="text-xl text-gray-700 leading-relaxed">{p}</p>
            ))}

            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && <h2 className="text-2xl font-bold mt-10 mb-4">{section.heading}</h2>}
                {section.body?.map((b, j) => (
                  <p key={j}>{renderInline(b, j)}</p>
                ))}
                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j}>{renderInline(item, j)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-primary font-semibold hover:gap-2.5 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* More posts */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="h-44 overflow-hidden">
                  <img src={p.hero} alt={p.heroAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">{p.category}</span>
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors mb-3 flex-1">{p.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}

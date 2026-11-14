import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { blogPosts } from "@/data/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <Layout>
      <Seo
        title="Bay Area Home & Mold Inspection Blog"
        description="Expert advice on mold, moisture, and home inspections for Bay Area homeowners and buyers. Tips, checklists, and honest answers from certified inspectors."
        path="/blog"
      />
      <PageHero
        eyebrow="Insights & Advice"
        title="Bay Area Home Inspection & Mold Advice Blog"
        subtitle="Practical, no-nonsense guidance on mold, moisture, and home inspections — written for Bay Area homeowners and buyers."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow mb-12"
            data-testid={`card-blog-${featured.slug}`}
          >
            <div className="h-64 md:h-auto overflow-hidden">
              <img src={featured.hero} alt={featured.heroAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">Featured · {featured.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(featured.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-primary font-semibold group-hover:gap-2.5 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  data-testid={`card-blog-${post.slug}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={post.hero} alt={post.heroAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">{post.category}</span>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}

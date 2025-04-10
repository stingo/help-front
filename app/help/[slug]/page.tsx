"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Search, Menu, X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import InfoPopover from '../../../components/InfoPopover';
import { format } from 'date-fns';

function Note({ type = "info", title = "Note", children }) {
  const baseStyles = {
    info: {
      border: "border-blue-500",
      bg: "bg-zinc-100 dark:bg-zinc-800",
      icon: <Info size={18} className="text-blue-500" />,
      title: "text-blue-600 dark:text-blue-400",
    },
    success: {
      border: "border-green-500",
      bg: "bg-green-50 dark:bg-green-600/30",
      icon: <CheckCircle size={18} className="text-green-500" />,
      title: "text-green-600 dark:text-green-400",
    },
    warning: {
      border: "border-red-500",
      bg: "bg-red-50 dark:bg-red-600/30",
      icon: <AlertTriangle size={18} className="text-red-500" />,
      title: "text-red-600 dark:text-red-400",
    },
  };

  const style = baseStyles[type];

  return (
    <div className={`flex gap-3 p-4 my-6 border-l-4 rounded-md ${style.border} ${style.bg}`}>
      <div className="mt-1">{style.icon}</div>
      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-100">
        <p className={`font-semibold mb-1 ${style.title}`}>{title}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function HelpCenterPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help/${slug}/`);
        if (!res.ok) {
          console.warn(`❌ Article not found for slug: ${slug}`);
          return;
        }
        const data = await res.json();
        setArticle(data);

        if (data.category) {
          const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help-categories/${data.category}/`);
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategoryName(catData.name);
          }
        }
      } catch (err) {
        console.error("Failed to fetch article:", err);
      }
    }

    fetchArticle();
  }, [slug]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!article) return <div className="p-8 text-center">Loading article...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 dark:text-white">
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg font-semibold md:text-xl">
            <Link href="/">🎓 Upfrica Help Center</Link>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="relative hidden sm:block">
            <Search className="absolute left-2 top-2.5 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search help articles..."
              className="pl-8 pr-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm w-60"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside
          className={`fixed inset-0 z-40 bg-white dark:bg-zinc-900 md:static md:z-auto md:block md:w-64 border-r border-zinc-200 dark:border-zinc-700 p-4 overflow-y-auto transition-transform transform md:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <button onClick={toggleMenu} className="p-2">
              <X size={20} />
            </button>
            <span className="text-lg font-semibold">Menu</span>
          </div>
          <nav className="space-y-2 text-sm">
            <p className="font-semibold text-zinc-600 dark:text-zinc-400">Getting Started</p>
            <ul className="ml-2 space-y-1">
              <li><Link href="/help-center/getting-started/create-account" className="hover:underline">Create Account</Link></li>
              <li><Link href="/help-center/getting-started/verify-student-id" className="hover:underline">Verify Student ID</Link></li>
              <li><Link href="/help-center/getting-started/how-to-login" className="hover:underline">How to Login</Link></li>
            </ul>
            <p className="font-semibold text-zinc-600 dark:text-zinc-400 mt-4">Buying</p>
            <ul className="ml-2 space-y-1">
              <li><Link href="/help-center/buying/how-to-buy-products" className="hover:underline">How to Buy</Link></li>
              <li><Link href="/help-center/buying/mobile-money-payments" className="hover:underline">Mobile Money</Link></li>
            </ul>
          </nav>
        </aside>

        <main className="text-zinc-600 dark:text-zinc-300 flex-1 p-4 sm:p-6 max-w-4xl text-[18px] leading-[32px] tracking-[-0.003em] font-normal text-[#222222]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            <ol className="list-reset flex gap-2">
              <li><Link href="/" className="hover:underline">Help Center</Link></li>
              <li>/</li>
              <li className="text-zinc-700 dark:text-zinc-300">{article.title}</li>
            </ol>
          </nav>

          <div className="flex items-center justify-end gap-3 mb-4">
            <Link
              href={`/help/${slug}/edit`}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={async () => {
                if (!confirm("Are you sure you want to delete this article?")) return;

                try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help/${slug}/`, {
                    method: 'DELETE',
                  });

                  if (res.ok) {
                    alert('Article deleted.');
                    window.location.href = "/help";
                  } else {
                    alert('Failed to delete article.');
                  }
                } catch (err) {
                  console.error(err);
                  alert('An error occurred while deleting the article.');
                }
              }}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
          <article suppressHydrationWarning={true}>
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            {article.date_formatted && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                Published on {article.date_formatted}
                {article.lastmod_formatted && article.lastmod_formatted !== article.date_formatted && (
                  <> • Last edited on {article.lastmod_formatted}</>
                )}
              </p>
            )}
            {categoryName && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                Category: <span className="font-medium text-zinc-700 dark:text-white">{categoryName}</span>
              </p>
            )}
            <p className="text-zinc-500 text-sm mb-4">Tags: {article.tags}</p>
            <div className="text-zinc-500 text-xl mb-4" dangerouslySetInnerHTML={{ __html: article.summary }} />
            <hr className="my-6 border-t border-zinc-300 dark:border-zinc-700" />
            <div dangerouslySetInnerHTML={{ __html: article.body }} />

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-2">
                <span className="font-medium">Open all eventCards by default</span>
                <InfoPopover
                  content="This option will load the calendar with all the eventCards open by default and will not need to be clicked to slide down and see details. This is disabled in tiles layout to maintain integrity of tile layout design."
                  link="/help-center/calendar-settings"
                />
              </div>

              <div className="flex items-start gap-2">
                <span className="font-medium">Show full event details</span>
                <InfoPopover
                  content="Displays all eventCard details fully expanded rather than a short summary."
                  link="/help-center/full-event-details"
                />
              </div>

              <div className="flex items-start gap-2">
                <span className="font-medium">Enable navigating between cards</span>
                <InfoPopover
                  content="Enables users to navigate between eventCards using arrow keys or swipe gestures."
                  link="/help-center/event-navigation"
                />
              </div>
            </div>
            {article.note && <Note title="Note">{article.note}</Note>}
            {article.tips && <Note type="success" title="Tips">{article.tips}</Note>}
          </article>
        </main>

        <aside className="w-64 hidden xl:block p-6 text-sm border-l border-zinc-200 dark:border-zinc-700">
          <div className="sticky top-20">
            <p className="text-zinc-500 dark:text-zinc-400 font-semibold mb-2">In this article</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-300">
              <li><a href="#" className="hover:underline">{article.title}</a></li>
            </ul>
          </div>
        </aside>
      </div>

      <footer className="border-t border-zinc-200 dark:border-zinc-700 px-4 sm:px-6 py-8 mt-16 text-sm text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          <div>
            <h4 className="font-semibold mb-2 text-zinc-800 dark:text-zinc-100">Related Articles</h4>
            <ul className="space-y-1">
              <li><Link href="/help-center/getting-started/how-to-login" className="hover:underline">How to Login</Link></li>
              <li><Link href="/help-center/getting-started/verify-student-id" className="hover:underline">Verify Your Student ID</Link></li>
              <li><Link href="/help-center/buying/how-to-buy-products" className="hover:underline">How to Buy on Upfrica</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-zinc-800 dark:text-zinc-100">Help & Feedback</h4>
            <ul className="space-y-1">
              <li><Link href="/help-center/contact-support" className="hover:underline">Contact Support</Link></li>
              <li><Link href="/help-center/faq" className="hover:underline">FAQs</Link></li>
              <li><Link href="#" className="hover:underline">Was this helpful?</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-zinc-800 dark:text-zinc-100">Legal</h4>
            <ul className="space-y-1">
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:underline">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-600">
          © {new Date().getFullYear()} Upfrica. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
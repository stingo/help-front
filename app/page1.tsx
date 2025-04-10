"use client";

import { useState } from "react";
import { Sun, Moon, Search, Menu, X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Reusable Note component
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 dark:text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg font-semibold md:text-xl">
            <Link href="/help-center">🎓 Upfrica Help Center</Link>
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

      {/* Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
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

        {/* Main content */}
        <main
          className="text-zinc-600 dark:text-zinc-300 flex-1 p-4 sm:p-6 max-w-4xl text-[18px] leading-[32px] tracking-[-0.003em] font-normal text-[#222222]"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            <ol className="list-reset flex gap-2">
              <li><Link href="/help-center" className="hover:underline">Help Center</Link></li>
              <li>/</li>
              <li className="text-zinc-700 dark:text-zinc-300">Create Account</li>
            </ol>
          </nav>

          <article>
            <h2 className="text-2xl font-bold mb-2">How to Create an Account</h2>

            <Note title="Info">
              To publish a GitHub Pages site privately, you need to have an organization account.
              <br />
              Additionally, your organization must use GitHub Enterprise Cloud.
            </Note>

            <Note type="success" title="Success">
              Your Upfrica seller account has been verified successfully.
            </Note>

            <Note type="warning" title="Warning">
              Your student ID verification failed. Please upload a clearer image.
            </Note>

            <p className="mt-4">
              Need help?{" "}
              <a
                href="/help-center/contact-support"
                className="font-bold text-[#0373E9] underline underline-offset-2 cursor-pointer"
              >
                Contact Support
              </a>
            </p>

            <p className="mb-4">
              Creating an account is easy and allows you to shop, sell, and manage your profile across Upfrica.
            </p>

            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-200">
              <li>Visit the sign-up page</li>
              <li>Fill in your details</li>
              <li>Verify your email or phone</li>
            </ul>
          </article>
        </main>

        {/* TOC */}
        <aside className="w-64 hidden xl:block p-6 text-sm border-l border-zinc-200 dark:border-zinc-700">
          <div className="sticky top-20">
            <p className="text-zinc-500 dark:text-zinc-400 font-semibold mb-2">In this article</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-300">
              <li><a href="#create-account" className="hover:underline">Create Account</a></li>
              <li><a href="#verify-email" className="hover:underline">Verify Email</a></li>
              <li><a href="#next-steps" className="hover:underline">Next Steps</a></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer */}
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
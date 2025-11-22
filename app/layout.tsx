"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">🔗TinyLink</h1>
                <span className="text-sm bg-blue-500 px-2 py-1 rounded">v1.0</span>
              </div>
              <nav className="flex gap-6 items-center">
                <a href="#" className="hover:text-blue-200 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>
                  Home
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span>
                </a>
                <a href="#" className="hover:text-blue-200 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>
                  Features
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span>
                </a>
                <a href="#" className="hover:text-blue-200 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>
                  About
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span>
                </a>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">Get Started</button>
                
                {/* User Profile Dropdown */}
                <div className="flex items-center gap-3 pl-6 border-l border-blue-400 group relative cursor-not-allowed">
                  <div className="text-right">
                    <p className="text-sm font-semibold">Guest User</p>
                    <p className="text-xs text-blue-200">Free Plan</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center font-bold text-blue-900 hover:bg-blue-200 transition">
                    GU
                  </div>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span>
                </div>
              </nav>
            </div>
            <div className="mt-3 text-sm text-blue-100">
              <p>Fast • Secure • Reliable URL Shortening Service</p>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-900 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🔗 TinyLink</h3>
                <p className="text-sm text-slate-400">Fast, secure, and reliable URL shortening service. Make your links count.</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4 text-slate-200">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Home<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Features<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Pricing<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Docs<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4 text-slate-200">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Privacy Policy<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Terms of Service<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Contact Us<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                  <li><a href="#" className="text-slate-400 hover:text-blue-400 transition cursor-not-allowed group relative" onClick={(e) => e.preventDefault()}>Blog<span className="absolute left-0 -top-8 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">Working on it</span></a></li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-4 text-slate-200">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="https://x.com/Sickbooy111" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition" title="Twitter">
                    𝕏
                  </a>
                  <a href="https://github.com/AyushSharma567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-lg" title="GitHub">
                    ⭘
                  </a>
                  <a href="https://www.linkedin.com/in/ayush-sharma456/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition" title="LinkedIn">
                    in
                  </a>
                  <a href="https://discord.gg/ES9yav3B" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition" title="Discord">
                    🔷
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-700 mb-6" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} TinyLink. All rights reserved.</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold text-sm">Built with Next.js</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

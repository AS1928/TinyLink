import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyLink ",
  description: "Shorten URLs and track clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-center">🔗TinyLink</h1>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-800 text-white ">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} TinyLink. <br/> <p className="">Built with Next.js</p></p>
          </div>
        </footer>
      </body>
    </html>
  );
}

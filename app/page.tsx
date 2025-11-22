'use client';

import { useState, useEffect } from 'react';

type Link = {
  id: string;
  code: string;
  targetUrl: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
};

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch links
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/links');
      if (!response.ok) throw new Error('Failed to fetch links');
      const data = await response.json();
      setLinks(data);
      setError('');
    } catch (err) {
      setError('Failed to load links. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Create link
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    setFormLoading(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl,
          code: customCode || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || 'Failed to create link');
        return;
      }

      setSuccessMessage(`Link created successfully! Code: ${data.code}`);
      setTargetUrl('');
      setCustomCode('');
      fetchLinks();

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setFormError('Failed to create link. Please try again.');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Delete link
  const handleDelete = async (code: string) => {
    if (!confirm(`Are you sure you want to delete the link with code "${code}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/links/${code}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete link');

      fetchLinks();
    } catch (err) {
      alert('Failed to delete link. Please try again.');
      console.error(err);
    }
  };

  // Copy to clipboard
  const handleCopy = (code: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const shortUrl = `${baseUrl}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    alert('Link copied to clipboard!');
  };

  // Filter links based on search
  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.targetUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-650 to-slate-800">
      {/* Header */}
    

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Shorten Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Loooong</span> Links :)
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            TinyLink is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </p>
        </div>

        {/* Create Link Form - Modern Design */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* URL Input with Icon */}
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="Enter the link here"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Bottom Row - Code Input and Button */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="Custom code (optional)"
                pattern="[A-Za-z0-9]{6,8}"
                className="md:col-span-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={formLoading}
                className="w-full md:col-span-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                {formLoading ? 'Creating...' : 'Shorten Now!'}
              </button>
            </div>

            {/* Messages */}
            {formError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {formError}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                ✓ {successMessage}
              </div>
            )}

            {/* Helper Text */}
            <p className="text-xs text-gray-500 text-center">
              Auto Paste from Clipboard • Create unlimited links
            </p>
          </form>
        </div>

        {/* Links List Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Your Links</h2>
            <input
              type="text"
              placeholder="Search by code or URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all md:w-80"
            />
          </div>

          {loading && (
            <div className="text-center py-12 text-gray-400">
              <div className="inline-block animate-spin">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="mt-2">Loading links...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && filteredLinks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              {searchQuery ? 'No links match your search.' : 'No links yet. Create your first one above!'}
            </div>
          )}

          {!loading && !error && filteredLinks.length > 0 && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs font-semibold text-gray-400 mb-3 px-1">
                <div>Short Link</div>
                <div className="md:col-span-2">Original Link</div>
                <div>Short URL</div>
                <div>Clicks</div>
                <div>Actions</div>
              </div>
              {filteredLinks.map((link) => (
                <div key={link.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                    {/* Short Link */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{link.code.charAt(0).toUpperCase()}</span>
                      </div>
                      <a
                        href={`/code/${link.code}`}
                        className="text-blue-400 hover:text-blue-300 font-mono text-sm truncate"
                        title={`View stats for ${link.code}`}
                      >
                        {link.code}
                      </a>
                    </div>

                    {/* Original URL */}
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm truncate" title={link.targetUrl}>
                        {link.targetUrl}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Short URL Link */}
                    <div>
                      <a
                        href={`${process.env.NEXT_PUBLIC_BASE_URL || `http://${window.location.host}`}/${link.code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 truncate"
                        title="Open short link"
                      >
                        Open
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    {/* Clicks */}
                    <div className="text-white font-semibold text-sm">
                      {link.clicks}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(link.code)}
                        className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-colors"
                        title="Copy link"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(link.code)}
                        className="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-colors"
                        title="Delete link"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

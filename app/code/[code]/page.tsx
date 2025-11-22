
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// type Link = {
//   id: string;
//   code: string;
//   targetUrl: string;
//   clicks: number;
//   lastClicked: string | null;
//   createdAt: string;
//   updatedAt: string;
// };

// export default async function StatsPage({ params }: { params: { code: string } }) {
//   // const { code } = params;
//   const { code } = await params; 
//   const router = useRouter();
//   const [link, setLink] = useState<Link | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchLink = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/links/${code}`);

//         if (response.status === 404) {
//           setError('Link not found');
//           setLoading(false);
//           return;
//         }

//         if (!response.ok) {
//           throw new Error('Failed to fetch link');
//         }

//         const data = await response.json();
//         setLink(data);
//         setError('');
//       } catch (err) {
//         setError('Failed to load link statistics. Please try again.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLink();
//   }, [code]);




//   const handleCopy = () => {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
//     const shortUrl = `${baseUrl}/${link?.code}`;
//     navigator.clipboard.writeText(shortUrl);
//     alert('Link copied to clipboard!');
//   };

//   const handleDelete = async () => {
//     if (!link) return;

//     if (!confirm(`Are you sure you want to delete this link?`)) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/links/${link.code}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) throw new Error('Failed to delete link');

//       alert('Link deleted successfully');
//       router.push('/');
//     } catch (err) {
//       alert('Failed to delete link. Please try again.');
//       console.error(err);
//     }
//   };

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return 'Never';
//     return new Date(dateString).toLocaleString();
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-gray-600">Loading statistics...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !link) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
//           <h2 className="text-xl font-semibold mb-2">Error</h2>
//           <p>{error || 'Link not found'}</p>
//           <button
//             onClick={() => router.push('/')}
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
//   const shortUrl = `${baseUrl}/${link.code}`;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <button
//           onClick={() => router.push('/')}
//           className="text-blue-600 hover:underline"
//         >
//           ← Back to Dashboard
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6">Link Statistics</h1>

//         <div className="space-y-6">
//           {/* Short Code */}
//           <div>
//             <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2">
//               Short Code
//             </h2>
//             <div className="flex items-center gap-3">
//               <code className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded">
//                 {link.code}
//               </code>
//               <button
//                 onClick={handleCopy}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Copy Link
//               </button>
//             </div>
//             <p className="text-sm text-gray-500 mt-2">{shortUrl}</p>
//           </div>

//           {/* Target URL */}
//           <div>
//             <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2">
//               Target URL
//             </h2>
//             <a
//               href={link.targetUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline break-all"
//             >
//               {link.targetUrl}
//             </a>
//           </div>

//           {/* Statistics Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
//             <div className="bg-blue-50 p-6 rounded-lg">
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
//                 Total Clicks
//               </h3>
//               <p className="text-4xl font-bold text-blue-600">{link.clicks}</p>
//             </div>

//             <div className="bg-green-50 p-6 rounded-lg">
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
//                 Last Clicked
//               </h3>
//               <p className="text-lg font-semibold text-green-700">
//                 {formatDate(link.lastClicked)}
//               </p>
//             </div>

//             <div className="bg-purple-50 p-6 rounded-lg">
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
//                 Created
//               </h3>
//               <p className="text-lg font-semibold text-purple-700">
//                 {formatDate(link.createdAt)}
//               </p>
//             </div>

//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
//                 Last Updated
//               </h3>
//               <p className="text-lg font-semibold text-gray-700">
//                 {formatDate(link.updatedAt)}
//               </p>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="pt-6 border-t">
//             <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
//               Actions
//             </h2>
//             <div className="flex gap-3">
//               <a
//                 href={`/${link.code}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//               >
//                 Test Redirect
//               </a>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
//               >
//                 Delete Link
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// New Code

"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Link = {
  id: string;
  code: string;
  targetUrl: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function StatsPage({ params }: { params: Promise<{ code: string }> }) {
  const router = useRouter();
  const { code } = use(params); 

  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/links/${code}`);

        if (response.status === 404) {
          setError("Link not found");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch link");
        }

        const data = await response.json();
        setLink(data);
        setError("");
      } catch (err) {
        setError("Failed to load link statistics. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [code]);

  const handleCopy = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const shortUrl = `${baseUrl}/${link?.code}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Link copied to clipboard!");
  };

  const handleDelete = async () => {
    if (!link) return;

    if (!confirm(`Are you sure you want to delete this link?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/links/${link.code}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete link");

      alert("Link deleted successfully");
      router.push("/");
    } catch (err) {
      alert("Failed to delete link. Please try again.");
      console.error(err);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-650 to-slate-800">
        <div className="text-center py-20 text-gray-400">
          <div className="inline-block animate-spin">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="mt-4">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="mb-4">{error || "Link not found"}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  const shortUrl = `${baseUrl}/${link.code}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/")}
          className="text-blue-400 hover:text-blue-300 mb-8 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Link Statistics</h1>

          {/* Short Code Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-4">Short Code</h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <code className="text-3xl font-mono bg-blue-600/20 border border-blue-500/50 px-6 py-3 rounded-lg text-blue-300">
                {link.code}
              </code>
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Copy Link
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-3">{shortUrl}</p>
          </div>

          {/* Target URL Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Target URL</h2>
            <a
              href={link.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 break-all text-sm"
            >
              {link.targetUrl}
            </a>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500/50 rounded-lg p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Total Clicks</h3>
              <p className="text-5xl font-bold text-blue-400">{link.clicks}</p>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/50 rounded-lg p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Last Clicked</h3>
              <p className="text-lg font-semibold text-green-400">
                {formatDate(link.lastClicked)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/10 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Created</h3>
              <p className="text-lg font-semibold text-purple-400">
                {formatDate(link.createdAt)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/10 border border-cyan-500/50 rounded-lg p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Last Updated</h3>
              <p className="text-lg font-semibold text-cyan-400">
                {formatDate(link.updatedAt)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-4">Actions</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_URL || `http://${window.location.host}`}/${link.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-lg transition-all font-semibold text-center"
              >
                Test Redirect
              </a>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                Delete Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


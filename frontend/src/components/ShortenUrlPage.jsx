import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, ExternalLink } from "lucide-react";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
      window.location.href = `${backendUrl}/${url}`;
    }
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center">
      <div className="max-w-sm space-y-4 bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>
        <h2 className="text-xl font-bold">Redirecting you...</h2>
        <p className="text-xs text-slate-400">
          Please wait while we take you to your destination.
        </p>
      </div>
    </div>
  );
};

export default ShortenUrlPage;
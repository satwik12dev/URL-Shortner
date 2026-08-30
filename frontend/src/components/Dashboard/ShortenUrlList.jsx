import React from "react";
import ShortenItem from "./ShortenItem";
import { Search } from "lucide-react";

const ShortenUrlList = ({ data = [] }) => {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-8">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No matching links found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Try searching with a different URL or create a new shortened link.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <ShortenItem key={item.id || item.shortUrl} {...item} />
      ))}
    </div>
  );
};

export default ShortenUrlList;
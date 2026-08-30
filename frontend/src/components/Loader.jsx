import React from "react";
import { Loader2 } from "lucide-react";

function Loader({ message = "Loading data..." }) {
  return (
    <div className="flex justify-center items-center w-full min-h-[380px] p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-600 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Loader;
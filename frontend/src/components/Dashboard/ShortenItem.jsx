import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import api from "../../api/api";
import Graph from "./Graph";
import QRCodeModal from "../ui/QRCodeModal";
import Tilt3DCard from "../3d/Tilt3DCard";
import {
  Copy,
  Check,
  ExternalLink,
  Calendar,
  MousePointerClick,
  BarChart2,
  QrCode,
  Globe,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [isQrOpen, setIsQrOpen] = useState(false);

  const frontendUrl =
    import.meta.env.VITE_REACT_FRONT_END_URL || window.location.origin;
  const fullShortUrl = `${frontendUrl}/s/${shortUrl}`;

  let hostname = "";
  try {
    hostname = new URL(originalUrl).hostname;
  } catch (e) {
    hostname = originalUrl;
  }

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(fullShortUrl);
    setIsCopied(true);
    toast.success("Short URL copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fetchLinkAnalytics = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${shortUrl}?startDate=2024-01-01T00:00:00&endDate=2030-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load analytics");
    } finally {
      setLoader(false);
    }
  };

  const toggleAnalytics = () => {
    if (!analyticToggle && analyticsData.length === 0) {
      fetchLinkAnalytics();
    }
    setAnalyticToggle(!analyticToggle);
  };

  return (
    <Tilt3DCard className="w-full">
      <div className="glass-panel glass-panel-hover rounded-2xl transition-all duration-300 overflow-hidden group">
        {/* Main Item Row */}
        <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left info column */}
          <div className="flex-1 min-w-0 space-y-2.5">
            {/* Top domain badge + date */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate max-w-[200px]">{hostname}</span>
              </div>

              <span className="text-slate-400">•</span>

              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
              </div>
            </div>

            {/* Short URL and Destination */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <a
                  href={fullShortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg sm:text-xl font-bold font-mono text-blue-600 dark:text-indigo-300 hover:text-blue-700 dark:hover:text-indigo-200 hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>{fullShortUrl.replace(/^https?:\/\//, "")}</span>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate max-w-2xl font-mono font-normal" title={originalUrl}>
                {originalUrl}
              </p>
            </div>

            {/* Metrics tags */}
            <div className="flex items-center gap-3 pt-1">
              <span className="py-1 px-3 rounded-lg bg-blue-50 dark:bg-indigo-950/60 text-blue-700 dark:text-indigo-300 border border-blue-200 dark:border-indigo-800/40 text-xs font-mono font-bold flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
                <span>
                  {clickCount} {clickCount === 1 ? "Click" : "Clicks"}
                </span>
              </span>

              {clickCount > 50 && (
                <span className="py-1 px-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 text-xs font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Trending</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:self-auto self-start pt-2 lg:pt-0">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                isCopied
                  ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* QR Code Button */}
            <button
              onClick={() => setIsQrOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
              title="Generate QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>QR Code</span>
            </button>

            {/* Analytics Expand Button */}
            <button
              onClick={toggleAnalytics}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                analyticToggle
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-blue-50 dark:bg-indigo-950/60 text-blue-700 dark:text-indigo-300 border border-blue-200 dark:border-indigo-800/50 hover:bg-blue-100"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Analytics</span>
              {analyticToggle ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Recharts Analytics Drawer */}
        {analyticToggle && (
          <div className="border-t border-slate-200 dark:border-white/5 bg-slate-50/70 dark:bg-slate-950/80 p-5 sm:p-6 transition-all duration-300">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
                <span>Link Performance Analytics</span>
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Real-time click distribution
              </span>
            </div>

            {loader ? (
              <div className="h-64 flex flex-col items-center justify-center gap-2 text-slate-400 font-mono">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600 dark:text-indigo-400" />
                <span className="text-xs font-medium">Loading link metrics...</span>
              </div>
            ) : (
              <div className="w-full min-h-[280px] pt-2">
                <Graph graphData={analyticsData} />
              </div>
            )}
          </div>
        )}

        <QRCodeModal
          isOpen={isQrOpen}
          onClose={() => setIsQrOpen(false)}
          url={fullShortUrl}
          shortUrl={shortUrl}
        />
      </div>
    </Tilt3DCard>
  );
};

export default ShortenItem;
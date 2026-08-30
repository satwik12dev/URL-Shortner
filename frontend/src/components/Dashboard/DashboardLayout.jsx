import React, { useState, useMemo } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import ShortenUrlList from "./ShortenUrlList";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Tilt3DCard from "../3d/Tilt3DCard";
import Background3DCanvas from "../3d/Background3DCanvas";
import dayjs from "dayjs";
import {
  Link2,
  MousePointerClick,
  Plus,
  TrendingUp,
  BarChart3,
  Search,
  ArrowUpDown,
  Flame,
  Loader2,
} from "lucide-react";

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  function onError() {
    navigate("/error");
  }

  const {
    isLoading: isUrlsLoading,
    data: myShortenUrls = [],
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const { isLoading: isClicksLoading, data: totalClicks = [] } =
    useFetchTotalClicks(token, onError);

  const totalAllTimeClicks = useMemo(() => {
    if (!myShortenUrls || myShortenUrls.length === 0) return 0;
    return myShortenUrls.reduce(
      (acc, item) => acc + (Number(item.clickCount) || 0),
      0
    );
  }, [myShortenUrls]);

  const synchronizedGraphData = useMemo(() => {
    if (!totalClicks || totalClicks.length === 0) {
      return myShortenUrls.map((item) => ({
        clickDate: dayjs(item.createdDate).format("YYYY-MM-DD"),
        count: Number(item.clickCount) || 0,
      }));
    }

    const timelineSum = totalClicks.reduce(
      (acc, curr) => acc + (Number(curr.count) || 0),
      0
    );

    // If totalAllTimeClicks matches or if timelineSum === totalAllTimeClicks, use totalClicks directly
    if (totalAllTimeClicks === timelineSum || totalAllTimeClicks === 0) {
      return totalClicks;
    }

    // Scale timeline to accurately match totalAllTimeClicks
    const ratio = totalAllTimeClicks / (timelineSum || 1);
    let runningSum = 0;
    return totalClicks.map((item, idx) => {
      if (idx === totalClicks.length - 1) {
        const finalCount = Math.max(0, totalAllTimeClicks - runningSum);
        return { ...item, count: finalCount };
      }
      const scaled = Math.round(Number(item.count) * ratio);
      runningSum += scaled;
      return { ...item, count: scaled };
    });
  }, [totalClicks, myShortenUrls, totalAllTimeClicks]);

  const activeLinksCount = myShortenUrls?.length || 0;

  const avgClicksPerLink = useMemo(() => {
    if (!activeLinksCount) return 0;
    return (totalAllTimeClicks / activeLinksCount).toFixed(1);
  }, [totalAllTimeClicks, activeLinksCount]);

  const topPerformingLink = useMemo(() => {
    if (!myShortenUrls || myShortenUrls.length === 0) return null;
    return [...myShortenUrls].sort(
      (a, b) => (b.clickCount || 0) - (a.clickCount || 0)
    )[0];
  }, [myShortenUrls]);

  const filteredAndSortedUrls = useMemo(() => {
    if (!myShortenUrls) return [];

    let list = myShortenUrls.filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.originalUrl?.toLowerCase().includes(q) ||
        item.shortUrl?.toLowerCase().includes(q)
      );
    });

    if (sortBy === "clicks") {
      list.sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));
    } else if (sortBy === "oldest") {
      list.sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
    } else {
      list.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }

    return list;
  }, [myShortenUrls, searchQuery, sortBy]);

  const isLoading = isUrlsLoading || isClicksLoading;

  return (
    <div className="min-h-[calc(100vh-64px)] pb-20 pt-8 relative overflow-hidden">
      <Background3DCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Telemetry & Analytics Dashboard
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 pl-1 font-normal">
              Real-time link routing metrics, high-speed aliases, and engagement diagnostics.
            </p>
          </div>

          <Button
            variant="default"
            size="default"
            onClick={() => setShortenPopUp(true)}
            className="sm:self-center self-start shadow-lg font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Create Short Link</span>
          </Button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Clicks */}
          <Tilt3DCard>
            <div className="h-full glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Clicks
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center">
                  <MousePointerClick className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {totalAllTimeClicks.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Live</span>
                  <span>across all links</span>
                </p>
              </div>
            </div>
          </Tilt3DCard>

          {/* Active Links */}
          <Tilt3DCard>
            <div className="h-full glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Active Links
                </span>
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 flex items-center justify-center">
                  <Link2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {activeLinksCount}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Short URLs generated</p>
              </div>
            </div>
          </Tilt3DCard>

          {/* Avg Clicks */}
          <Tilt3DCard>
            <div className="h-full glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Avg. Clicks / Link
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {avgClicksPerLink}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Engagement density ratio</p>
              </div>
            </div>
          </Tilt3DCard>

          {/* Top Performing Link */}
          <Tilt3DCard>
            <div className="h-full glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Top Performer
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-extrabold font-mono text-blue-600 dark:text-indigo-300 truncate">
                  {topPerformingLink ? `${topPerformingLink.clickCount} clicks` : "No data"}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-1.5">
                  {topPerformingLink ? `/s/${topPerformingLink.shortUrl}` : "Create your first link"}
                </p>
              </div>
            </div>
          </Tilt3DCard>
        </div>

        {/* Recharts Traffic Section */}
        <Tilt3DCard>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-indigo-400" />
                  <span>Traffic & Click Telemetry</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Daily click stream analysis across all your active short links.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="h-72 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-indigo-400" />
                <span className="text-sm font-medium">Loading engagement telemetry...</span>
              </div>
            ) : (
              <div className="w-full min-h-[300px]">
                <Graph graphData={synchronizedGraphData} />
              </div>
            )}
          </div>
        </Tilt3DCard>

        {/* Links Management */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-blue-600 dark:text-indigo-400" />
                <span>Your Shortened Links</span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-indigo-950/80 text-blue-600 dark:text-indigo-300 border border-blue-200 dark:border-indigo-800/60">
                  {myShortenUrls.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                View, share, copy, and inspect analytics for each short route.
              </p>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search URLs or slug..."
                  className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-white dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl border border-slate-200 dark:border-white/10 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-3 h-10 text-xs sm:text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-1 text-slate-700 dark:text-slate-200"
                >
                  <option value="recent" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Most Recent</option>
                  <option value="clicks" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Most Clicks</option>
                  <option value="oldest" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Links List */}
          {isLoading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-indigo-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">Loading short URLs...</p>
            </div>
          ) : myShortenUrls.length === 0 ? (
            <div className="py-16 text-center glass-panel rounded-3xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center mx-auto shadow-inner">
                <Link2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Short Links Created Yet
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  Start shortening long URLs to track clicks, generate QR codes, and share everywhere.
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => setShortenPopUp(true)}
                className="mt-2 font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Link</span>
              </Button>
            </div>
          ) : (
            <ShortenUrlList data={filteredAndSortedUrls} />
          )}
        </div>
      </div>

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
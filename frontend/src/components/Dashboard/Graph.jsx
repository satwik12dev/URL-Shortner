import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, Calendar, Sparkles } from "lucide-react";
import dayjs from "dayjs";
import { lessDummyData } from "../../dummyData/data";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formattedDate = dayjs(label).isValid()
      ? dayjs(label).format("MMMM DD, YYYY")
      : label;
    const value = payload[0].value;

    return (
      <div className="bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white p-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/80 backdrop-blur-xl text-xs space-y-1 min-w-[140px]">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium font-mono">
          <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 pt-1 border-t border-slate-100 dark:border-white/5">
          <span className="text-slate-500 dark:text-slate-400">Clicks:</span>
          <span className="text-sm font-bold font-mono text-blue-600 dark:text-indigo-400">{value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const Graph = ({ graphData = [], title = "Click Traffic Overview" }) => {
  const [chartType, setChartType] = useState("area");
  const [timeFilter, setTimeFilter] = useState("7d");
  const [showSampleData, setShowSampleData] = useState(false);

  const activeData = useMemo(() => {
    if (showSampleData) {
      return lessDummyData.slice(-7).map((d) => ({
        ...d,
        formattedDate: dayjs(d.clickDate).format("MMM DD"),
      }));
    }

    // Build date lookup map from graphData
    const clicksMap = {};
    if (graphData && graphData.length > 0) {
      graphData.forEach((item) => {
        if (item && item.clickDate) {
          const key = dayjs(item.clickDate).format("YYYY-MM-DD");
          clicksMap[key] = (clicksMap[key] || 0) + (Number(item.count) || 0);
        }
      });
    }

    // Continuous date sequence based on timeFilter
    const daysCount = timeFilter === "30d" ? 30 : timeFilter === "all" ? 14 : 7;
    const timeline = [];
    const today = dayjs();

    for (let i = daysCount - 1; i >= 0; i--) {
      const dateObj = today.subtract(i, "day");
      const key = dateObj.format("YYYY-MM-DD");
      timeline.push({
        clickDate: key,
        formattedDate: dateObj.format("MMM DD"),
        count: clicksMap[key] || 0,
      });
    }

    return timeline;
  }, [graphData, showSampleData, timeFilter]);

  const totalClicksInRange = useMemo(() => {
    return activeData.reduce((acc, curr) => acc + curr.count, 0);
  }, [activeData]);

  return (
    <div className="w-full flex flex-col justify-between space-y-4">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {showSampleData ? "Preview Total:" : "Period Total:"}
            </span>
            <span className="text-xs sm:text-sm font-bold font-mono text-blue-700 dark:text-indigo-300 bg-blue-50 dark:bg-indigo-950/60 px-3 py-0.5 rounded-full border border-blue-200 dark:border-indigo-800/60">
              {totalClicksInRange.toLocaleString()} clicks
            </span>
          </div>

          <button
            onClick={() => setShowSampleData(!showSampleData)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
              showSampleData
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white dark:bg-slate-800/80 text-blue-600 dark:text-indigo-300 border-blue-200 dark:border-indigo-500/30 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showSampleData ? "Showing Sample" : "Preview Sample"}</span>
          </button>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          {/* Time range filters */}
          <div className="bg-white dark:bg-slate-900/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-white/5 text-xs shadow-sm">
            <button
              onClick={() => setTimeFilter("7d")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                timeFilter === "7d"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeFilter("30d")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                timeFilter === "30d"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                timeFilter === "all"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All Time
            </button>
          </div>

          {/* Chart Type toggle */}
          <div className="bg-white dark:bg-slate-900/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-white/5 shadow-sm">
            <button
              onClick={() => setChartType("area")}
              title="Area Chart"
              className={`p-1.5 rounded-lg transition-all ${
                chartType === "area"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              title="Bar Chart"
              className={`p-1.5 rounded-lg transition-all ${
                chartType === "bar"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas with explicit container height */}
      <div className="w-full h-[280px] min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          {chartType === "area" ? (
            <AreaChart
              data={activeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="clickGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                className="stroke-slate-200 dark:stroke-slate-800"
                vertical={false}
              />
              <XAxis
                dataKey="formattedDate"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
                dy={6}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#clickGlow)"
                dot={{
                  fill: "#2563eb",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  fill: "#0284c7",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                  r: 6,
                }}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={activeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                className="stroke-slate-200 dark:stroke-slate-800"
                vertical={false}
              />
              <XAxis
                dataKey="formattedDate"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
                dy={6}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
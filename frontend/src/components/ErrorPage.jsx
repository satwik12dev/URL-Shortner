import React from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Tilt3DCard from "./3d/Tilt3DCard";
import Background3DCanvas from "./3d/Background3DCanvas";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-16 text-center relative overflow-hidden bg-slate-950 text-white">
      {/* 3D Canvas */}
      <Background3DCanvas intensity="low" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        <Tilt3DCard maxTilt={10} scale={1.02}>
          <div className="space-y-6 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-rose-500/30 shadow-2xl shadow-rose-950/50">
            <div className="w-16 h-16 rounded-3xl bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Oops! Route Not Found
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed font-mono">
                {message ||
                  "We couldn't resolve the short slug destination you were looking for. It might have expired or been removed."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto font-bold shadow-lg shadow-indigo-600/30"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </Button>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    </div>
  );
};

export default ErrorPage;
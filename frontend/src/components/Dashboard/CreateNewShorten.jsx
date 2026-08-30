import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import Button from "../ui/Button";
import { Link2, Sparkles, Check, Copy, Globe2 } from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#6366f1", "#a855f7", "#ec4899", "#38bdf8"],
    });
  };

  const createShortUrlHandler = async (formData) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const frontendUrl =
        import.meta.env.VITE_REACT_FRONT_END_URL || window.location.origin;
      const fullShortUrl = `${frontendUrl}/s/${res.shortUrl}`;

      setCreatedUrl(fullShortUrl);
      fireConfetti();

      navigator.clipboard.writeText(fullShortUrl).catch(() => {});
      toast.success("Short URL created and copied to clipboard!");

      if (refetch) {
        refetch();
      }
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create short URL"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyCreatedUrl = () => {
    if (createdUrl) {
      navigator.clipboard.writeText(createdUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full text-white">
      {!createdUrl ? (
        <form
          onSubmit={handleSubmit(createShortUrlHandler)}
          className="space-y-5"
        >
          <div>
            <TextField
              label="Destination URL"
              required
              id="originalUrl"
              placeholder="https://example.com/very-long-link-to-shorten"
              type="url"
              message="Please enter a valid destination URL (http:// or https://)"
              leftIcon={<Link2 className="w-4 h-4" />}
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              isLoading={loading}
              className="min-w-[130px] font-bold shadow-lg shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Shorten URL</span>
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 text-center py-2">
          <div className="w-16 h-16 rounded-3xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
            <Check className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white font-mono">
              Your link is ready to share!
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Visitors clicking this short link will be routed instantly with telemetry tracking.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-inner">
            <span className="text-sm font-mono text-emerald-400 font-bold truncate select-all">
              {createdUrl}
            </span>
            <button
              onClick={copyCreatedUrl}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 hover:bg-slate-700 transition-colors shadow-sm"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="secondary"
              className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              onClick={() => {
                setCreatedUrl(null);
                setOpen(false);
              }}
            >
              Done
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setCreatedUrl(null);
              }}
            >
              Shorten Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewShorten;
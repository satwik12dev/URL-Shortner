import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Modal from "./Modal";
import Button from "./Button";
import { Download, Copy, Check, QrCode } from "lucide-react";
import toast from "react-hot-toast";

export const QRCodeModal = ({ isOpen, onClose, url, shortUrl }) => {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const targetUrl =
    url ||
    (shortUrl
      ? `${import.meta.env.VITE_REACT_FRONT_END_URL || window.location.origin}/s/${shortUrl}`
      : window.location.href);

  const downloadQRCode = () => {
    try {
      if (!qrRef.current) return;
      const svg = qrRef.current.querySelector("svg");
      if (!svg) {
        toast.error("QR Code not ready yet");
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 100, 100, 800, 800);

        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qrcode-${shortUrl || "link"}.png`;
        downloadLink.href = pngFile;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        toast.success("QR Code PNG downloaded!");
      };

      img.onerror = () => {
        toast.error("Failed to generate PNG image");
      };

      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
    } catch (e) {
      console.error(e);
      toast.error("Error downloading QR Code");
    }
  };

  const copyUrl = () => {
    try {
      navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      toast.success("Short URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Link QR Code"
      description="Scan with any camera or download a high-res PNG for flyers and print."
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center justify-center space-y-6 pt-2">
        {/* QR Code Container */}
        <div
          ref={qrRef}
          className="p-5 bg-white rounded-3xl shadow-xl border-4 border-blue-500/30 flex items-center justify-center relative select-none"
        >
          <QRCodeSVG
            value={targetUrl}
            size={220}
            level="H"
            includeMargin={true}
            fgColor="#0f172a"
            bgColor="#ffffff"
          />
        </div>

        {/* URL Display Box */}
        <div className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between gap-2 shadow-inner">
          <span className="text-xs font-mono text-blue-600 dark:text-indigo-300 truncate select-all">
            {targetUrl}
          </span>
          <button
            onClick={copyUrl}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            variant="secondary"
            onClick={copyUrl}
            className={`w-full transition-all duration-200 ${
              copied
                ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </Button>

          <Button
            variant="default"
            onClick={downloadQRCode}
            className="w-full font-bold shadow-lg shadow-blue-600/30"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeModal;

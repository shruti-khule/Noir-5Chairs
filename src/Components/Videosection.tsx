import React, { useRef, useEffect } from "react";

interface Props {
  sku: string;
}

export const VideoSection: React.FC<Props> = ({ sku }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Forward a postMessage after the first user gesture anywhere in the document.
  useEffect(() => {
    const handler = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "enter-ar" },
        "https://ar-chair-viewer-six.vercel.app"
      );
      window.removeEventListener("pointerdown", handler);
    };

    window.addEventListener("pointerdown", handler, { once: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <section className="mt-8 flex justify-center">
      <iframe
        ref={iframeRef}
        title="AR Viewer"
        src={`https://ar-chair-viewer-six.vercel.app/?model=${encodeURIComponent(sku)}`}
        allow="xr-spatial-tracking; camera; gyroscope; accelerometer; fullscreen; autoplay"
        sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
        className="w-[300px] h-[250px] sm:w-[800px] sm:h-[480px]"
        frameBorder={0}
      />
    </section>
  );
};
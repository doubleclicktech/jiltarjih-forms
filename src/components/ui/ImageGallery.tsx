"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-outline-variant group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`تكبير الصورة ${idx + 1}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                zoom_in
              </span>
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition-colors"
            aria-label="إغلاق"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition-colors"
                aria-label="الصورة السابقة"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition-colors"
                aria-label="الصورة التالية"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === openIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`الانتقال إلى الصورة ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

"use client";
import {
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect, useRef } from "react";

// Mock Blob type for clarity
interface Blob {
  pathname: string;
  downloadUrl: string;
}

const SWIPE_THRESHOLD = 50;

export default function ImageViewer({
  initialBlobs,
}: {
  initialBlobs: Blob[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to get the full-size URL
  const getFullsizeUrl = (previewUrl: string): string => {
    return previewUrl.replace("/preview/", "/fullsize/");
  };

  const fullsizeUrls = useMemo(() => {
    return initialBlobs.map((blob) => getFullsizeUrl(blob.downloadUrl));
  }, [initialBlobs]);

  const currentImageUrl =
    selectedIndex !== null ? fullsizeUrls[selectedIndex] : null;

  // Function to extract a simple filename from the URL for the download attribute
  const getDownloadFilename = (url: string): string => {
    // Find the last segment after the final slash
    const filename = url.substring(url.lastIndexOf("/") + 1);
    // Decode URI to handle potential spaces or special characters
    return decodeURIComponent(filename);
  };

  // --- Navigation Logic ---
  const handleClose = () => {
    setSelectedIndex(null);
    setIsLoading(false);
  };

  const selectImage = (index: number) => {
    setSelectedIndex(index);
    setIsLoading(true);
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % fullsizeUrls.length;
      selectImage(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      const prevIndex =
        (selectedIndex - 1 + fullsizeUrls.length) % fullsizeUrls.length;
      selectImage(prevIndex);
    }
  };

  const handleImageClick = (index: number) => {
    selectImage(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    console.error("Failed to load full-size image:", currentImageUrl);
  };

  // --- Keyboard Navigation (same as before) ---
  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      {/* --- Preview Image Gallery (No change) --- */}
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
        {initialBlobs.map((blob, index) => (
          <img
            key={blob.pathname}
            src={blob.downloadUrl}
            className="aspect-square cursor-pointer object-cover shadow transition-shadow duration-300 hover:shadow-md"
            alt={`Bilder der Fotografin (Vorschau ${index + 1})`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {/* --- Full-Size Gallery Modal --- */}
      {currentImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleClose}
        >
          {/* Modal Content Container */}
          <div
            className="relative flex h-full max-h-[100vh] w-full max-w-full items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`Bild ${selectedIndex! + 1} von ${fullsizeUrls.length}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white"></div>
                <p className="mt-4">Lade Bild...</p>
              </div>
            )}

            {/* The Full-Size Image */}
            <img
              src={currentImageUrl}
              alt={`Bilder der Fotografin (Volle Größe ${selectedIndex! + 1})`}
              className={`mx-auto h-full max-h-full w-full object-contain transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {/* Controls (Hidden while loading) */}
            {!isLoading && (
              <>
                <a
                  href={currentImageUrl}
                  download={getDownloadFilename(currentImageUrl)}
                  className="absolute left-4 top-4 z-50 flex size-8 items-center justify-center rounded-full bg-gray-800 bg-opacity-50 text-white transition hover:bg-opacity-75"
                  aria-label="Bild herunterladen"
                  title="Bild herunterladen"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowDownTrayIcon className="size-5" />
                </a>

                {/* Close Button (Moved slightly) */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full bg-gray-800 bg-opacity-50 text-3xl font-bold text-white transition hover:bg-opacity-75"
                  aria-label="Schließen"
                  title="Schließen (Escape)"
                >
                  <XMarkIcon className="size-5" />
                </button>

                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 top-1/2 z-50 -translate-y-1/2 transform p-4 text-white opacity-50 transition hover:opacity-75"
                  aria-label="Vorheriges Bild"
                  title="Vorheriges Bild (Linkspfeil oder Wischen nach rechts)"
                >
                  <ChevronLeftIcon className="size-8" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 z-50 -translate-y-1/2 transform p-4 text-white opacity-50 transition hover:opacity-75"
                  aria-label="Nächstes Bild"
                  title="Nächstes Bild (Rechtspfeil oder Wischen nach links)"
                >
                  <ChevronRightIcon className="size-8" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-gray-800 bg-opacity-50 px-4 py-2 text-sm font-semibold text-white">
                  {selectedIndex! + 1} / {fullsizeUrls.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { MONTH_NAMES_SHORT, getMonthGradient } from "../utils/dateUtils";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1775019039895-f04070266f06?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775412539739-477dafc02d9e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1774966961772-c73ad3a60b10?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1665311515452-a9f54c4266c9?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1773947927100-0b9516252388?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1774444487684-a796af0c2841?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1774725801222-51a94a1f4719?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1761839257469-96c78a7c2dd3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775458014077-f60db9657a52?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775126679367-3057683ced2e?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775144582926-74b7328a25d1?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1723433351321-42e35c4b21e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

/**
 * Hero image section — uses gradient placeholders for now.
 * Will be replaced with actual images later.
 */
export default function HeroImage({ month, year }) {
  const gradient = getMonthGradient(month);
  const heroImage = HERO_IMAGES[month] || null;

  return (
    <div
      className="relative h-44 md:h-64 lg:h-72 overflow-hidden"
      style={{
        backgroundImage: heroImage
          ? `linear-gradient(12deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.2) 38%, rgba(255,255,255,0.18) 100%), url("${heroImage}"), linear-gradient(160deg, ${gradient[0]} 0%, ${gradient[1]} 45%, ${gradient[2]} 100%)`
          : `linear-gradient(160deg, ${gradient[0]} 0%, ${gradient[1]} 45%, ${gradient[2]} 100%)`,
        backgroundSize: heroImage ? "cover, cover, cover" : "cover",
        backgroundPosition: heroImage ? "center, center, center" : "center",
      }}
    >
      {/* Highlight bloom to keep text readable across photos */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_16%,rgba(255,255,255,0.22)_0%,transparent_36%)]" />

      {/* Diagonal blue accent band */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-28 lg:h-32">
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,180 L0,95 L300,180 L1200,180 L1200,62 L690,180 Z"
            fill="#1fa0de"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Month/year label in corner */}
      <div className="absolute right-4 md:right-7 bottom-4 md:bottom-6 text-right z-2 leading-tight">
        <p className="text-white/90 text-xl md:text-2xl lg:text-3xl font-black tracking-tight">
          {year}
        </p>
        <p className="text-white text-lg md:text-xl lg:text-2xl font-extrabold uppercase tracking-wide">
          {MONTH_NAMES_SHORT[month]}
        </p>
      </div>
    </div>
  );
}

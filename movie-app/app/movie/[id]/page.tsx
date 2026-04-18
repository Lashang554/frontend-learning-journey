"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* ─── Types ─────────────────────────────────────────────── */
type Genre = { id: number; name: string };
type ProductionCompany = { id: number; name: string; logo_path: string | null };
type SpokenLanguage = { english_name: string };

type Movie = {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  budget: number;
  revenue: number;
  status: string;
  original_language: string;
};

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
};

/* ─── Helpers ────────────────────────────────────────────── */
const fmt = (n: number) =>
  n > 0 ? "$" + Intl.NumberFormat("en-US", { notation: "compact" }).format(n) : "N/A";

const fmtRuntime = (min: number) => {
  if (!min) return "N/A";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
};

const IMG = "https://image.tmdb.org/t/p";

/* ─── Component ──────────────────────────────────────────── */
export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!id) return;
    const fetchAll = async () => {
      try {
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}`),
        ]);
        const [movieData, creditsData, videosData] = await Promise.all([
          movieRes.json(),
          creditsRes.json(),
          videosRes.json(),
        ]);
        setMovie(movieData);
        setCast((creditsData.cast || []).slice(0, 12));
        const yt = (videosData.results || []).find(
          (v: Video) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(yt || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id, KEY]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-2 border-white/10 border-t-[#e8392a] rounded-full animate-spin" />
          <p className="text-[#8a8880] text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🎬</p>
          <p className="text-[#8a8880] text-sm tracking-widest">Movie not found</p>
          <button onClick={() => router.back()} className="mt-6 text-[#e8392a] text-sm underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const score = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const scoreNum = parseFloat(score);
  const scoreColor =
    scoreNum >= 7.5 ? "#4ade80" : scoreNum >= 6 ? "#d4a843" : "#e8392a";

  return (
    <div
      className="min-h-screen bg-[#0a0a0c] text-[#f0ede8]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* ── Backdrop hero ── */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {movie.backdrop_path ? (
          <img
            src={`${IMG}/original${movie.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.32)" }}
          />
        ) : (
          <div className="w-full h-full bg-[#111116]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/80 via-transparent to-transparent" />

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 text-[13px] text-[#f0ede8]/70 hover:text-[#f0ede8] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="tracking-wide">Back</span>
        </button>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 -mt-40 relative z-10">

        <div className="flex gap-8 items-end mb-10">
          {/* Poster */}
          <div className="hidden sm:block flex-shrink-0">
            <div className="w-[180px] rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,.9)]">
              {movie.poster_path ? (
                <img
                  src={`${IMG}/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto block"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-[#1c1c26] flex items-center justify-center text-4xl">🎬</div>
              )}
            </div>
          </div>

          {/* Title block */}
          <div className="flex-1 pb-1">
            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-[11px] tracking-widest uppercase px-2.5 py-1 bg-[#1c1c26] border border-white/10 rounded-full text-[#8a8880]"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="text-[clamp(36px,6vw,72px)] leading-none tracking-wide mb-1"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-[14px] text-[#8a8880] italic font-light mb-4 tracking-wide">
                "{movie.tagline}"
              </p>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 text-sm mb-5">
              <span
                className="text-[22px] font-semibold tabular-nums"
                style={{ color: scoreColor, fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ★ {score}
              </span>
              <span className="text-[#8a8880] text-[12px]">
                {movie.vote_count.toLocaleString()} votes
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-[#8a8880] text-[13px]">{movie.release_date?.slice(0, 4)}</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-[#8a8880] text-[13px]">{fmtRuntime(movie.runtime)}</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-[#8a8880] text-[13px] uppercase tracking-wider">{movie.status}</span>
            </div>

            {/* Trailer button */}
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2.5 bg-[#e8392a] hover:bg-[#c42d20] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all active:scale-95 shadow-[0_8px_24px_rgba(232,57,42,.35)]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 3.5l9 4.5-9 4.5V3.5z" />
                </svg>
                Watch Trailer
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-[2px] bg-[#e8392a]" />
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Overview */}
        {movie.overview && (
          <div className="max-w-3xl mb-10">
            <p className="text-[11px] tracking-[.2em] uppercase text-[#e8392a] mb-3 font-medium">
              Overview
            </p>
            <p className="text-[15px] text-[#c8c5c0] leading-relaxed font-light">
              {movie.overview}
            </p>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Budget", value: fmt(movie.budget) },
            { label: "Revenue", value: fmt(movie.revenue) },
            { label: "Language", value: movie.original_language?.toUpperCase() || "N/A" },
            {
              label: "Spoken",
              value: movie.spoken_languages?.map((l) => l.english_name).join(", ") || "N/A",
            },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#16161e] border border-white/[.07] rounded-xl p-4">
              <p className="text-[10px] tracking-[.18em] uppercase text-[#8a8880] mb-1.5">{label}</p>
              <p className="text-[15px] font-medium text-[#f0ede8] truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mb-10">
            <p className="text-[11px] tracking-[.2em] uppercase text-[#e8392a] mb-5 font-medium">
              Cast
            </p>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {cast.map((person) => (
                <div key={person.id} className="flex-shrink-0 w-[96px] group">
                  <div className="w-[96px] h-[116px] rounded-xl overflow-hidden bg-[#1c1c26] border border-white/[.07] mb-2 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_8px_20px_rgba(0,0,0,.5)]">
                    {person.profile_path ? (
                      <img
                        src={`${IMG}/w185${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl text-[#8a8880]">👤</div>
                    )}
                  </div>
                  <p className="text-[12px] font-medium text-[#f0ede8] leading-tight line-clamp-1">
                    {person.name}
                  </p>
                  <p className="text-[11px] text-[#8a8880] mt-0.5 line-clamp-1 italic">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Production companies */}
        {movie.production_companies?.filter((c) => c.logo_path).length > 0 && (
          <div className="mb-16">
            <p className="text-[11px] tracking-[.2em] uppercase text-[#e8392a] mb-5 font-medium">
              Production
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              {movie.production_companies
                .filter((c) => c.logo_path)
                .map((company) => (
                  <div
                    key={company.id}
                    className="bg-[#16161e] border border-white/[.07] rounded-lg px-5 py-3"
                  >
                    <img
                      src={`${IMG}/w154${company.logo_path}`}
                      alt={company.name}
                      className="h-7 object-contain"
                      style={{ filter: "brightness(0) invert(.65)" }}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Trailer modal ── */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
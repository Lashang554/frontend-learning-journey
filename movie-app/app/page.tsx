"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type Section = "trending" | "popular" | "top_rated" | "upcoming";

const SECTIONS: { key: Section; label: string }[] = [
  { key: "trending", label: "Trending" },
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "upcoming", label: "Upcoming" },
];

const ENDPOINTS: Record<Section, string> = {
  trending: "trending/movie/day",
  popular:  "movie/popular",
  top_rated: "movie/top_rated",
  upcoming: "movie/upcoming",
};

export default function Home() {
  const [query, setQuery]               = useState("");
  const [movies, setMovies]             = useState<Movie[]>([]);
  const [loading, setLoading]           = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("trending");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searched, setSearched]         = useState("");
  const router = useRouter();
  const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // Fetch section movies on mount and when tab changes
  useEffect(() => {
    if (isSearchMode) return;
    const load = async () => {
      setLoading(true);
      setMovies([]);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${ENDPOINTS[activeSection]}?api_key=${KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeSection, isSearchMode, KEY]);

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setMovies([]);
    setIsSearchMode(true);
    setSearched(query.trim());
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies((data.results || []).filter((m: Movie) => m.poster_path || m.title));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearched("");
    setIsSearchMode(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchMovies();
    if (e.key === "Escape") clearSearch();
  };

  const sectionLabel = SECTIONS.find((s) => s.key === activeSection)?.label ?? "";

  return (
    <div
      className="min-h-screen bg-[#0a0a0c] text-[#f0ede8]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* ── Hero ── */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[.25em] uppercase text-[#e8392a] font-medium mb-2">
            Discover Cinema
          </p>
          <h1
            className="text-[clamp(52px,10vw,88px)] leading-none tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            MOVIE<span className="text-[#e8392a]">EX</span>PLORER
          </h1>
          <p className="text-[13px] text-[#8a8880] mt-2 tracking-[.05em] font-light">
            Search millions of films — ratings, posters, release years
          </p>
        </div>

        <div className="w-10 h-0.5 bg-[#e8392a] mx-auto mb-8" />

        {/* ── Search bar ── */}
        <div className="flex gap-2.5 max-w-lg mx-auto mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none"
              viewBox="0 0 20 20" fill="none"
            >
              <circle cx="8.5" cy="8.5" r="5.5" stroke="white" strokeWidth="1.5" />
              <path d="M13 13l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Search for a movie…"
              className="w-full pl-10 pr-10 py-3 bg-[#1c1c26] border border-white/10 rounded-md text-sm text-[#f0ede8] placeholder-[#8a8880] outline-none focus:border-[#e8392a] focus:ring-2 focus:ring-[#e8392a]/25 transition-all"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8880] hover:text-[#f0ede8] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={searchMovies}
            disabled={loading || !query.trim()}
            className="bg-[#e8392a] hover:bg-[#c42d20] disabled:opacity-40 text-white text-[13px] font-medium px-5 py-3 rounded-md tracking-wide transition-all active:scale-95 whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* ── Section tabs — hidden when searching ── */}
        {!isSearchMode && (
          <div className="flex items-center gap-1 border-b border-white/[.06] mb-6">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`px-4 py-2.5 text-[13px] font-medium tracking-wide transition-all border-b-2 -mb-px ${
                  activeSection === s.key
                    ? "text-[#f0ede8] border-[#e8392a]"
                    : "text-[#8a8880] border-transparent hover:text-[#c8c5c0]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Context bar ── */}
        <div className="flex items-center justify-between mb-5 min-h-[20px]">
          {isSearchMode ? (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[12px] text-[#8a8880] tracking-wide">
                {loading ? "Searching…" : (
                  <>
                    <strong className="text-[#f0ede8]">{movies.length}</strong> results for{" "}
                    <strong className="text-[#f0ede8]">"{searched}"</strong>
                  </>
                )}
              </span>
              <button onClick={clearSearch} className="text-[11px] text-[#e8392a] hover:underline">
                ← Back to browse
              </button>
            </div>
          ) : (
            <span className="text-[12px] text-[#8a8880] tracking-wide">
              {!loading && movies.length > 0 && (
                <>
                  <strong className="text-[#f0ede8]">{movies.length}</strong>{" "}
                  {sectionLabel.toLowerCase()} movies
                </>
              )}
            </span>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center items-center py-20 gap-3">
            <span className="w-5 h-5 border-2 border-white/10 border-t-[#e8392a] rounded-full animate-spin" />
            <span className="text-[#8a8880] text-sm tracking-widest">Loading…</span>
          </div>
        )}

        {/* ── No search results ── */}
        {!loading && isSearchMode && movies.length === 0 && (
          <div className="text-center py-20 text-[#8a8880]">
            <p className="text-4xl mb-4 opacity-20">🎬</p>
            <p className="text-sm tracking-widest">No results for "{searched}"</p>
            <button onClick={clearSearch} className="mt-4 text-[#e8392a] text-sm underline">
              Clear search
            </button>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => router.push(`/movie/${movie.id}`)}
                className="group bg-[#16161e] border border-white/[.07] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,.5)]"
              >
                {/* Poster */}
                <div className="relative pt-[150%] overflow-hidden bg-[#1c1c26]">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">🎬</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 bg-black/70 border border-[#d4a843] text-[#d4a843] text-[11px] font-medium px-1.5 py-0.5 rounded opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-11 h-11 rounded-full bg-black/60 border border-white/30 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
                        <path d="M5 3.5l9 4.5-9 4.5V3.5z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 pb-3">
                  <h2 className="text-[12.5px] font-medium text-[#f0ede8] leading-snug mb-1.5 line-clamp-2">
                    {movie.title}
                  </h2>
                  <div className="flex items-center justify-between text-[11px] text-[#8a8880]">
                    <span className="tracking-wide">{movie.release_date?.slice(0, 4) || "—"}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-[#d4a843] text-[10px]">★</span>
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
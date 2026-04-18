"use client";

import { useState, KeyboardEvent } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState("");

  const searchMovies = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setMovies([]);
      setSearched(query.trim());
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies((data.results || []).filter((m: Movie) => m.poster_path || m.title));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchMovies();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f0ede8] font-sans">
      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* Hero */}
        <div className="text-center mb-12">
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

        {/* Red divider */}
        <div className="w-10 h-0.5 bg-[#e8392a] mx-auto mb-10" />

        {/* Search */}
        <div className="flex gap-2.5 max-w-lg mx-auto mb-10">
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
              className="w-full pl-10 pr-4 py-3 bg-[#1c1c26] border border-white/10 rounded-md text-sm text-[#f0ede8] placeholder-[#8a8880] outline-none focus:border-[#e8392a] focus:ring-2 focus:ring-[#e8392a]/25 transition-all"
            />
          </div>
          <button
            onClick={searchMovies}
            disabled={loading}
            className="bg-[#e8392a] hover:bg-[#c42d20] disabled:opacity-50 text-white text-[13px] font-medium px-5 py-3 rounded-md tracking-wide transition-all active:scale-95 whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-[#8a8880] text-sm tracking-widest flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white/10 border-t-[#e8392a] rounded-full animate-spin" />
            Searching…
          </p>
        )}

        {/* Result count */}
        {!loading && movies.length > 0 && (
          <div className="flex items-center justify-between text-[12px] text-[#8a8880] tracking-wide mb-5">
            <span>
              Showing <strong className="text-[#f0ede8]">{movies.length}</strong> results for{" "}
              <strong className="text-[#f0ede8]">"{searched}"</strong>
            </span>
          </div>
        )}

        {/* Empty state */}
        {!loading && searched && movies.length === 0 && (
          <div className="text-center py-16 text-[#8a8880]">
            <div className="text-4xl mb-4 opacity-30">🎬</div>
            <p className="text-sm tracking-widest">No results found — try another title</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
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
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">🎬</div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Score badge — appears on hover */}
                <div className="absolute top-2 right-2 bg-black/70 border border-[#d4a843] text-[#d4a843] text-[11px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
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

      </div>
    </div>
  );
}
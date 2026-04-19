"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  type: "movie" | "tv";
};

type NavTab = "home" | "tvseries" | "movies";

const MOVIE_GENRES = [
  { label: "Comedy",                endpoint: "discover/movie", params: "with_genres=35&sort_by=popularity.desc" },
  { label: "Thrillers & Mysteries", endpoint: "discover/movie", params: "with_genres=53,9648&sort_by=popularity.desc" },
  { label: "Documentaries",         endpoint: "discover/movie", params: "with_genres=99&sort_by=popularity.desc" },
  { label: "Romantic",              endpoint: "discover/movie", params: "with_genres=10749&sort_by=popularity.desc" },
  { label: "Mind Game Movies",      endpoint: "discover/movie", params: "with_genres=878,53&sort_by=vote_average.desc&vote_count.gte=1000" },
  { label: "Satanic & Dark Stories",endpoint: "discover/movie", params: "with_genres=27,9648&sort_by=popularity.desc" },
  { label: "Horror",                endpoint: "discover/movie", params: "with_genres=27&sort_by=popularity.desc" },
];

const TV_GENRES = [
  { label: "Comedy Series",         endpoint: "discover/tv",    params: "with_genres=35&sort_by=popularity.desc" },
  { label: "Crime & Thrillers",     endpoint: "discover/tv",    params: "with_genres=80,9648&sort_by=popularity.desc" },
  { label: "Limited Series",        endpoint: "discover/tv",    params: "with_type=4&sort_by=popularity.desc" },
  { label: "Documentary Series",    endpoint: "discover/tv",    params: "with_genres=99&sort_by=popularity.desc" },
  { label: "Romantic Series",       endpoint: "discover/tv",    params: "with_genres=10749&sort_by=popularity.desc" },
  { label: "Horror Series",         endpoint: "discover/tv",    params: "with_genres=27&sort_by=popularity.desc" },
];

const ALL_GENRES = [
  ...MOVIE_GENRES,
  { label: "Limited Series",        endpoint: "discover/tv",    params: "with_type=4&sort_by=popularity.desc" },
];

function scoreColor(v: number): string {
  if (v >= 7) return "#46d369";
  if (v >= 5.5) return "#f0a500";
  return "#e50914";
}

// ─── Hero Banner ────────────────────────────────────────────────────
function HeroBanner({ hero, navTab }: { hero: Movie | null; navTab: NavTab }) {
  const router = useRouter();
  const heroMatch = hero ? Math.round((hero.vote_average / 10) * 100) : null;
  const IMG = "https://image.tmdb.org/t/p/";

  return (
    <div
      style={{
        position: "relative",
        height: 420,
        display: "flex",
        alignItems: "flex-end",
        padding: "0 48px 48px",
        overflow: "hidden",
        background: hero?.backdrop_path
          ? `url(${IMG}w1280${hero.backdrop_path}) center/cover no-repeat`
          : hero?.poster_path
          ? `url(${IMG}w780${hero.poster_path}) center/cover no-repeat`
          : "linear-gradient(135deg, #1a0a00 0%, #2d1200 30%, #0a0a2e 70%, #141414 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(20,20,20,0.97) 0%, rgba(20,20,20,0.55) 55%, rgba(20,20,20,0.05) 100%), linear-gradient(to top, rgba(20,20,20,1) 0%, transparent 60%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "#e50914",
            borderRadius: 3,
            padding: "3px 10px",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {navTab === "tvseries" ? "TV Series" : navTab === "movies" ? "Movie" : "Featured"}
        </div>

        <h1
          style={{
            fontSize: "clamp(26px, 3.5vw, 46px)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 10,
            letterSpacing: "-0.5px",
          }}
        >
          {hero ? hero.title : "Discover What's On"}
        </h1>

        {hero && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              fontSize: 12,
            }}
          >
            {heroMatch !== null && (
              <span style={{ color: "#46d369", fontWeight: 700, fontSize: 13 }}>
                {heroMatch}% Match
              </span>
            )}
            {hero.release_date && (
              <span style={{ color: "#ccc" }}>{hero.release_date.slice(0, 4)}</span>
            )}
            <span
              style={{
                border: "1px solid #aaa",
                padding: "0 4px",
                fontSize: 10,
                borderRadius: 2,
                color: "#ccc",
              }}
            >
              HD
            </span>
            {hero.vote_average > 0 && (
              <span style={{ color: scoreColor(hero.vote_average), fontWeight: 700 }}>
                ★ {hero.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => hero && router.push(`/movie/${hero.id}`)}
            style={{
              background: "#fff",
              color: "#000",
              border: "none",
              padding: "9px 26px",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 3l9 5-9 5V3z" />
            </svg>
            Play
          </button>
          <button
            onClick={() => hero && router.push(`/movie/${hero.id}`)}
            style={{
              background: "rgba(109,109,110,0.7)",
              color: "#fff",
              border: "none",
              padding: "9px 26px",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="7.25" y="7" width="1.5" height="5" rx="0.75" />
              <rect x="7.25" y="4.5" width="1.5" height="1.5" rx="0.75" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Landscape Movie Card ────────────────────────────────────────────
function MovieCard({
  movie,
  index,
  onHover,
}: {
  movie: Movie;
  index: number;
  onHover: (m: Movie) => void;
}) {
  const router = useRouter();
  const IMG = "https://image.tmdb.org/t/p/";

  return (
    <div
      onClick={() => router.push(`/movie/${movie.id}`)}
      onMouseEnter={() => onHover(movie)}
      style={{
        flexShrink: 0,
        width: 220,
        height: 124,
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: "#2a2a2a",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)")}
      onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")}
    >
      {movie.backdrop_path || movie.poster_path ? (
        <img
          src={`${IMG}${movie.backdrop_path ? "w500" + movie.backdrop_path : "w342" + movie.poster_path}`}
          alt={movie.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: "#444",
          }}
        >
          🎬
        </div>
      )}

      {index < 10 && (
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            background: "#e50914",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
            padding: "2px 5px",
            borderRadius: 2,
            letterSpacing: "0.5px",
          }}
        >
          #{index + 1}
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="card-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 55%)",
          opacity: 0,
          transition: "opacity 0.2s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 8,
        }}
        onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
        onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}
      >
        <div
          style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.3, marginBottom: 4, color: "#fff" }}
        >
          {movie.title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#aaa" }}>{movie.release_date?.slice(0, 4) || "—"}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: movie.vote_average ? scoreColor(movie.vote_average) : "#aaa",
            }}
          >
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Genre Row ───────────────────────────────────────────────────────
function GenreRow({
  label,
  movies,
  onHover,
}: {
  label: string;
  movies: Movie[];
  onHover: (m: Movie) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -640 : 640, behavior: "smooth" });
    }
  };

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Row header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.2px" }}>{label}</h2>
        <button
          onClick={() => scroll("right")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "0.5px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            padding: "4px 14px",
            color: "#ccc",
            fontSize: 12,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#fff";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
            (e.currentTarget as HTMLButtonElement).style.color = "#ccc";
          }}
        >
          View all <span style={{ fontSize: 16, lineHeight: 1 }}>›</span>
        </button>
      </div>

      {/* Scrollable cards */}
      <div style={{ position: "relative" }}>
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(20,20,20,0.9)",
            border: "0.5px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "background 0.15s",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(229,9,20,0.85)")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(20,20,20,0.9)")
          }
        >
          ‹
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 8,
            padding: "4px 48px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} onHover={onHover} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(20,20,20,0.9)",
            border: "0.5px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "background 0.15s",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(229,9,20,0.85)")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(20,20,20,0.9)")
          }
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ─── Skeleton Row ────────────────────────────────────────────────────
function SkeletonRow({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ padding: "0 48px", marginBottom: 12 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700 }}>{label}</h2>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 48px", overflow: "hidden" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 220,
              height: 124,
              borderRadius: 4,
              background: "#2a2a2a",
              animation: "pulse 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Search Results Grid ─────────────────────────────────────────────
function SearchGrid({
  movies,
  searched,
  onClear,
  onHover,
}: {
  movies: Movie[];
  searched: string;
  onClear: () => void;
  onHover: (m: Movie) => void;
}) {
  const router = useRouter();
  const IMG = "https://image.tmdb.org/t/p/";

  return (
    <div style={{ padding: "28px 48px 60px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>
          <span
            style={{
              background: "#e50914",
              color: "#fff",
              fontSize: 11,
              fontWeight: 800,
              borderRadius: 3,
              padding: "2px 7px",
              marginRight: 8,
            }}
          >
            {movies.length}
          </span>
          Results for "{searched}"
        </h2>
        <button
          onClick={onClear}
          style={{
            background: "none",
            border: "none",
            color: "#e50914",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ← Clear search
        </button>
      </div>

      {movies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.2 }}>🎬</div>
          <p style={{ fontSize: 14 }}>No results found for "{searched}"</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 8,
          }}
        >
          {movies.map((movie, i) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/movie/${movie.id}`)}
              onMouseEnter={() => onHover(movie)}
              style={{
                height: 124,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                background: "#2a2a2a",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
              }
            >
              {movie.backdrop_path || movie.poster_path ? (
                <img
                  src={`${IMG}${movie.backdrop_path ? "w500" + movie.backdrop_path : "w342" + movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    color: "#444",
                  }}
                >
                  🎬
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 8,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                  {movie.title}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 10, color: "#aaa" }}>
                    {movie.release_date?.slice(0, 4) || "—"}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: movie.vote_average ? scoreColor(movie.vote_average) : "#aaa",
                    }}
                  >
                    ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function Home() {
  const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const IMG_BASE = "https://image.tmdb.org/t/p/";

  const [navTab, setNavTab] = useState<NavTab>("home");
  const [hero, setHero] = useState<Movie | null>(null);
  const [genreData, setGenreData] = useState<Record<string, Movie[]>>({});
  const [loadingGenres, setLoadingGenres] = useState(true);

  // Search
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searched, setSearched] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Fetch all genre rows
  useEffect(() => {
    const genres = navTab === "tvseries" ? TV_GENRES : navTab === "movies" ? MOVIE_GENRES : ALL_GENRES;
    setLoadingGenres(true);
    setGenreData({});
    setHero(null);
    setIsSearchMode(false);
    setQuery("");

    const fetchAll = async () => {
      const results = await Promise.all(
        genres.map(async (g) => {
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/${g.endpoint}?api_key=${KEY}&language=en-US&page=1&${g.params}`
            );
            const data = await res.json();
            return {
              label: g.label,
              movies: (data.results || []).map((item: any) => ({
                id: item.id,
                title: item.title || item.name || "Untitled",
                poster_path: item.poster_path || "",
                backdrop_path: item.backdrop_path || "",
                release_date: item.release_date || item.first_air_date || "",
                vote_average: item.vote_average || 0,
                overview: item.overview || "",
                type: g.endpoint.includes("tv") ? "tv" : "movie",
              })) as Movie[],
            };
          } catch {
            return { label: g.label, movies: [] };
          }
        })
      );

      const map: Record<string, Movie[]> = {};
      results.forEach((r) => (map[r.label] = r.movies));
      setGenreData(map);

      // Set hero from first genre's first item
      const first = results[0]?.movies[0];
      if (first) setHero(first);

      setLoadingGenres(false);
    };

    fetchAll();
  }, [navTab, KEY]);

  // Search handler
  const doSearch = async () => {
    if (!query.trim()) return;
    setSearchLoading(true);
    setSearchResults([]);
    setIsSearchMode(true);
    setSearched(query.trim());
    const type = navTab === "tvseries" ? "tv" : "movie";
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query)}&api_key=${KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      const results: Movie[] = (data.results || [])
        .filter((m: any) => m.poster_path || m.backdrop_path || m.title || m.name)
        .map((item: any) => ({
          id: item.id,
          title: item.title || item.name || "Untitled",
          poster_path: item.poster_path || "",
          backdrop_path: item.backdrop_path || "",
          release_date: item.release_date || item.first_air_date || "",
          vote_average: item.vote_average || 0,
          overview: item.overview || "",
          type: type as "movie" | "tv",
        }));
      setSearchResults(results);
      if (results.length > 0) setHero(results[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearched("");
    setIsSearchMode(false);
    setSearchOpen(false);
    setSearchResults([]);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") doSearch();
    if (e.key === "Escape") clearSearch();
  };

  const switchNav = (tab: NavTab) => {
    setNavTab(tab);
    clearSearch();
  };

  const genres =
    navTab === "tvseries" ? TV_GENRES : navTab === "movies" ? MOVIE_GENRES : ALL_GENRES;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#141414",
        color: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.3; } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 64,
          background: scrolled
            ? "rgba(20,20,20,0.98)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          transition: "background 0.3s",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        {/* Left: Logo + nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            onClick={() => switchNav("home")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#e50914" }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="5.5" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="12" cy="18.5" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="5.5" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="18.5" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
            </svg>
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.5px" }}>
              MOVIE<span style={{ color: "#e50914" }}>EX</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {(["home", "tvseries", "movies"] as NavTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => switchNav(tab)}
                style={{
                  background: "none",
                  border: "none",
                  color: navTab === tab ? "#fff" : "#e5e5e5",
                  fontSize: 14,
                  fontWeight: navTab === tab ? 700 : 500,
                  cursor: "pointer",
                  padding: "0 0 2px",
                  borderBottom: navTab === tab ? "2px solid #e50914" : "2px solid transparent",
                  transition: "color 0.15s",
                }}
              >
                {tab === "home" ? "Home" : tab === "tvseries" ? "TV Series" : "Movies"}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Expandable search */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: searchOpen ? "rgba(0,0,0,0.8)" : "transparent",
              border: searchOpen ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent",
              borderRadius: 4,
              overflow: "hidden",
              transition: "all 0.25s",
              width: searchOpen ? 260 : 34,
            }}
          >
            <button
              onClick={() => {
                if (searchOpen && query.trim()) doSearch();
                else setSearchOpen((o) => !o);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 9px",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="white" strokeWidth="1.5" />
                <path d="M13 13l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Titles, genres, people"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 13,
                width: searchOpen ? "100%" : 0,
                padding: searchOpen ? "8px 4px" : 0,
                opacity: searchOpen ? 1 : 0,
                transition: "all 0.25s",
                outline: "none",
              }}
            />
            {searchOpen && query && (
              <button
                onClick={clearSearch}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  padding: "0 8px",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div style={{ height: 64 }} />

      {/* ── Hero Banner ── */}
      <HeroBanner hero={hero} navTab={navTab} />

      {/* ── Content ── */}
      {isSearchMode ? (
        searchLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "80px 0",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                border: "2px solid #333",
                borderTopColor: "#e50914",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
            <span style={{ color: "#888", fontSize: 13 }}>Searching…</span>
          </div>
        ) : (
          <SearchGrid
            movies={searchResults}
            searched={searched}
            onClear={clearSearch}
            onHover={setHero}
          />
        )
      ) : (
        <div style={{ paddingTop: 24, paddingBottom: 60 }}>
          {loadingGenres
            ? genres.map((g) => <SkeletonRow key={g.label} label={g.label} />)
            : genres.map((g) => (
                <GenreRow
                  key={g.label}
                  label={g.label}
                  movies={genreData[g.label] || []}
                  onHover={setHero}
                />
              ))}
        </div>
      )}
    </div>
  );
}
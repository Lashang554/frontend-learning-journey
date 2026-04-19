import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-white/[.06] mt-auto"
      style={{
        background: "linear-gradient(to bottom, #0a0a0c, #0d0d10)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* ── Top row ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              {/* Film reel icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#e8392a]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="5.5" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="12" cy="18.5" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="5.5" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="18.5" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
              </svg>
              <span
                className="text-[22px] tracking-wide text-[#f0ede8]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                MOVIE<span className="text-[#e8392a]">EX</span>
              </span>
            </div>
            <p className="text-[12px] text-[#8a8880] font-light leading-relaxed max-w-[200px]">
              Discover, explore, and track films from around the world.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] tracking-[.2em] uppercase text-[#e8392a] font-medium mb-3">
                Browse
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: "/", label: "Home" },
                  { href: "/?section=trending", label: "Trending" },
                  { href: "/?section=top_rated", label: "Top Rated" },
                  { href: "/?section=upcoming", label: "Upcoming" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13px] text-[#8a8880] hover:text-[#f0ede8] transition-colors tracking-wide"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] tracking-[.2em] uppercase text-[#e8392a] font-medium mb-3">
                Info
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: "https://www.themoviedb.org", label: "TMDB", external: true },
                  { href: "https://developer.themoviedb.org/docs", label: "API Docs", external: true },
                  { href: "https://www.themoviedb.org/terms-of-use", label: "Terms", external: true },
                ].map(({ href, label, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-[13px] text-[#8a8880] hover:text-[#f0ede8] transition-colors tracking-wide flex items-center gap-1"
                    >
                      {label}
                      {external && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" opacity="0.5">
                          <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-[1px] bg-[#e8392a] opacity-60" />
          <div className="flex-1 h-px bg-white/[.05]" />
        </div>

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[11px] text-[#8a8880] tracking-wide">
            © {year} MovieEx. Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f0ede8] hover:text-[#e8392a] transition-colors"
            >
              Next.js
            </a>
            {" "}and the{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f0ede8] hover:text-[#e8392a] transition-colors"
            >
              TMDB API
            </a>
            .
          </p>

          {/* TMDB attribution — required by their API ToS */}
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-[#8a8880] tracking-wide">Powered by</p>
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {/* TMDB logo text badge */}
              <div className="flex items-center gap-1.5 bg-[#01b4e4]/10 border border-[#01b4e4]/20 rounded px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-[#01b4e4]" />
                <span className="text-[10px] font-medium text-[#01b4e4] tracking-wider uppercase">
                  TMDB
                </span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
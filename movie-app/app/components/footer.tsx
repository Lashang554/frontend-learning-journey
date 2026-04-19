"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        marginTop: "auto",
        background: "#141414",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 48px 32px" }}>

        {/* ── Top row ── */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#e50914" }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="5.5" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="12" cy="18.5" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="5.5" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="18.5" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
              </svg>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
                MOVIE<span style={{ color: "#e50914" }}>EX</span>
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#777", lineHeight: 1.7, maxWidth: 200 }}>
              Discover, explore, and track films from around the world.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 60 }}>

            {/* Browse */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e50914", fontWeight: 700, marginBottom: 14 }}>
                Browse
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: "/", label: "Home" },
                  { href: "/?section=trending", label: "Trending" },
                  { href: "/?section=top_rated", label: "Top Rated" },
                  { href: "/?section=upcoming", label: "Upcoming" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{ fontSize: 13, color: "#777", textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e50914", fontWeight: 700, marginBottom: 14 }}>
                Info
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: "https://www.themoviedb.org", label: "TMDB" },
                  { href: "https://developer.themoviedb.org/docs", label: "API Docs" },
                  { href: "https://www.themoviedb.org/terms-of-use", label: "Terms" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 13, color: "#777", textDecoration: "none", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
                    >
                      {label}
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 24 }} />

        {/* ── Bottom row ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

          <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.02em" }}>
            © {year} MovieEx. Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#888", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e50914")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              Next.js
            </a>
            {" "}and the{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#888", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e50914")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              TMDB API
            </a>
            .
          </p>

          {/* TMDB attribution badge */}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", opacity: 0.6, transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(1,180,228,0.08)",
              border: "1px solid rgba(1,180,228,0.2)",
              borderRadius: 4, padding: "4px 10px",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#01b4e4" }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: "#01b4e4", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                TMDB
              </span>
            </div>
          </a>

        </div>
      </div>
    </footer>
  );
}
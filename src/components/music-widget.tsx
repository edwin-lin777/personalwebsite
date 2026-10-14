import { site } from "@/data/site";

export function MusicWidget() {
  const match = site.spotifyUrl?.match(/^https:\/\/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)(?:\?.*)?$/);
  return (
    <section className="desk-music" aria-labelledby="music-title">
      <nav className="social-icons" aria-label="Social links">
        <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.55v-2.15c-3.21.7-3.89-1.36-3.89-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.12 3.05.73.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.16c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .7Z" /></svg>
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="5" r="2" fill="currentColor" /><path fill="currentColor" d="M3.3 9h3.4v12H3.3zM9.3 9h3.3v1.6c.7-1.2 1.9-1.9 3.6-1.9 3.5 0 4.5 2.2 4.5 5.5V21h-3.4v-6.2c0-1.7-.3-3-2.1-3-1.9 0-2.5 1.4-2.5 3V21H9.3z" /></svg>
        </a>
        <a href={`mailto:${site.email}`} aria-label="Email Edwin" title="Email Edwin">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="m3 6 9 7 9-7M3 18l6-6m12 6-6-6" /></svg>
        </a>
      </nav>
      <div className="music-heading"><h2 id="music-title">Now playing</h2></div>
      {match ? <iframe className="spotify-player" title="Edwin’s featured Spotify track" src={`https://open.spotify.com/embed/${match[1]}/${match[2]}?theme=0`} width="100%" height="80" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /> : <p className="music-empty">No track selected yet.</p>}
    </section>
  );
}

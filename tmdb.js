// Serverless proxy for The Movie Database (TMDB).
// Keeps your TMDB key secret: the browser calls /api/tmdb?path=..., this adds the key.
// Set TMDB_TOKEN in your hosting settings (Vercel → Project → Settings → Environment Variables).

const ALLOWED = [
  /^\/search\/multi$/,
  /^\/discover\/(movie|tv)$/,
  /^\/(movie|tv)\/\d+\/watch\/providers$/,
  /^\/watch\/providers\/(movie|tv)$/,
  /^\/genre\/(movie|tv)\/list$/,
  /^\/trending\/(all|movie|tv)\/(day|week)$/,
];

module.exports = async (req, res) => {
  const token = process.env.TMDB_TOKEN;
  if (!token) {
    res.status(500).json({ error: "setup", message: "TMDB_TOKEN is not set on the server." });
    return;
  }
  const { path, ...params } = req.query || {};
  if (typeof path !== "string" || !ALLOWED.some((re) => re.test(path))) {
    res.status(400).json({ error: "bad_path", message: "That request isn't allowed." });
    return;
  }
  const url = new URL("https://api.themoviedb.org/3" + path);
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "string" && v.length < 500) url.searchParams.set(k, v);
  }
  try {
    const r = await fetch(url, {
      headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    });
    const body = await r.text();
    // Cache at the edge for an hour; availability doesn't change minute to minute.
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.setHeader("Content-Type", "application/json");
    res.status(r.status).send(body);
  } catch (e) {
    res.status(502).json({ error: "upstream", message: "Couldn't reach TMDB. Try again in a minute." });
  }
};

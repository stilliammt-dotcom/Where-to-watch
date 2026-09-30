# Yours to Watch

Shows only the movies, shows and sports your streaming subscriptions actually include.

## What's in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app people see and use. |
| `api/tmdb.js` | A small server function that talks to TMDB for you, so your TMDB key stays secret. |
| `README.md` | This file. |

## Put it online (about 20 minutes, free)

1. **Get a TMDB key.** Make a free account at themoviedb.org, then go to Settings → API and request a key (choose "Developer", personal/non-commercial use). Copy the long **API Read Access Token** (it starts with `eyJ`).
2. **Make a GitHub account** at github.com. Create a new repository called `yours-to-watch`, then use "uploading an existing file" to drag in `index.html`, `README.md` and the `api` folder. Commit.
3. **Make a Vercel account** at vercel.com and sign in with GitHub. Click **Add New → Project**, pick `yours-to-watch`, and leave the settings as they are.
4. **Add your key.** Before clicking Deploy, open **Environment Variables**, add the name `TMDB_TOKEN` and paste your token as the value. Then click **Deploy**.
5. **Open your link** (something like `yours-to-watch.vercel.app`). If you forgot the key, the page tells you; add it under Settings → Environment Variables and redeploy.

To change the app later, edit the files on GitHub; Vercel republishes automatically.

## Things to know

- **TMDB is free only for non-commercial use.** Before you add affiliate links or charge anything, contact TMDB about a commercial license, or switch to a paid data provider.
- **Attribution is required.** Keep the footer credits to TMDB and JustWatch. TMDB also asks you to show their logo; download it from their site and add it to the footer.
- **Sports data is typed in by hand** in `index.html` (search for `const LEAGUES`). Update it when broadcast deals change.
- **Prices are approximate** (search for `const PRICE`).
- **Each person's services and list are saved in their own browser.** Accounts that sync across devices are a later step.

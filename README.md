# JPL Softball League Website

Built with [Astro](https://astro.build) + Tailwind CSS. Static site, no backend required.

## Running locally

```bash
npm install
npm run dev
```

## Editing content

All league content lives in plain JSON files under `src/data/` — no code changes needed for routine updates:

- `src/data/leagues.json` — one entry per league (B, C): name, description, field, season, commissioner/webAdmin contacts, rules link, and an optional `standingsNote` shown above that league's standings table.
- `src/data/teams.json` — team names, colors, manager/asst. manager names & phones, which `league` ("B" or "C") each team belongs to, a `roster` array of player names (leave empty until posted), and a `logo` path. To add a team logo/photo, drop the image in `public/team-logos/<team-id>.png` (or .jpg) and set that team's `logo` field to `/team-logos/<team-id>.png` — until then, the team's page shows a colored placeholder with its initials.
- `src/data/schedule.json` — games: week, date, time, field, `league`, matchup (`home`/`away` team ids), and scores. Leave `homeScore`/`awayScore` as `null` until the game is played; standings recalculate automatically once scores are filled in. If only the winner is known (no final score), set `"winner": "<team id>"` instead — it still counts toward W/L but won't affect runs for/against.

## Pages

- `/` — home, upcoming games, team list
- `/schedule` — full season schedule + downloadable `.ics` calendar
- `/standings` — auto-computed from `schedule.json`
- `/teams` — team list by league; click a team for its page (`/teams/<team-id>`) with logo, manager/asst. manager, and roster
- `/rules` — league rules and info
- `/register` — registration form (currently a placeholder Google Form embed — replace the `iframe` `src` in `src/pages/register.astro` with your real form's embed URL)
- `/contact` — board contact info

## Deploying

This is a static site — deploy the output of `npm run build` (the `dist/` folder) to Netlify, Vercel, Cloudflare Pages, or GitHub Pages. All of these have free tiers suitable for a rec league site.

## Next steps

1. Replace placeholder team names/colors/captains in `teams.json` with the real league.
2. Fill in the real schedule for the season.
3. Create a real Google Form for registration and swap the embed URL in `register.astro`.
4. Fill in real board contact info in `contact.astro`.
5. Add real photos (hero image, team photos) — drop them in `public/` and reference with `/filename.jpg`.
6. Point the `jplsoftball.org` domain at wherever you deploy.

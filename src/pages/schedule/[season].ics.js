import teams from '../../data/teams.json';
import schedule from '../../data/schedule.json';
import seasons from '../../data/seasons.json';
import { toICSDate, buildICS } from '../../utils/ics.js';

export function getStaticPaths() {
  return seasons.map((s) => ({ params: { season: s.id } }));
}

const teamById = Object.fromEntries(teams.map((t) => [t.id, t]));

export function GET({ params }) {
  const games = schedule.filter((g) => g.season === params.season);
  const body = buildICS(games, teamById);

  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="jpl-softball-${params.season}.ics"`,
    },
  });
}

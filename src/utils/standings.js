export function standingsFor(teams, schedule, leagueId, seasonId) {
  const leagueTeams = teams.filter((t) => t.league === leagueId);
  const stats = Object.fromEntries(
    leagueTeams.map((t) => [t.id, { ...t, w: 0, l: 0, rf: 0, ra: 0 }])
  );

  for (const g of schedule) {
    if (g.league !== leagueId || g.season !== seasonId) continue;
    const home = stats[g.home];
    const away = stats[g.away];
    if (!home || !away) continue;

    if (g.homeScore !== null && g.awayScore !== null) {
      home.rf += g.homeScore;
      home.ra += g.awayScore;
      away.rf += g.awayScore;
      away.ra += g.homeScore;
      if (g.homeScore > g.awayScore) {
        home.w++;
        away.l++;
      } else if (g.awayScore > g.homeScore) {
        away.w++;
        home.l++;
      }
    } else if (g.winner) {
      const loser = g.winner === g.home ? g.away : g.home;
      if (stats[g.winner]) stats[g.winner].w++;
      if (stats[loser]) stats[loser].l++;
    }
  }

  return Object.values(stats).sort((a, b) => b.w - a.w || (b.rf - b.ra) - (a.rf - a.ra));
}

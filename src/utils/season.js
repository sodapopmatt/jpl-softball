export function seasonsForLeague(seasons, leagueId) {
  return seasons
    .filter((s) => s.league === leagueId)
    .sort((a, b) => (a.start < b.start ? 1 : -1));
}

export function currentSeason(seasons, leagueId) {
  return (
    seasonsForLeague(seasons, leagueId).find((s) => s.current) ||
    seasonsForLeague(seasons, leagueId)[0]
  );
}

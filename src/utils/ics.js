export function toICSDate(dateStr, timeStr) {
  const [h, mRaw] = timeStr.replace(/\s?[AP]M/i, '').split(':');
  let hour = parseInt(h, 10);
  const minute = parseInt(mRaw, 10);
  if (/PM/i.test(timeStr) && hour !== 12) hour += 12;
  if (/AM/i.test(timeStr) && hour === 12) hour = 0;
  const d = new Date(`${dateStr}T00:00:00`);
  d.setHours(hour, minute, 0, 0);
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0] + 'Z';
}

export function buildICS(games, teamById) {
  const events = games
    .map((g) => {
      const start = toICSDate(g.date, g.time);
      const uid = `${g.date}-${g.home}-${g.away}@jplsoftball.org`;
      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${start}`,
        `DTSTART:${start}`,
        `SUMMARY:[${g.league}] ${teamById[g.away].name} @ ${teamById[g.home].name}`,
        `LOCATION:${g.field}`,
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JPL Softball League//Schedule//EN',
    events,
    'END:VCALENDAR',
  ].join('\r\n');
}

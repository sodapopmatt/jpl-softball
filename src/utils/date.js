// Schedule dates are plain "YYYY-MM-DD" strings with no time zone. Parsing them
// with `new Date(str)` treats them as UTC midnight, which can roll back a day
// once rendered in a local time zone behind UTC. Build the Date from its
// year/month/day parts instead so it lands on the intended local calendar day.
export function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatGameDate(dateStr) {
  return parseLocalDate(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

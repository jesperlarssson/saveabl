// Beräknar veckonummer enligt ISO-standard
export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // Gör måndag = 0, söndag = 6
  target.setDate(target.getDate() - dayNr + 3); // Sätt till torsdag i samma vecka

  const firstThursday = new Date(target.getFullYear(), 0, 4); // Första torsdagen i året
  const firstWeekDay = (firstThursday.getDay() + 6) % 7; // Justera till måndag = 0
  firstThursday.setDate(firstThursday.getDate() - firstWeekDay); // Sätt till måndag

  const weekNumber = Math.floor((target.getTime() - firstThursday.getTime()) / 86400000 / 7) + 1;

  // Hantera årets sista dagar som kan tillhöra nästa års vecka 1
  if (weekNumber <= 0) {
    const lastYear = target.getFullYear() - 1;
    return getWeekNumber(new Date(lastYear, 11, 31)); // Sista dagen i förra året
  }

  return weekNumber;
};

// Hämtar start- och slutdatum för en specifik vecka
export const getDatesFromWeek = (
  week: number,
  year: number = new Date().getFullYear()
): Date[] => {
  const janFirst = new Date(year, 0, 1);
  const firstDay = (janFirst.getDay() + 6) % 7; // Måndag = 0
  const daysOffset = (week - 1) * 7;

  const startDate = new Date(janFirst);
  startDate.setDate(janFirst.getDate() - firstDay + daysOffset + 1); // Måndag

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // Söndag

  return [startDate, endDate];
};

// Hämtar datum för recept som är två veckor bakåt i tiden
export const getDateForPriorRecipes = (): string => {
  const today = new Date();
  const week = getWeekNumber(today);
  const dates = getDatesFromWeek(week - 2);
  return dates[1].toISOString(); // Slutdatum för två veckor bakåt
};

// Parsar leveransdagar baserat på start- och sluttider samt etikett
export const deliveryDayParser = ({ start, end, label }: { start: any; end: any; label: any }) => {
  const day = new Date(0);
  day.setUTCSeconds(start);
  if ([0, 1, 6].includes(day.getDay())) {
    const labelSplit = label.split(" ");
    return labelSplit.slice(0, 2).join(" ");
  }
};

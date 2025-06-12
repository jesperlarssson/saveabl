export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // söndag blir 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // flyttar till torsdag i veckan
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};


export const getDatesFromWeek = (
  week: number,
  year: number = new Date().getFullYear()
): Date[] => {
  const days = week * 7;
  const startDate = new Date(year, 0, 1 + days + 2);
  const endDate = new Date(year, 0, 7 + days + 2);

  return [startDate, endDate];
};

export const getDateForPriorRecipes = () => {
  const today = new Date();
  const week = getWeekNumber(today);
  const dates = getDatesFromWeek(week - 3);
  const dateString = dates[1].toISOString();
  return dateString;
};

export const deliveryDayParser = ({ start, end, label }: {
  start: any;
  end: any;
  label: any;
}) => {
  const day = new Date(0);
  day.setUTCSeconds(start);
  // Sun = 0, Mon = 1, Sat = 6

  if ([0, 1, 6].includes(day.getDay())) {
    const labelSplit = label.split(" ");

    return labelSplit.slice(0, 2).join(" ");
  }
};
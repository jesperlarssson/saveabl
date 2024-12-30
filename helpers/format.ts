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

// Testa veckonummer och veckodatum
const today = new Date();
console.log("Idag:", today);
console.log("Veckonummer för idag:", getWeekNumber(today)); // Bör vara vecka 1
console.log("Start- och slutdatum för vecka 1:", getDatesFromWeek(1, today.getFullYear()));
console.log("Start- och slutdatum för vecka 2:", getDatesFromWeek(2, today.getFullYear()));

// Filtrera recept baserat på veckonummer
const allRecipes = [
  { id: 1, title: "Recept för vecka 1", date: "2024-12-30" }, // Måndag vecka 1
  { id: 2, title: "Recept för vecka 1", date: "2024-12-31" }, // Tisdag vecka 1
  { id: 3, title: "Recept för vecka 2", date: "2025-01-06" }, // Måndag vecka 2
];

const currentWeek = getWeekNumber(today); // Vecka 1
const nextWeek = currentWeek + 1; // Vecka 2

// Hämta start- och slutdatum för nuvarande och nästa vecka
const [startDateThisWeek, endDateThisWeek] = getDatesFromWeek(currentWeek, today.getFullYear());
const [startDateNextWeek, endDateNextWeek] = getDatesFromWeek(nextWeek, today.getFullYear());

// Filtrera recepten för denna vecka och nästa vecka
const thisWeeksRecipes = allRecipes.filter(recipe => {
  const recipeDate = new Date(recipe.date);
  return recipeDate >= startDateThisWeek && recipeDate <= endDateThisWeek;
});

const nextWeeksRecipes = allRecipes.filter(recipe => {
  const recipeDate = new Date(recipe.date);
  return recipeDate >= startDateNextWeek && recipeDate <= endDateNextWeek;
});

console.log("Recept för denna vecka:", thisWeeksRecipes); // Ska visa vecka 1
console.log("Recept för nästa vecka:", nextWeeksRecipes); // Ska visa vecka 2

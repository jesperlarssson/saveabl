export function formatEpochToTimeString({
  start,
  end,
}: {
  start: number | null | undefined;
  end: number | null | undefined;
}): string {
  if (!start || !end) {
    return "";
  }
  // Create a new Date object from the epoch timestamps
  const startDate = new Date(start * 1000);
  const endDate = new Date(end * 1000);

  // Define an array of day names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day name
  const dayName = days[startDate.getDay()];

  // Format the times
  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  return `${dayName} ${startTime}-${endTime}`;
}

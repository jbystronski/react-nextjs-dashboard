export function formatDate(
  date,
  separator = "/",
  options = { month: true, day: true, hour: false }
) {
  const newDate = new Date(date);
  const y = newDate.getFullYear();
  const m = padDate(newDate.getMonth() + 1);
  const d = padDate(newDate.getDate());
  const h =
    padDate(newDate.getHours()) +
    ":" +
    padDate(newDate.getMinutes()) +
    ":" +
    padDate(newDate.getSeconds());

  return d + separator + m + separator + y + " " + h;
}

export function addDaysToDate(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isTodayBetween(startAt, endAt) {
  const today = new Date().getTime();
  const start = new Date(startAt).getTime();
  const end = new Date(endAt).getTime();
  return today >= start && end;
}

export function padDate(num) {
  if (num !== null) {
    var str = num.toString();

    return str.length < 2 ? str.padStart(2, 0) : str;
  }
}

export function getYearFirstDay() {
  var d = new Date();
  return d.getFullYear() + "-01-01";
}

export function getToday(sep = "-") {
  var d = new Date();
  return (
    d.getFullYear() +
    sep +
    padDate(d.getMonth() + 1) +
    sep +
    padDate(d.getDate())
  );
}

export function getMonthFirstDay() {
  var d = new Date();
  return d.getFullYear() + "-" + padDate(d.getMonth() + 1) + "-01";
}

export function mapMonths(int) {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][int];
}

export function getMonth(dateString) {
  return mapMonths(new Date(dateString).getMonth());
}

export function getDay(dateString) {
  return new Date(dateString).getDate();
}

export function getHour(dateString) {
  return new Date(dateString).getHours() + ".00";
}
export const setTimeRange = (dateString, timeRange) => {
  function getYear(dateString) {
    return new Date(dateString).getFullYear();
  }

  switch (timeRange) {
    case "year":
      return getYear(dateString);

    case "month":
      return getMonth(dateString) + " " + getYear(dateString);
    case "day":
      return (
        getDay(dateString) +
        " " +
        getMonth(dateString) +
        " " +
        getYear(dateString)
      );
    case "hour":
      return (
        getDay(dateString) +
        " " +
        getMonth(dateString) +
        " " +
        getYear(dateString) +
        " " +
        getHour(dateString)
      );
    default:
      return getMonth(dateString) + " " + getYear(dateString);
  }
};

export function calculateDaysBetween(first, second) {
  const diff = new Date(first).getTime() - new Date(second).getTime();
  return parseInt(diff / (1000 * 3600 * 24));
}

/**
 * This take a year string from the api and formats it to include the century of the year
 * Greater than 94 is used as Pokemon TCG started in 1995 according to PSA
 * @param {String} year -  Year is the raw year string from api
 */
export const formatYear = (year) => {
  if (year.substring(0, 2) > 94) {
    return `19${year}`;
  }
  return `20${year}`;
};

export default {
  formatYear,
};

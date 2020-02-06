const api = 'https://api.gradedmetrics.com/';

/**
 * Get the cached API version number from local storage or return -1 if no version info exists.
 */
export const getVersion = () => Number(localStorage.getItem('version')) || -1;

/**
 * Perform a GET request to the API. This will first attempt to get the data from the user's cache.
 * @param {String} path - The API path to call (e.g. `"sets"`).
 * @param {Boolean} isCacheBypass - Bypass the cache.
 */
export const apiGet = async (path, isCacheBypass = false) => {
  const version = getVersion();

  // Gets the data from the API. It exists as a function because multiple conditions can call it.
  async function getData() {
    return fetch(`${api}${path}.json?v=${version}`).then((response) => response.json());
  }

  if (isCacheBypass) {
    // If we're bypassing the cache, call the API and return the response.
    return getData();
  }

  // Attempt to get the data from the cache.
  const cachedData = JSON.parse(localStorage.getItem('api')) || {};

  if (cachedData[path]) {
    // If the data exists in the cache, return that.
    return cachedData[path];
  }

  // Get the data from the API and cache it.
  const data = await getData();

  cachedData[path] = data;
  localStorage.setItem('api', JSON.stringify(cachedData));
  return data;
};

export default {
  apiGet,
};

const api = 'https://api.gradedmetrics.com/';

/**
 * Get the cached API version number from local storage or return -1 if no version info exists.
 */
export const getVersion = () => Number(localStorage.getItem('version')) || -1;

/**
 * This is an asynchronous delay, useful for pausing things temporarily.
 * @param {Number} milliseconds - Milliseconds to delay for.
 */
export const delay = async (milliseconds) => (
  new Promise((resolve) => setTimeout(resolve, milliseconds))
);

/**
 * Perform a GET request to the API. This will first attempt to get the data from the user's cache.
 * @param {String} path - The API path to call (e.g. `"sets"`).
 * @param {Boolean} [isCacheBypass] - Bypass the cache.
 * @param {Number} [newVersion] - The new version, used as a cache buster.
 * @param {Number} [customDelay] - Delay the response (ms).
 */
export const apiGet = async (path, isCacheBypass = false, newVersion, customDelay = 0) => {
  const version = newVersion || getVersion();

  // Gets the data from the API. It exists as a function because multiple conditions can call it.
  async function getData() {
    const now = Number(new Date());
    const data = fetch(`${api}${path}.json?v=${version}`).then((response) => response.json());
    const duration = Number(new Date()) - now;

    if (customDelay - duration > 0) {
      await new Promise((resolve) => setTimeout(resolve, customDelay - duration));
    }
    return data;
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

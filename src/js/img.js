const base = 'https://i.gradedmetrics.com/';

/**
 * Get a set icon's full image path.
 * @param {String} iconFilename - An icon file name (e.g. `2aac.png`)
 */
export const getSetIconPath = (iconFilename) => `${base}/icon/${iconFilename}`;

export default {
  getSetIconPath,
};

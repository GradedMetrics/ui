export const formatObject = (keys, data) => Object.entries(data).reduce((obj, [key, value]) => ({
  ...obj,
  [keys[key] || key]: value,
}), {});

export const formatObjectArray = (keys, data) => data.map((entry) => formatObject(keys, entry));

export default {
  formatObject,
};

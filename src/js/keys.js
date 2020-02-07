export const formatObject = (keys, data) => {
  console.log(keys);
  return Object.entries(data).reduce((obj, [ key, value ]) => ({
    ...obj,
    [keys[key] || key]: value
  }), {});
}

export const formatObjectArray = (keys, data) => {
  return data.map(entry => formatObject(keys, entry));
}

export default {
  formatObject,
};
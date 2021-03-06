export const formatObject = (keys, data) => Object.entries(data).reduce((obj, [key, value]) => {
  let response;

  if (Array.isArray(value) && typeof value[0] === 'object') {
    response = formatObjectArray(keys, value); // eslint-disable-line no-use-before-define
  } else if (!Array.isArray(value) && typeof value === 'object') {
    response = formatObject(keys, value);
  } else {
    response = value;
  }

  return {
    ...obj,
    [keys[key] || key]: response,
  };
}, {});

export const formatObjectArray = (keys, data) => data.map((entry) => formatObject(keys, entry));

export default {
  formatObject,
};

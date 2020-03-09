/**
 * Combine two grades objects by adding together all the grade sub-keys.
 * @param {Object} currentGrades - The current grades object.
 * @param {Object} newGrades - The new grades object to combine.
 */
export const combineGradeObjects = (currentGrades, newGrades) => (
  Object.entries({ ...currentGrades }).reduce((obj, [gradeNum, grades]) => ({
    ...obj,
    [gradeNum]: Object.entries(grades).reduce((obj2, [gradeKey, gradeCount]) => ({
      ...obj2,
      [gradeKey]: gradeCount + ((newGrades[gradeNum] && newGrades[gradeNum][gradeKey]) || 0),
    }), {}),
  }), {})
);

/**
 * Convert a grades object into a flat key-value object.
 * This converts `'8': { grade: 1, half: 2, qualifier: 3 }` into three separate entries in the
 * resulting object: `{ '8': 1, '8.5': 2, '8Q': 3 }` and converts the `total` entries into three
 * keys: `total`, `totalHalf` and `totalQualifier`.
 * @param {Object} grades - A grades object.
 */
export const flattenGradesObject = (grades) => (
  Object.entries(grades).reduce((flattened, [gradeNum, gradesObj]) => {
    const response = {
      ...flattened,
    };

    Object.entries(gradesObj).forEach(([gradeKey, gradeValue]) => {
      if (gradeNum === 'total') {
        if (gradeKey === 'half') {
          response.totalHalf = gradeValue;
          return;
        }

        if (gradeKey === 'qualifier') {
          response.totalQualifier = gradeValue;
          return;
        }

        response.total = gradeValue;
        return;
      }

      if (gradeKey === 'half' && gradeNum !== '1.5') {
        response[`${gradeNum}.5`] = gradeValue;
        return;
      }

      if (gradeKey === 'qualifier') {
        if (gradeNum === '1.5') {
          response['1Q'] += gradeValue;
          return;
        }
        response[`${gradeNum}Q`] = gradeValue;
        return;
      }

      response[`${gradeNum}`] = gradeValue;
    });

    return response;
  }, {})
);

/**
 * This returns a blank grades object.
 */
export const getBlankGradesObject = () => ({
  1: { grade: 0, qualifier: 0 },
  1.5: { half: 0, qualifier: 0 },
  2: { grade: 0, half: 0, qualifier: 0 },
  3: { grade: 0, half: 0, qualifier: 0 },
  4: { grade: 0, half: 0, qualifier: 0 },
  5: { grade: 0, half: 0, qualifier: 0 },
  6: { grade: 0, half: 0, qualifier: 0 },
  7: { grade: 0, half: 0, qualifier: 0 },
  8: { grade: 0, half: 0, qualifier: 0 },
  9: { grade: 0, qualifier: 0 },
  10: { grade: 0 },
  auth: { grade: 0 },
  total: { grade: 0, half: 0, qualifier: 0 },
});

export default {
  combineGradeObjects,
  flattenGradesObject,
  getBlankGradesObject,
};

/**
 * Returns a random number between 1 and faces.
 * @param {number} faces Number of faces.
 * @returns {number} Random number between 1 and faces.
 */
export const doRoll = faces => {
  return Math.floor(Math.random() * faces) + 1;
};

/**
 * Returns an array with a random number between 1 and faces, "dices" times.
 * @param {number} dices Number of dices.
 * @param {number} faces Number of faces.
 * @returns {Array.<number>} Array of random numbers between 1 and faces, "dices" times.
 */
export const doRolls = (dices, faces) => {
  let index = dices;
  let result = [];
  while (index > 0) {
    result.push(doRoll(faces));
    index--;
  }
  return result;
};
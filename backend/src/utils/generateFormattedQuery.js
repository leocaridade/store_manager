const snakeize = require('snakeize');

const getFormattedColumnNames = (object) => Object.keys(snakeize(object)).join(', ');

const getFormattedPlaceholders = (object) => Object.keys(object).map(() => '?').join(', ');

const getPlaceholdersForInsertSales = (objectArray) => {
  const columnCount = Object.keys(objectArray[0]).length + 1;
  const placeholderString = objectArray
  .map(() => `(${Array(columnCount).fill('?').join(', ')})`).join(', ');
  return placeholderString;
};

const getFormattedUpdateColumns = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = ?`)
  .join(', ');

module.exports = {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getPlaceholdersForInsertSales,
  getFormattedUpdateColumns,
};
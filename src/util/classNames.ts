const classNames = (
  conditionalNames: string | Record<string, boolean | undefined> | undefined,
  ...permanentNames: (string | undefined)[]
) => {
  if (typeof conditionalNames === 'undefined') return permanentNames.join(' ');

  if (typeof conditionalNames === 'string')
    return [conditionalNames, ...permanentNames].filter(className => Boolean(className)).join(' ');

  return Object.entries(conditionalNames)
    .reduce((acc, [key, value]) => {
      if (!value) return acc;

      return [...acc, key];
    }, permanentNames)
    .filter(className => Boolean(className))
    .join(' ');
};

export default classNames;

const classNames = (
  conditionalNames: Record<string, boolean | undefined>,
  ...permanentNames: (string | undefined)[]
) =>
  Object.entries(conditionalNames)
    .reduce((acc, [key, value]) => {
      if (!value) return acc;

      return [...acc, key];
    }, permanentNames)
    .filter(className => Boolean(className))
    .join(" ");

export default classNames;

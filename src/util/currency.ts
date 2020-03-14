const getDollarNumber = (num: number) => Math.round(num / 100);

export function getDollarString(num: number) {
  const dollarNumber = getDollarNumber(num);
  const dollarString = dollarNumber.toString();

  if (dollarString.length > 4) return dollarString;

  const comma = dollarString.length - 3;

  return `${dollarString.substring(0, comma)},${dollarString.substring(comma)}`;
}

export function getCentString(num: number) {
  const dollarStr = num ? num.toString() : '';
  const comma = dollarStr.length - 5;
  const decimal = dollarStr.length - 2;

  switch (dollarStr.length) {
    case 0:
      return '0.00';
    case 1:
      return '0.0' + dollarStr;
    case 2:
      return '0.' + dollarStr;
    case 3:
    case 4:
    case 5:
      return `${dollarStr.substring(0, decimal)}.${dollarStr.substring(decimal)}`;
    default:
      return `${dollarStr.substring(0, comma)},${dollarStr.substring(
        comma,
        decimal,
      )}.${dollarStr.substring(decimal)}`;
  }
}

const dollarRegex = /\d\.\d/;

export const getCentNumber = (dollarString: string) => {
  if (dollarRegex.test(dollarString)) {
    return Math.floor(Number(dollarString.replace(/\./, '')));
  }

  return Math.floor(Number(dollarString) * 100);
};

export const isValidAmount = (amountString: string) => /^[0-9]+$/.test(amountString);

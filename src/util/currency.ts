const getDollarNumber = (num: number) => Math.round(num / 100);

export function getDollarString(num: number) {
  const dollarNumber = getDollarNumber(num);
  return dollarNumber.toString();
}

export function getCentString(num: number) {
  const dollarStr = num ? num.toString() : "";

  switch (dollarStr.length) {
    case 0:
      return "0.00";
    case 1:
      return "0.0" + dollarStr;
    case 2:
      return "0." + dollarStr;
    default:
      const decimal = dollarStr.length - 2;
      return dollarStr.substr(0, decimal) + "." + dollarStr.substr(decimal);
  }
}

const dollarRegex = /\d\.\d/;

export const getCentNumber = (dollarString: string) => {
  if (dollarRegex.test(dollarString)) {
    return Math.floor(Number(dollarString.replace(/\./, "")));
  }

  return Math.floor(Number(dollarString) * 100);
};

export const isValidAmount = (amountString: string) =>
  /^[0-9]+$/.test(amountString);

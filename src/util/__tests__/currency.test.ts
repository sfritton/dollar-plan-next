import { getDollarString, getCentString, getCentNumber } from '../currency';

describe('getDollarString', () => {
  it('handles undefined', () => {
    expect(getDollarString()).toBe('0');
  });
  it('handles NaN', () => {
    expect(getDollarString(NaN)).toBe('0');
  });
  it('returns 0 for numbers below $1', () => {
    expect(getDollarString(12)).toBe('0');
  });
  it('removes the last 2 digits', () => {
    expect(getDollarString(1245)).toBe('12');
  });
  it('rounds up', () => {
    expect(getDollarString(1255)).toBe('13');
  });
  it('adds a comma', () => {
    expect(getDollarString(125500)).toBe('1,255');
  });
});

describe('getCentString', () => {
  it('handles undefined', () => {
    expect(getCentString()).toBe('0.00');
  });
  it('handles NaN', () => {
    expect(getCentString(NaN)).toBe('0.00');
  });
  it('handles 0', () => {
    expect(getCentString(0)).toBe('0.00');
  });
  it('handles pennies', () => {
    expect(getCentString(3)).toBe('0.03');
  });
  it('handles dimes', () => {
    expect(getCentString(53)).toBe('0.53');
  });
  it('handles dollars', () => {
    expect(getCentString(153)).toBe('1.53');
  });
  it('handles 10s', () => {
    expect(getCentString(1253)).toBe('12.53');
  });
  it('handles 100s', () => {
    expect(getCentString(12853)).toBe('128.53');
  });
  it('handles 1000s', () => {
    expect(getCentString(128953)).toBe('1,289.53');
  });
});

describe('getCentNumber', () => {
  it('handles dollars and cents', () => {
    expect(getCentNumber('12.50')).toBe(1250);
  });
  it('handles commas', () => {
    expect(getCentNumber('1,002.50')).toBe(100250);
  });
  it('handles dollars', () => {
    expect(getCentNumber('200')).toBe(20000);
  });
  it('handles dollars with commas', () => {
    expect(getCentNumber('2,000')).toBe(200000);
  });
  it('handles cents', () => {
    expect(getCentNumber('0.20')).toBe(20);
  });
  it('handles empty strings', () => {
    expect(getCentNumber('')).toBe(0);
  });
  it('handles invalid strings', () => {
    expect(getCentNumber('banana')).toBe(0);
  });
  it('handles exponents', () => {
    expect(getCentNumber('1.2e+30')).toBe(0);
  });
  it('handles NaN', () => {
    expect(getCentNumber('NaN')).toBe(0);
  });
  it('handles undefined', () => {
    expect(getCentNumber()).toBe(0);
  });
});

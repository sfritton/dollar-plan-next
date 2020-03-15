import { getDollarString, getCentString } from '../currency';

describe('getDollarString', () => {
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
  it('defaults to 0.00', () => {
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

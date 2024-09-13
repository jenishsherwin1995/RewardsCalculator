import { calculatePoints } from '../utils/CalculatePoints';

describe('calculatePoints', () => {
  test('calculates points correctly for amounts over $100', () => {
    expect(calculatePoints(120.75)).toBe(41.5);
  });

  test('calculates points correctly for amounts between $50 and $100', () => {
    expect(calculatePoints(75.5)).toBe(25.5);
  });

  test('returns 0 points for amounts at or below $50', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(0)).toBe(0);
  });

  test('returns correct points for exact threshold values', () => {
    expect(calculatePoints(100)).toBe(50);
    expect(calculatePoints(101)).toBe(51);
  });

  test('handles floating point precision correctly', () => {
    expect(calculatePoints(59.99)).toBe(9.99);
  });
});

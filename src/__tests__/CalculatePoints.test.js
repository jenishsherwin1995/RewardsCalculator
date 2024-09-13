import { CalculatePoints } from '../utils/CalculatePoints';

describe('CalculatePoints', () => {
  test('calculates points correctly for amounts over $100', () => {
    expect(CalculatePoints(120)).toBe(90);
  });

  test('calculates points correctly for amounts between $50 and $100', () => {
    expect(CalculatePoints(75.5)).toBe(25.5);
  });

  test('returns 0 points for amounts at or below $50', () => {
    expect(CalculatePoints(50)).toBe(0);
    expect(CalculatePoints(0)).toBe(0);
  });

  test('returns correct points for exact threshold values', () => {
    expect(CalculatePoints(100)).toBe(50);
    expect(CalculatePoints(101)).toBe(52);
  });

  test('handles floating point precision correctly', () => {
    expect(CalculatePoints(59.99)).toBe(9.99);
  });
});

import calculatePointsByAmount from '../utils/calculatePointsByAmount';

describe('Testcase for calculate Points By Amount', () => {
    test('should earned points correctly for amounts over $100', () => {
    expect(calculatePointsByAmount(120)).toBe(90); // 2*(120-100) + 1*(100-50)
    });

    test('should earned points correctly for amounts between $50 and $100', () => {
    expect(calculatePointsByAmount(320)).toBe(490); // 1*(75-50)
    });

    test('should earned points correctly for amounts exactly $100', () => {
    expect(calculatePointsByAmount(100)).toBe(50); // 1*(100-50)
    });

    test('should earned points correctly for amounts exactly $50', () => {
    expect(calculatePointsByAmount(50)).toBe(0); // No points
    });

    test('should earned points correctly for amounts below $50', () => {
    expect(calculatePointsByAmount(30)).toBe(0); // No points
    });
});
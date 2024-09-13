
export const CalculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100);
    points += 1 * (100 - 50);
  } else if (amount > 50) {
    points += 1 * (amount - 50);
  }
  return parseFloat(points.toFixed(2));
};

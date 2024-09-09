export const calculatePoints = (amount) => {
    if (amount > 100) {
      return 2 * (amount - 100) + 50;
    } else if (amount > 50) {
      return amount - 50;
    } else {
      return 0;
    }
  };

export const getDeviation = (value: number, reference: number) => {
  return ((value - reference) / reference) * 100;
};

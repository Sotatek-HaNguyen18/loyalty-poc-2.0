export const formatVnd = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const getDeviation = (value: number, reference: number) => {
  return ((value - reference) / reference) * 100;
};

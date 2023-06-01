import { default as Gradient } from 'javascript-color-gradient';

export const createGradient = ({ steps, range = [-1, 1], midPoints = 100 }) => {
  const gradient = new Gradient()
    .setColorGradient(...steps)
    .setMidpoint(midPoints);

  const get = value => {
    const index = Math.ceil(
      ((value - range[0]) / (range[1] - range[0])) * midPoints
    );

    return gradient.getColor(index);
  };

  return { get };
};

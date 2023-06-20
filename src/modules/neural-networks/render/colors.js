import { default as Gradient } from 'javascript-color-gradient';
import { memoize } from 'lodash';

export const createGradient = ({ steps, range = [-1, 1], midPoints = 100 }) => {
  const gradient = new Gradient()
    .setColorGradient(...steps)
    .setMidpoint(midPoints);

  const _get = memoize(index => {
    try {
      return gradient.getColor(index);
    } catch (error) {
      console.log(index);
      return '#FFFFFF';
    }
  });

  const get = value => {
    value = Math.min(Math.max(value, range[0]), range[1]);

    const index = Math.ceil(
      ((value - range[0]) / (range[1] - range[0])) * midPoints
    );

    return _get(index);
  };

  return { get };
};

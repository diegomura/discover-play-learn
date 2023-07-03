import { useEffect, useRef } from 'react';

const Axes = ({
  xColor = '#FF0000',
  yColor = '#00FF00',
  zColor = '#0000FF',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.setColors(xColor, yColor, zColor);
  }, [xColor, yColor, zColor]);

  return <axesHelper ref={ref} args={[50]} />;
};

export default Axes;

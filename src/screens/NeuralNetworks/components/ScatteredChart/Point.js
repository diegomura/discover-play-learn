import { useState, useEffect } from 'react';

const Point = ({ x, y, width, height, point }) => {
  const [color, setColor] = useState(point.color);

  useEffect(() => {
    const handleColorChange = ({ color }) => setColor(color);
    point.addListener('update', handleColorChange);
    return () => point.removeListener('update', handleColorChange);
  }, [point]);

  return <rect x={x} y={y} width={width} height={width} fill={color} />;
};

export default Point;

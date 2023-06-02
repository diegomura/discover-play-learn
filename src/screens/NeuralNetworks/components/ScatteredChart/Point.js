import { useState, useEffect } from 'react';

const Point = ({ cx, cy, point }) => {
  const [color, setColor] = useState(point.color);

  useEffect(() => {
    const handleColorChange = ({ color }) => setColor(color);
    point.addListener('update', handleColorChange);
    return () => point.removeListener('update', handleColorChange);
  }, [point]);

  return <circle cx={cx} cy={cy} r={5} fill={color} />;
};

export default Point;

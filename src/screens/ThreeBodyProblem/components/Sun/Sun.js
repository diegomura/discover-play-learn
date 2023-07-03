import React, { useEffect, useRef, useState } from 'react';

const Sun = ({ position, mass }) => {
  const meshRef = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    meshRef.current.position.x = position[0];
    meshRef.current.position.y = position[1];
    meshRef.current.position.z = position[2];
  }, [position]);

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.5 : 1}
      position={position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[mass / 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Sun;

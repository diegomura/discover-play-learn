const Arrow = ({ left, right, color }) => {
  let widthOffset = 0;

  if (left) widthOffset += 20;
  if (right) widthOffset += 10;

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div
        style={{
          marginTop: 8,
          marginBottom: 8,
          marginLeft: left ? 20 : 0,
          width: `calc(100% - ${widthOffset}px)`,
          background: color,
          height: 10,
          borderTopLeftRadius: left ? 0 : 5,
          borderBottomLeftRadius: left ? 0 : 5,
          borderTopRightRadius: right ? 0 : 5,
          borderBottomRightRadius: right ? 0 : 5,
        }}
      />
      {right && (
        <div
          style={{
            width: 0,
            height: 0,
            right: 0,
            top: 3,
            position: 'absolute',
            borderTop: `10px solid transparent`,
            borderBottom: '10px solid transparent',
            borderLeft: `20px solid ${color}`,
          }}
        />
      )}

      {left && (
        <div
          style={{
            width: 0,
            height: 0,
            left: 0,
            top: 3,
            position: 'absolute',
            borderTop: `10px solid transparent`,
            borderBottom: '10px solid transparent',
            borderRight: `20px solid ${color}`,
          }}
        />
      )}
    </div>
  );
};

export default Arrow;

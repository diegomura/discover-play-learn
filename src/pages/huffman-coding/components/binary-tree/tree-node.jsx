function TreeNode({ node, x, y, size, onHover }) {
  const labelYOffset = node.weight ? size / 2.8 : size / 5;
  const weightYOffset = node.label ? size / 6 : size / -20;

  return (
    <g onMouseEnter={() => onHover(node)} onMouseLeave={() => onHover(null)}>
      {node.label && (
        <rect
          x={x}
          y={y}
          rx={size / 5}
          ry={size / 5}
          width={size}
          height={size}
          fill="white"
          strokeWidth={size / 22}
          stroke="black"
        />
      )}

      {!node.label && (
        <circle
          cx={x + size / 2}
          cy={y + size / 2}
          r={size / 2}
          fill="white"
          strokeWidth={size / 22}
          stroke="black"
        />
      )}

      {node.weight && (
        <>
          <text
            x={x + size / 2}
            y={y + size / 2 - weightYOffset}
            fontSize={size / 4}
            textAnchor="middle"
            className="cursor-default font-bold"
          >
            {node.weight.toFixed(4)}
          </text>

          {node.label && (
            <line
              x1={x}
              y1={y + size / 2 - 10}
              x2={x + size}
              y2={y + size / 2 - 10}
              stroke="black"
              strokeWidth={size / 44}
            />
          )}
        </>
      )}

      {node.label && (
        <text
          x={x + size / 2}
          y={y + size / 2 + labelYOffset}
          fontSize={size / 2}
          textAnchor="middle"
          className="cursor-default"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

export default TreeNode;

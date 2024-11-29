import TreeNode from './tree-node';
import { getTreeWidth } from './utils';
import { NODE_SIZE, Y_OFFSET } from './constants';

function TreeBranch({ node, x, y, width, arcs, highlightedPath, onHover }) {
  const nodeX = x + width / 2 - NODE_SIZE / 2;
  const leftWidth = getTreeWidth(node.left, NODE_SIZE);
  const rightWidth = getTreeWidth(node.right, NODE_SIZE);
  const highlightLeft = highlightedPath?.startsWith('0');
  const highlightRight = highlightedPath?.startsWith('1');

  return (
    <>
      {node.left && (
        <>
          <line
            x1={x + width / 2}
            y1={y + NODE_SIZE}
            x2={x + leftWidth / 2}
            y2={y + Y_OFFSET}
            strokeWidth={highlightLeft ? 12 : 3}
            stroke={arcs?.[0].color ?? 'black'}
          />

          {arcs?.[0].label && (
            <text
              x={x + width / 4 + leftWidth / 4 - 10}
              y={y + NODE_SIZE / 2 + Y_OFFSET / 2 - 10}
              fontSize={NODE_SIZE / 4}
              alignmentBaseline="middle"
              textAnchor="middle"
              className="cursor-default"
              style={{ fill: arcs?.[0].color }}
            >
              {arcs[0].label}
            </text>
          )}

          <TreeBranch
            arcs={arcs}
            node={node.left}
            width={leftWidth}
            x={x}
            y={y + Y_OFFSET}
            highlightedPath={highlightLeft ? highlightedPath?.slice(1) : null}
            onHover={onHover}
          />
        </>
      )}

      {node.right && (
        <>
          <line
            x1={x + width / 2}
            y1={y + NODE_SIZE}
            x2={x + leftWidth + rightWidth / 2}
            y2={y + Y_OFFSET}
            strokeWidth={highlightRight ? 12 : 3}
            stroke={arcs?.[1].color ?? 'black'}
          />

          {arcs?.[1].label && (
            <text
              x={x + width / 4 + leftWidth / 2 + rightWidth / 4 + 10}
              y={y + NODE_SIZE / 2 + Y_OFFSET / 2 - 10}
              fontSize={NODE_SIZE / 4}
              alignmentBaseline="middle"
              textAnchor="middle"
              className="cursor-default"
              style={{ fill: arcs?.[1].color }}
            >
              {arcs[1].label}
            </text>
          )}

          <TreeBranch
            arcs={arcs}
            node={node.right}
            width={rightWidth}
            x={x + leftWidth}
            y={y + Y_OFFSET}
            highlightedPath={highlightRight ? highlightedPath?.slice(1) : null}
            onHover={onHover}
          />
        </>
      )}

      <TreeNode
        node={node}
        x={nodeX}
        y={y}
        size={NODE_SIZE}
        onHover={onHover}
      />
    </>
  );
}

export default TreeBranch;

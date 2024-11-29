import classNames from 'classnames';
import { useMemo, useState } from 'react';

import TreeNode from './tree-node';
import TreeBranch from './tree-branch';
import { getTreeDepth, getTreeWidth } from './utils';
import { NODE_SIZE, Y_OFFSET } from './constants';

function BinaryTree({ nodes = [], arcs, highlightedPath, className }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const layouts = useMemo(() => {
    return nodes.reduce((acc, node, index) => {
      const width = getTreeWidth(node, NODE_SIZE);
      const depth = getTreeDepth(node);
      const height = depth * Y_OFFSET;

      const prevNode = acc[index - 1];
      const prevX = prevNode?.x ?? 0;
      const prevWidth = prevNode?.width ?? 0;
      const x = prevX + prevWidth;

      return [...acc, { x, width, height, depth }];
    }, []);
  }, [nodes]);

  const totalWidth = layouts.reduce((acc, node) => acc + node.width, 0);

  const totalHeight =
    Math.max(6, ...layouts.map(node => node.depth)) * Y_OFFSET;

  const hoveredNodeSize = Math.min(360, totalWidth / 5);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      width="100%"
      height="100%"
      className={classNames('', className)}
    >
      {nodes.map((node, index) => {
        return (
          <TreeBranch
            key={index}
            node={node}
            x={layouts[index].x}
            y={2}
            arcs={arcs}
            width={layouts[index].width}
            highlightedPath={highlightedPath}
            onHover={setHoveredNode}
          />
        );
      })}

      {hoveredNode && (
        <TreeNode
          x={totalWidth - hoveredNodeSize - 10}
          y={totalHeight - hoveredNodeSize - 10}
          node={hoveredNode}
          size={hoveredNodeSize}
        />
      )}
    </svg>
  );
}

export default BinaryTree;

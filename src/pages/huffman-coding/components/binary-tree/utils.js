export function getTreeDepth(tree) {
  if (!tree) return 0;
  return 1 + Math.max(getTreeDepth(tree.left), getTreeDepth(tree.right));
}

export function getTreeWidth(tree, nodeSize, xMargin = nodeSize) {
  if (!tree) return 0;
  if (!tree.right && !tree.left) return nodeSize + xMargin;
  return getTreeWidth(tree.left, nodeSize) + getTreeWidth(tree.right, nodeSize);
}

import fs from 'fs';
import { exec } from 'child_process';
import { graphviz } from 'node-graphviz';

const trace = root => {
  const nodes = [];
  const edges = [];

  const build = v => {
    if (!nodes.includes(v)) {
      nodes.push(v);
      v.prev.forEach(child => {
        edges.push([child, v]);
        build(child);
      });
    }
  };

  build(root);

  return { nodes, edges };
};

const viewNode = node => {
  let res = `"${node.id}"`;

  res += `[label=<<table border="0" cellborder="1" cellspacing="0">`;
  res += `<tr>`;
  res += `<td rowspan="2">  ${node.label}</td>`;
  res += `<td>  data ${node.data.toFixed(4)}</td>`;
  res += `</tr>`;
  res += `<tr>`;
  res += `<td>  grad ${node.grad.toFixed(4)}</td>`;
  res += `</tr>`;
  res += `</table>>]`;
  res += `[height=0.2]`;
  res += `[margin="0,0"]`;
  res += `[shape=none]`;

  return res;
};

const renderGraph = (root, fileName = './graph.svg') => {
  const { nodes, edges } = trace(root);

  let graph = 'digraph {';

  graph += 'rankdir=LR;';

  nodes.forEach(node => {
    graph += viewNode(node);

    if (node.op) {
      graph += `"${node.id}${node.op}" [label="${node.op}", width=0.1, height=0.1, margin="0.1,0.01"];`;
      graph += `"${node.id}${node.op}" -> "${node.id}";`;
    }
  });

  edges.forEach(edge => {
    graph += `"${edge[0].id}" -> "${edge[1].id}${edge[1].op}";`;
  });

  graph += '}';

  graphviz.dot(graph, 'svg').then(svg => {
    fs.writeFileSync(fileName, svg);
    exec(`open "${fileName}"`);
  });
};

export default renderGraph;

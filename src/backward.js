const backward = (node) => {
    node.grad = 1

    const topo = []
    const visited = []

    const buildTopo = v => {
      if (!visited.includes(v)) {
        visited.push(v)
        v.prev.forEach(child => buildTopo(child))
        topo.push(v)
      }
    }

    buildTopo(node)

    topo.reverse().forEach(v => v.backward())
  }

  export default backward

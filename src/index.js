

import Value from './value.js'
import Neuron from './neuron.js'
import Layer from './layer.js'
import MLP from './mlp.js'
import viewGraph from './view.js'
import backward from './backward.js'

// const a = new Value({ data: 2.0,  label: 'a' })
// const b = new Value({ data: -3.0, label: 'b' })
// const c = new Value({ data: 10.0, label: 'c' })
// const e = a.mul(b).setLabel('e')
// const d = e.add(c).setLabel('d')
// const f = new Value({ data: -2.0, label: 'f' })
// const L = d.mul(f).setLabel('L')

// Inputs x1, x2
// const x1 = new Value({ data: 2.0, label: 'x1' })
// const x2 = new Value({ data: 0.0, label: 'x2' })

// // Weights w1, w2
// const w1 = new Value({ data: -3.0, label: 'w1' })
// const w2 = new Value({ data: 1.0, label: 'w2' })

// // Bias of the neuron
// const b = new Value({ data: 6.8813735870195432, label: 'b' })

// // x1*w1 + x2*w2 + b
// const x1w1 = x1.mul(w1).setLabel('x1*w1')
// const x2w2 = x2.mul(w2).setLabel('x2*w2')
// const x1w1x2w2 = x1w1.add(x2w2).setLabel('x1*w1 + x2*w2')
// const n = x1w1x2w2.add(b).setLabel('n')
// const o = n.tanh().setLabel('0')

const inputs = [new Value({ data: 2.0, label: 'a' }), new Value({ data: 3.0, label: 'b' }), new Value({ data: -1.0, label: 'c' })]
const neuron = new Neuron({ nin: 2 })
const layer = new Layer({ nin: 2, nout: 3 })
const mlp = new MLP({ nin: 3, nouts: [4, 4, 1] })

const res = mlp.call(inputs)

viewGraph(res)

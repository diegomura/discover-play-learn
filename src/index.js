import Value from './value.js'
import MLP from './mlp.js'
import viewGraph from './view.js'
import train from './train.js'

const mlp = new MLP({ nin: 3, nouts: [4, 4, 1] })

const trainingData = [
  [new Value({ data: 2.0 }), new Value({ data: 3.0 }), new Value({ data: -1.0 })],
  [new Value({ data: 3.0 }), new Value({ data: -1.0 }), new Value({ data: 0.5 })],
  [new Value({ data: 0.5 }), new Value({ data: 0.5 }), new Value({ data: 1.0 })],
  [new Value({ data: 2.0 }), new Value({ data: 1.0 }), new Value({ data: -1.0 })],
  [new Value({ data: 2.0 }), new Value({ data: 3.0 }), new Value({ data: 1.0 })],
  [new Value({ data: 1.0 }), new Value({ data: 3.0 }), new Value({ data: 1.0 })],
  [new Value({ data: 2.0 }), new Value({ data: -3.0 }), new Value({ data: 10.0 })],
]

const expectedResults = [1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0]

train({ mlp, trainingData, expectedResults, passes: 1000 })

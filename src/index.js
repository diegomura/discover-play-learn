import MLP from './engine/mlp.js'

const mlp = new MLP({ nin: 3, nouts: [4, 4, 1] })

const data = [
  [2.0, 3.0, -1.0],
  [3.0, -1.0, 0.5],
  [0.5, 0.5, 1.0],
  [2.0, 1.0, -1.0],
  [2.0, 3.0, 1.0],
  [1.0, 3.0, 1.0],
  [2.0, -3.0, 10.0],
]

const expected = [1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0]

mlp.train({ data, expected })

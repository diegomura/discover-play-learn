import MLP from '../../engine/mlp.js'
import { createGradient } from '../../render/colors.js'
import renderScatteredChart from '../../render/scatteredChart.js'

const mlp = new MLP({ nin: 2, nouts: [4, 4, 1] })

const trainingData = [
  // top-left
  [-2, 5],
  [-3, 7],
  [-4, 6],
  [-6, 8],
  [-7, 9],
  [-8, 6],
  [-9, 4],
  [-10, 3],
  [-6, 10],
  [-7, 12],
  // top-right
  [2, 5],
  [3, 7],
  [4, 6],
  [6, 8],
  [7, 9],
  [8, 6],
  [9, 4],
  [10, 3],
  [6, 10],
  [7, 12],
  // bottom-left
  [-2, -5],
  [-3, -7],
  [-4, -6],
  [-6, -8],
  [-7, -9],
  [-8, -6],
  [-9, -4],
  [-10, -3],
  [-6, -10],
  [-7, -12],
  // bottom-right
  [2, -5],
  [3, -7],
  [4, -6],
  [6, -8],
  [7, -9],
  [8, -6],
  [9, -4],
  [10, -3],
  [6, -10],
  [7, -12],
]

const expected = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1,
]

mlp.train({ data: trainingData, expected, passes: 1000 })

const getRandomPoint = () => {
  const minX = -10
  const maxX = 10
  const minY = -10
  const maxY = 10

  const randomX = minX + Math.random() * (maxX - minX)
  const randomY = minY + Math.random() * (maxY - minY)

  return [randomX, randomY]
}

const data = []

for (let i = 0; i < 50000; i++) {
  const point = getRandomPoint()
  const pred = mlp.call(point)

  data.push({ x: point[0], y: point[1], value: pred.data })
}

const gradient = createGradient({ start: '#FF0000', end: '#0000FF' })

renderScatteredChart({
  data,
  xAxis: [-10, 10],
  yAxis: [-10, 10],
  style: { fill: (value) => gradient.get(value) },
})

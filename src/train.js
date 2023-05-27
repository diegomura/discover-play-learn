import Value from './value.js'
import backward from './backward.js'

const train = ({ mlp, trainingData, expectedResults, passes = 20 }) => {
  for (let i = 0; i < passes; i++) {
    // forward pass
    const predictions = trainingData.map((data) => mlp.call(data))

    // evaluate loss
    const loss = predictions.reduce(
      (acc, prediction, i) => acc.add(prediction.sub(expectedResults[i]).pow(2)),
      Value.Zero()
    )

    // zero grad parameters
    for (const parameter of mlp.parameters) {
      parameter.grad = 0
    }

    // backward pass
    backward(loss)

    // update
    for (const parameter of mlp.parameters) {
      parameter.data += -0.01 * parameter.grad
    }
  }
}

export default train

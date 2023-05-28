import { default as Gradient } from 'javascript-color-gradient'

export const createGradient = ({ start, end, midPoints = 100 }) => {
  const gradient = new Gradient().setColorGradient(start, end).setMidpoint(midPoints)

  const get = value => {
    const index = Math.ceil(((value + 1) / 2) * midPoints)

    return gradient.getColor(index)
  }

  return { get }
}

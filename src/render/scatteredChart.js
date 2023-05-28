import fs from 'fs'
import { exec } from 'child_process'

const remderCircle = (cx, cy, radius, fill) => {
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fill}" />`
}

const renderAxisLine = (x1, y1, x2, y2) => {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" />`
}

const renderAxisLabel = (x, y, text) => {
  return `<text x="${x}" y="${y}" alignment-baseline="middle" text-anchor="middle" font-weight="bold" >${text}</text>`
}

const renderXAxis = (height, width, xAxis, yAxis, xScale, yScale) => {
  let axis = ''

  const xAxisStartX = 0
  const xAxisStartY = height - (0 - yAxis[0]) * yScale
  const xAxisEndX = width
  const xAxisEndY = height - (0 - yAxis[0]) * yScale
  axis += renderAxisLine(xAxisStartX, xAxisStartY, xAxisEndX, xAxisEndY)

  // Draw small lines and numbers
  for (let i = xAxis[0] + 1; i < xAxis[1]; i++) {
    const x = (i - xAxis[0]) * xScale
    const lineStartY = height - (0 - yAxis[0]) * yScale - 5
    const lineEndY = height - (0 - yAxis[0]) * yScale + 5
    axis += renderAxisLine(x, lineStartY, x, lineEndY)

    if (i !== 0) {
      const labelX = x
      const labelY = lineEndY + 15
      axis += renderAxisLabel(labelX, labelY, i)
    }
  }

  return axis
}

const renderYAxis = (height, width, xAxis, yAxis, xScale, yScale) => {
  let axis = ''

  // Generate the y-axis
  const yAxisStartX = (0 - xAxis[0]) * xScale
  const yAxisStartY = height
  const yAxisEndX = (0 - xAxis[0]) * xScale
  const yAxisEndY = 0
  axis += renderAxisLine(yAxisStartX, yAxisStartY, yAxisEndX, yAxisEndY)

  // Generate small lines on the y-axis marking each unit
  for (let i = yAxis[0] + 1; i < yAxis[1]; i++) {
    const y = height - (i - yAxis[0]) * yScale
    const lineStartX = (0 - xAxis[0]) * xScale - 5
    const lineEndX = (0 - xAxis[0]) * xScale + 5
    axis += renderAxisLine(lineStartX, y, lineEndX, y)

    if (i !== 0) {
      const labelX = lineStartX + 25
      const labelY = y
      axis += renderAxisLabel(labelX, labelY, i)
    }
  }

  return axis
}

const renderScatteredChart = ({
  data,
  fileName = 'chart.svg',
  width = 1200,
  height = 600,
  xAxis,
  yAxis,
  style = {},
}) => {
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`

  // Calculate the scaling factor for the data points
  const xScale = width / (xAxis[1] - xAxis[0])
  const yScale = height / (yAxis[1] - yAxis[0])

  data.forEach((point) => {
    const radius = 3
    const cx = (point.x - xAxis[0]) * xScale
    const cy = height - (point.y - yAxis[0]) * yScale
    const fill = style.fill?.(point.value) || 'blue'
    svgContent += remderCircle(cx, cy, radius, fill)
  })

  svgContent += renderXAxis(height, width, xAxis, yAxis, xScale, yScale)
  svgContent += renderYAxis(height, width, xAxis, yAxis, xScale, yScale)



  svgContent += '</svg>'

  fs.writeFileSync(fileName, svgContent, 'utf8')

  exec(`open "${fileName}"`)
}

export default renderScatteredChart

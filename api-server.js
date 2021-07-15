const express = require('express')
const cors = require('cors')
const SimplexNoise = require('simplex-noise')

const app = express()

app.use(cors())

const PORT = process.env.PORT || 1111

app.get('/colors', (req, res) => {
  const minAmount = 1000
  const maxAmount = 10000 - minAmount
  const colors = [
    {
      label: 'Carrot',
      color: '#e67e22'
    },
    {
      label: 'Green Sea',
      color: '#16a085'
    },
    {
      label: 'Orange',
      color: '#f39c12'
    },
    {
      label: 'Pomegranate',
      color: '#c0392b'
    },
    {
      label: 'Belize Hole',
      color: '#2980b9'
    },
    {
      label: 'Wisteria',
      color: '#8e44ad'
    }
  ]
  const data = colors.map(({ color, label }) => ({
    color,
    label,
    value: minAmount + Math.round(Math.random() * maxAmount)
  }))
  res.json(data)
})

app.get('/stocks', (req, res) => {
  const pointsCount = 50
  const simplex = new SimplexNoise()
  const todayDate = new Date()
  const arr = new Array(pointsCount).fill(null).map((_, i) => {
    const date = new Date()
    date.setDate(todayDate.getDate() - pointsCount + i + 1)
    return {
      date,
      value: (simplex.noise2D(i * 0.08, i * 0.01) + 1) * 500
    }
  })
  res.json(arr)
})

app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m', `\nAPI is listening on: http://localhost:${PORT}\n\n`))
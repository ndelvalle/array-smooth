/* eslint-disable import/no-extraneous-dependencies */
function getSample(arr, index, offset) {
  const leftOffeset = index - offset
  const from = leftOffeset >= 0 ? leftOffeset : 0
  const to = index + offset + 1
  return arr.slice(from, to)
}

function smooth(arr, smoothOffset, getter, setter) {
  const get = getter || ((value) => value)

  return arr.map((item, index, arr) => {
    const sample = getSample(arr, index, smoothOffset).map(get)
    const smoothed = sample.reduce((a, b) => a + b, 0) / sample.length
    if (!setter) {
      return smoothed
    }
    setter(item, smoothed)
    return item
  })
}

module.exports = smooth

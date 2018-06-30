function getSlice(arr, index, offset){
  const leftOffeset = index - offset
  const from = leftOffeset >= 0 ? leftOffeset : 0
  const to = index + offset + 1
  return arr.slice(from, to)
}

function smooth(arr, range, getter, setter) {
  const get = getter || ((item) => item)

  return arr.map((item, index, arr) => {
    const slice = getSlice(arr, index, range).map(get)
    const value = slice.reduce((a, b) => a + b, 0) / slice.length
    if (setter) {
      setter(value)
      return item
    }
    return value
  })
}

module.exports = smooth

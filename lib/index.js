function smooth(arr, range, getter, setter) {
  const get = getter || ((item) => item)

  const getRange = (arr, index, r) => arr.slice(index - r, index + r).filter((i) => !!i)

  return arr.map((item, index, arr) => {
    const slice = getRange(arr, index, range).map(get)
    const value = slice.reduce((a, b) => a + b) / slice.length
    if (setter) {
      setter(value)
      return item
    }
    return value
  })
}

module.exports = smooth

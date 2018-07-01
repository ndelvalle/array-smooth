const dotProp = require('dot-prop')

function getSample(arr, index, offset) {
  const leftOffeset = index - offset
  const from = leftOffeset >= 0 ? leftOffeset : 0
  const to = index + offset + 1
  return arr.slice(from, to)
}

function buildAccessors(accessor, accessorName) {
  if (!accessor) {
    return accessorName === 'get' ? (item) => item : undefined
  }
  if (typeof accessor === 'function') {
    return accessor
  }
  if (typeof accessor === 'string') {
    return (item) => dotProp[accessorName](item, accessor)
  }
  const accessorFullName = accessorName === 'set' ? 'setter' : 'getter'
  throw new Error(`Error ${accessorFullName} must be a function or a string`)
}

function smooth(arr, smoothWidth, getter, setter) {
  const get = buildAccessors(getter, 'get')
  const set = buildAccessors(setter, 'set')

  return arr.map((item, index, arr) => {
    const sample = getSample(arr, index, smoothWidth).map(get)
    const value = sample.reduce((a, b) => a + b, 0) / sample.length
    if (!set) {
      return value
    }

    set(item, value)
    return item
  })
}

module.exports = smooth

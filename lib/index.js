const dotProp = require('dot-prop')

function buildAccessors(accessor, accessorName) {
  if (!accessor) {
    return accessorName === 'get' ? (item) => item : undefined
  }
  if (typeof accessor === 'function') {
    return accessor
  }
  if (typeof accessor === 'string') {
    return (item, itemSmoothed) =>
      dotProp[accessorName](item, accessor, itemSmoothed)
  }
  const accessorFullName = accessorName === 'set' ? 'setter' : 'getter'
  throw new Error(`Error ${accessorFullName} must be a function or a string`)
}

function smooth(arr, smoothOffset, getter, setter) {
  const get = buildAccessors(getter, 'get')
  const set = buildAccessors(setter, 'set')

  const result = []

  for (let i = 0; i < arr.length; i++) {
    const leftOffeset = i - smoothOffset
    const from = leftOffeset >= 0 ? leftOffeset : 0
    const to = i + smoothOffset + 1

    let count = 0
    let sum = 0
    for (let j = from; j < to && j < arr.length; j++) {
      sum += get(arr[j])
      count++
    }

    if (set) {
      set(arr[i], sum / count)
    } else {
      result[i] = sum / count
    }
  }

  return set ? arr : result
}

module.exports = smooth

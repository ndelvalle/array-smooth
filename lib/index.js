function smooth(arr, smoothOffset, getter, setter) {
  const get = getter || ((value) => value)

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

    if (setter) {
      setter(arr[i], sum / count)
    } else {
      result[i] = sum / count
    }
  }

  return setter ? arr : result
}

module.exports = smooth

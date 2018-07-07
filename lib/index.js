function smooth(arr, windowSize, getter, setter) {
  const get = getter || ((value) => value)

  const result = []

  for (let i = 0; i < arr.length; i++) {
    const leftOffeset = i - windowSize
    const from = leftOffeset >= 0 ? leftOffeset : 0
    const to = i + windowSize + 1

    let count = 0
    let sum = 0
    for (let j = from; j < to && j < arr.length; j++) {
      sum += get(arr[j])
      count++
    }

    result[i] = setter ? setter(arr[i], sum / count) : sum / count
  }

  return result
}

module.exports = smooth

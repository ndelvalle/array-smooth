/* eslint-disable no-console,camelcase,no-plusplus,no-use-before-define */
const smoothFor = require('../lib')
const sample = require('../test/fixture')

const base = 1000 * sample.length

const a = base * 10
const b = base * 100
// const c = base * 1000 // 38 million items

console.log('Running benchmarks...')
console.log()

large_array_benchmark(a, 5)
large_array_benchmark(a, 5, (v) => ({ value: v }), (v) => v.value)
large_array_benchmark(a, 20)
large_array_benchmark(b, 5)

// large_array_benchmark(c, 2)
// large_array_benchmark(c, 5)
// large_array_benchmark(c, 20)

function large_array_benchmark(times, smooth_factor, map, getter) {
  if (map && !getter) {
    throw new Error('Please provide both mapper and getter!')
  }

  console.time('Creating array took')
  const big_array = Array(times)

  for (let i = 0; i < times; i++) {
    big_array[i] = map
      ? map(sample[i % sample.length])
      : sample[i % sample.length]
  }
  console.timeEnd('Creating array took')

  console.log()
  console.log(`Sample: array of ${typeof big_array[0]}s`)
  console.log(`Length: ${big_array.length}`)
  console.log(`Smooth: ${smooth_factor}`)
  console.log()

  console.time('for')
  if (getter) {
    smoothFor(big_array, smooth_factor, getter)
  } else {
    smoothFor(big_array, smooth_factor)
  }
  console.timeEnd('for')

  console.log()
  console.log('--------------------')
  console.log()
}

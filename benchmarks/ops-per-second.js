/* eslint-disable camelcase,no-use-before-define,no-console */
/* eslint-disable import/no-extraneous-dependencies */
const Benchmark = require('benchmark')

const smoothFor = require('../lib')
const sample = require('../test/fixture')

console.log('Running benchmarks...')
console.log()

benchmarkCase(sample, 2)
benchmarkCase(sample, 10)

const s = sample.map((v) => ({ value: v }))

benchmarkCase(s, 2, (v) => v.value)

// -------------------------------------

function benchmarkCase(arr, smooth, getter) {
  const suite = new Benchmark.Suite()
  const events = []

  suite
    .add('Smooth (for)', () => {
      smoothFor(arr, smooth, getter)
    })
    .on('cycle', (event) => {
      events.push(String(event.target))
    })
    .on('complete', () => {
      console.log('Ran benchmarks with:')
      console.log()
      console.log(`Smooth: ${smooth}`)
      console.log(`Sample: array of ${typeof arr[0]}s`)
      console.log(`Length: ${arr.length}`)
      console.log()
      events.forEach((e) => console.log(e))
      console.log()
      console.log('------------------------------------------------')
      console.log()
    })
    .run({ async: true })
}

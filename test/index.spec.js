/* global describe, it, expect */

const arraySmooth = require('../lib')
const sample = require('./fixture')

describe('arraySmooth', () => {
  it('expose a function as default export', () => {
    expect(typeof arraySmooth).toBe('function')
  })

  it('smooths a given array', () => {
    const windowSize = 2
    expect(arraySmooth(sample, windowSize)).toMatchSnapshot()
  })

  it('smooths a given array using a getter', () => {
    const arr = sample.map((number) => ({ value: number }))
    const getter = (obj) => obj.value
    const windowSize = 4
    expect(arraySmooth(arr, windowSize, getter)).toMatchSnapshot()
  })

  it('smooths a given array using a setter', () => {
    const arr = sample.map((number) => ({ value: number }))
    const getter = (obj) => obj.value
    const setter = (item, itemSmoothed) => ({
      foo: { item, itemSmoothed },
    })
    const windowSize = 2
    expect(arraySmooth(arr, windowSize, getter, setter)).toMatchSnapshot()
  })
})

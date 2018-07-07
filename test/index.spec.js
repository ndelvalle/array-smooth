/* global describe, it, expect */

const arraySmooth = require('../lib')
const sample = require('./fixture')

describe('arraySmooth', () => {
  it('expose a function as default export', () => {
    expect(typeof arraySmooth).toBe('function')
  })

  it('smooths a given array', () => {
    const range = 2
    expect(arraySmooth(sample, range)).toMatchSnapshot()
  })

  it('smooths a given array using a getter', () => {
    const arr = sample.map((number) => ({ value: number }))
    const getter = (obj) => obj.value
    const range = 4
    expect(arraySmooth(arr, range, getter)).toMatchSnapshot()
  })

  it('smooths a given array using a setter', () => {
    const arr = sample.map((number) => ({ value: number }))
    const getter = (obj) => obj.value
    const setter = (item, itemSmoothed) => {
      item.smoothed = { value: itemSmoothed }
    }
    const range = 2
    expect(arraySmooth(arr, range, getter, setter)).toMatchSnapshot()
  })
})

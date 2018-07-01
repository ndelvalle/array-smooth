/* global describe, it, expect */

const arraySmooth = require('../lib')

describe('arraySmooth', () => {
  it('expose a function as default export', () => {
    expect(typeof arraySmooth).toBe('function')
  })

  it('smooths a given array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const range = 2
    expect(arraySmooth(arr, range)).toMatchSnapshot()
  })

  it('smooths a given array using a getter function', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({ value: number }))
    const getter = (obj) => obj.value
    const range = 4
    expect(arraySmooth(arr, range, getter)).toMatchSnapshot()
  })

  it('smooths a given array using a getter string', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({ value: number }))
    const getter = 'value'
    const range = 1
    expect(arraySmooth(arr, range, getter)).toMatchSnapshot()
  })

  it('smooths a given array using a setter function', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({ value: number }))
    const getter = (obj) => obj.value
    const setter = (item, itemSmoothed) => {
      item.smoothed = { value: itemSmoothed }
    }
    const range = 2
    expect(arraySmooth(arr, range, getter, setter)).toMatchSnapshot()
  })

  it('smooths a given array using a setter string', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({
      s: { value: number },
    }))
    const getter = (obj) => obj.s.value
    const setter = 's.item.smoothed'
    const range = 2
    expect(arraySmooth(arr, range, getter, setter)).toMatchSnapshot()
  })
})

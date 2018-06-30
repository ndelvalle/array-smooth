/* global describe, it, expect */

const arraySmooth = require('../lib')

describe('arraySmooth', () => {
  it('expose a function as default export', () => {
    expect(typeof arraySmooth).toBe('function')
  })
  it('smooths a given array', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const range = 2
    expect(arraySmooth(arr, range)).toMatchSnapshot()
  })
  it('smooths a given array using a getter', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const getter = (obj) => obj.value
    const range = 2
    expect(arraySmooth(arr.map((number) => ({value: number}) ), range, getter)).toMatchSnapshot()
  })
  it('smooths a given array using a getter', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const getter = (obj) => obj.value
    const range = 2
    expect(arraySmooth(arr.map((number) => ({value: number}) ), range, getter)).toMatchSnapshot()
  })
})
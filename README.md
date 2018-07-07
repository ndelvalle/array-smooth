# array-smooth

[ ![Codeship Status for ndelvalle/array-smooth](https://app.codeship.com/projects/18143dd0-5ef2-0136-18ea-6ac24e10c849/status?branch=master)](https://app.codeship.com/projects/296088)
[![Coverage Status](https://coveralls.io/repos/github/ndelvalle/array-smooth/badge.svg?branch=master)](https://coveralls.io/github/ndelvalle/array-smooth?branch=master)
[![dependencies Status](https://david-dm.org/ndelvalle/array-smooth/status.svg)](https://david-dm.org/ndelvalle/array-smooth)
[![devDependencies Status](https://david-dm.org/ndelvalle/array-smooth/dev-status.svg)](https://david-dm.org/ndelvalle/array-smooth?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/97952cdbdc3b4f09a324f5195699b8a1)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=ndelvalle/array-smooth&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-green)](https://github.com/prettier/prettier)

In smoothing, the data points of a signal are modified so individual points (presumably because of noise) are reduced, and points that are lower than the adjacent points are increased leading to a smoother signal. The algorithm used in this implementation is the [moving average](https://en.wikipedia.org/wiki/Moving_average) (rolling average or running average)

## Install

```bash
$ npm install --save array-smooth
```

```bash
$ yarn add array-smooth
```

## Use

```js
const smooth = require('array-smooth')

const arr = [15, 2, 3, 14, 5, 6, 2, 8, 9, 10, 22, 3, 2, 11, 12]
const windowSize = 2
const arrSmoothed = smooth(arr, windowSize)

// arrSmoothed: [6.666666666666667, 8.5, 7.8, 6, 6, 7, 6, 7, 10.2, 10.4, 9.2, 9.6, 10, 7, 8.333333333333334]
```

### API

#### smooth(array, windowSize, [getter], [setter])

###### array `array`

An array containing the values that we want to smooth, it can be an array of numbers or an array of objects defining a specific getter and / or setter

###### windowSize `number`

The smooth window option its a number that specifies the width of the moving average. It represents how many values to the right and left of the current index the algorithm will take in account when getting the sample to generate the smoothed value

###### getter(value) `function`

This function will receive the array value as an argument, it should return the attribute to smooth the array with. Is equivalent to calling `array.map(getter)`

Example:

```js
const arr = [{ value: 15 }, { value: 2 }, { value: 3 }, { value: 14 }, { value: 5 }]

const getter = (item) => item.value
```

###### setter(value, smoothedValue) `function`

This function receives `value` and `smoothedValue` as arguments. The response will be the item that will populate the result array

Example:

```js
const arr = [{ value: 15 }, { value: 2 }, { value: 3 }, { value: 14 }, { value: 5 }]

const getter = (item) => item.value
const setter = (item, itemSomoothed) => ({ value: item, valueSmoothed: itemSomoothed })
```

### Playground

[![Edit array-smooth](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0mp1zxy4vl?module=%2Fsrc%2Findex.js)

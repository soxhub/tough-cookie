/* ************************************************************************************
Extracted from check-types.js
https://gitlab.com/philbooth/check-types.js

MIT License

Copyright (c) 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 Phil Booth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

************************************************************************************ */
'use strict'

const toString = Object.prototype.toString

/* Validation functions copied from check-types package - https://www.npmjs.com/package/check-types */
export function isFunction(data: unknown): boolean {
  return typeof data === 'function'
}

export function isNonEmptyString(data: unknown): boolean {
  return isString(data) && data !== ''
}

export function isDate(data: unknown): boolean {
  if (data instanceof Date) {
    return isInteger(data.getTime())
  }
  return false
}

export function isEmptyString(data: unknown): boolean {
  return data === '' || (data instanceof String && data.toString() === '')
}

export function isString(data: unknown): boolean {
  return typeof data === 'string' || data instanceof String
}

export function isObject(data: unknown): boolean {
  return toString.call(data) === '[object Object]'
}

export function isInteger(data: unknown): boolean {
  return typeof data === 'number' && data % 1 === 0
}
/* End validation functions */

export function validate(bool: boolean, cb?: unknown, options?: unknown): void {
  if (!isFunction(cb)) {
    options = cb
    cb = null
  }
  if (!isObject(options)) options = { Error: 'Failed Check' }
  if (!bool) {
    if (typeof cb === 'function') {
      cb(new ParameterError(options as string))
    } else {
      throw new ParameterError(options as string)
    }
  }
}

export class ParameterError extends Error {}

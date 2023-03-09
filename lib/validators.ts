/* ************************************************************************************
Extracted from check-types.js
https://gitlab.com/philbooth/check-types.js

MIT License

Copyright (c) 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 Phil Booth

Permission is hereby granted, free of charge, to unknown person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF unknown KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR unknown CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

************************************************************************************ */
"use strict";

/* Validation functions copied from check-types package - https://www.npmjs.com/package/check-types */
export function isFunction(data: unknown): data is (...args: unknown[]) => unknown {
  return typeof data === 'function';
}

export function isNonEmptyString(data: unknown): data is string {
  return isString(data) && data !== '';
}

export function isDate(data: unknown): data is Date {
  return isInstanceStrict(data, Date) && isInteger(data.getTime());
}

export function isEmptyString(data: unknown): data is '' {
  return data === '' || (data instanceof String && data.toString() === '');
}

export function isString(data: unknown): data is string {
  return typeof data === 'string' || data instanceof String
}

export function isObject(data: unknown): data is object {
  return toString.call(data) === '[object Object]';
}

export function isInstanceStrict<T extends Function>(data: unknown, Constructor: T): data is T['prototype'] {
  try {
    return data instanceof Constructor;
  } catch {
    return false;
  }
}

export function isInteger(data: unknown): data is number {
  return typeof data === 'number' && data % 1 === 0;
}
/* End validation functions */

export function validate(bool: boolean, cb?: any, options?: any): void {
  if (!isFunction(cb)) {
    options = cb;
    cb = null;
  }
  if (!isObject(options)) options = { Error: "Failed Check" };
  if (!bool) {
    if (cb) {
      cb(new ParameterError(options));
    } else {
      throw new ParameterError(options);
    }
  }
}

export class ParameterError extends Error {
  constructor(...params: any[]) {
    super(...params);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, ParameterError.prototype);
    }
  }
}

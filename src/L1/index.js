export function add (a, b) {
  return a + b
}

import * as utilsLevel1 from '.'

export function addNTimes (a, b, times) {
  return utilsLevel1.add(a, b) * times
}

export function addWithCallback (a, b, callback) {
  callback(utilsLevel1.add(a, b));
}

export function addAfter (a, b, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(utilsLevel1.add(a, b));
    }, time);  
  })
}

export function addAfterWithCallback (a, b, time, callback) {
  setTimeout(() => {
    callback(utilsLevel1.add(a, b))
  }, time)
} 



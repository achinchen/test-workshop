export function add (a, b) {
  return a + b
}

export function addNTimes (a, b, times) {
  return add(a, b) * times
}

export function addWithCallback (a, b, callback) {
  callback(add(a, b));
}

export function addAfter (a, b, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(add(a, b))
    }, time)
  })
}

export function addAfterWithCallback (a, b, time, callback) {
  setTimeout(() => {
    callback(add(a, b))
  }, time)
} 



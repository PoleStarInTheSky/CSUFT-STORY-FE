export function debounce(fn, delay = 500) {
  let timer: null | number = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args)
    }, delay)
  }
}

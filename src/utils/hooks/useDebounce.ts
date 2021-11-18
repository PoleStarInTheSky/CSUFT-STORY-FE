import { useEffect, useState } from 'react'
//这里的参数value一般是一个state，通过在父组件更改state影响值
export function useDebounce<V>(value: V, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    //返回的函数会在下一个useEffect调用前执行，或者组件卸载时执行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}

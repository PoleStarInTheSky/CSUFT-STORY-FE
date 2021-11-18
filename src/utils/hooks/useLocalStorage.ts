import { useState } from 'react'
//initialValue为localStorage相应value为空时赋予的值
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      //当本地有值时，忽略initialValue
      //这里不要给 localStorage 赋初始值
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  //对setStoredValue做一层包装，因为不仅要保存变更,还要保存到本地
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      //支持useState模式的函数调用
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}

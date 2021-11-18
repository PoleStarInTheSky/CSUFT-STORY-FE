import { useState, useCallback } from 'react'
export default function useToggle(initialState = false): [boolean, any] {
  //声明初始状态
  const [state, setState] = useState<boolean>(initialState)
  //拿到可以改变状态的函数，调用后state值改变
  const toggle = useCallback((): void => setState((state) => !state), [])
  return [state, toggle]
}

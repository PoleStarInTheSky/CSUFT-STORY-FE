import { useState, useCallback, useEffect } from 'react'
//一个异步操作所有的状态
type Status = 'idle' | 'pending' | 'success' | 'error'
export default function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) {
  const [status, setStatus] = useState<Status>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)
  //用useCallback包裹起来，避免useEffect每次渲染后都执行，而是异步函数变化了再执行
  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)
    return asyncFunction()
      .then((response: any) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: any) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])
  //如果要立即执行函数便在此处执行，否则在暴露出来的excute中执行
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])
  return { execute, status, value, error }
}
